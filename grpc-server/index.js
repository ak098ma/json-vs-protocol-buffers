const PROTO_PATH = '/protos/echo.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    }
  );
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const echo = protoDescriptor.echo;

const send = (call, callback) => {
  callback(null, {
    hoge: call.request.hoge,
    fuga: call.request.fuga,
    piyo: call.request.piyo,
  });
};

const server = new grpc.Server();
server.addService(echo.EchoService.service, { send });
server.bind('0.0.0.0:3003', grpc.ServerCredentials.createInsecure());
server.start();
