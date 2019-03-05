FROM node:10.15.1

RUN apt-get update && \
  apt-get install unzip -y

RUN git clone https://github.com/grpc/grpc-web /github/grpc-web

RUN curl -sSL https://github.com/protocolbuffers/protobuf/releases/download/v3.6.1/protoc-3.6.1-linux-x86_64.zip -o /tmp/protoc.zip && \
  cd /tmp && \
  unzip -qq protoc.zip && \
  cp /tmp/bin/protoc /usr/local/bin/protoc

RUN curl -sSL https://github.com/grpc/grpc-web/releases/download/1.0.3/\
protoc-gen-grpc-web-1.0.3-linux-x86_64 -o /usr/local/bin/protoc-gen-grpc-web && \
  chmod +x /usr/local/bin/protoc-gen-grpc-web

COPY protos/echo.proto /protos/echo.proto

RUN mkdir -p /app/protos && protoc -I=/protos echo.proto \
  --js_out=import_style=commonjs:/app/protos \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:/app/protos
