import { Component, Fragment } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChangeRetryCount = this.handleChangeRetryCount.bind(this);
    this.start = this.start.bind(this);

    this.state = {
      isInProgress: false,
      retryCount: 10000,
    };
  }

  render() {
    const { isInProgress, retryCount } = this.state;

    return (
      <Fragment>
        <h1>Performance comparison between JSON and Protocol Buffers.</h1>
        <div>
          <input type='text' value={retryCount} onChange={this.handleChangeRetryCount} disabled={isInProgress} />
        </div>
        <div>
          <button onClick={this.start} disabled={isInProgress}>
            {isInProgress ? 'test is in progress...' : 'start comparison'}
          </button>
        </div>
      </Fragment>
    );
  }

  handleChangeRetryCount(event) {
    const { value } = event.target;
    if (value === '') {
      this.setState({ retryCount: 0 });
    } else if (value.match(/^\d+$/)) {
      this.setState({ retryCount: parseInt(value) });
    }
  }

  start() {
    this.setState({ isInProgress: true });
    // TODO
    setTimeout(() => this.setState({ isInProgress: false }), 1000);
  }
}
