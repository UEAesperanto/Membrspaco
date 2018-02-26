# Dockerfile to build app
FROM node:latest

WORKDIR /app
RUN npm install -g bower
EXPOSE 8000

COPY entrypoint.sh /
CMD [ "bash", "/entrypoint.sh" ]
