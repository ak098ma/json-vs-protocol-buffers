FROM jvpb/common

WORKDIR /app

COPY grpc-server .

RUN yarn install

EXPOSE 3003

CMD ["yarn", "start"]
