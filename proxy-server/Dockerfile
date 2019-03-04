FROM envoyproxy/envoy:latest

WORKDIR /app

COPY proxy-server/envoy.yaml envoy.yaml

EXPOSE 3002

CMD ["envoy", "-c", "envoy.yaml"]
