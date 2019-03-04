FROM jvpb/common

WORKDIR /app

COPY client .

RUN yarn install && yarn build

EXPOSE 3000

CMD ["yarn", "start"]
