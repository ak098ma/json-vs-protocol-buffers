FROM jvpb/common

WORKDIR /app

COPY json-server .

RUN yarn install

EXPOSE 3001

CMD ["yarn", "start"]
