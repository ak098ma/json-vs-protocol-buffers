import { Component, Fragment } from 'react';
const { Data } = require('../protos/echo_pb.js');
const { EchoServicePromiseClient } = require('../protos/echo_grpc_web_pb.js');
const grpc = {};
grpc.web = require('grpc-web');

const data = {
  hoge: 'hoge',
  fuga: 'fuga',
  piyo: 'piyo',
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChangeTryCount = this.handleChangeTryCount.bind(this);
    this.start = this.start.bind(this);
    this.json = this.json.bind(this);
    this.protocolBuffers = this.protocolBuffers.bind(this);

    this.client = null;

    this.state = {
      isInProgress: false,
      tryCount: 1000,
      jsonElapsedTime: null,
      grpcElapsedTime: null,
    };
  }

  componentDidMount() {
    this.client = new EchoServicePromiseClient('http://localhost:3002');
  }

  render() {
    const { isInProgress, tryCount, jsonElapsedTime, grpcElapsedTime } = this.state;

    return (
      <Fragment>
        <h1>Performance comparison between JSON and Protocol Buffers.</h1>
        <div>
          <input type='text' value={tryCount} onChange={this.handleChangeTryCount} disabled={isInProgress} />
        </div>
        <div>
          <button onClick={this.start} disabled={isInProgress}>
            {isInProgress ? 'test is in progress...' : 'start comparison'}
          </button>
        </div>
        {jsonElapsedTime !== null ? <div>JSON: {jsonElapsedTime / 1000} sec.</div> : undefined }
        {grpcElapsedTime !== null ? <div>gRPC: {grpcElapsedTime / 1000} sec.</div> : undefined }
      </Fragment>
    );
  }

  handleChangeTryCount(event) {
    const { value } = event.target;
    if (value === '') {
      this.setState({ tryCount: 0 });
    } else if (value.match(/^\d+$/)) {
      this.setState({ tryCount: parseInt(value) });
    }
  }

  start() {
    const { tryCount } = this.state;
    this.setState({ isInProgress: true, jsonElapsedTime: null, grpcElapsedTime: null });
    this.json(Date.now(), 0, tryCount)
      .then(jsonElapsedTime => this.setState({ jsonElapsedTime }))
      .then(() => this.protocolBuffers(Date.now(), 0, tryCount))
      .then(grpcElapsedTime => this.setState({ isInProgress: false, grpcElapsedTime }));
  }

  json(startTime, count, tryCount) {
    if (count < tryCount) {
      return fetch('http://localhost:3001', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }).then(() => this.json(startTime, count + 1, tryCount));
    } else {
      return Promise.resolve(Date.now() - startTime);
    }
  }

  protocolBuffers(startTime, count, tryCount) {
    if (count < tryCount) {
      const data = new Data();
      data.setHoge('hoge');
      data.setFuga('fuga');
      data.setPiyo('piyo');
      return this.client.send(data).then(() => this.protocolBuffers(startTime, count + 1, tryCount));
    } else {
      return Promise.resolve(Date.now() - startTime);
    }
  }
}
