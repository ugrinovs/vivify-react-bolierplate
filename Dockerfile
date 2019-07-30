FROM node:alpine

WORKDIR /app

COPY ./entrypoint.sh /

RUN chmod +x /entrypoint.sh

USER 1000:1000

CMD ["/entrypoint.sh"]
