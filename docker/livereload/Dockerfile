FROM ruby:latest

WORKDIR /app

RUN gem install guard-livereload
EXPOSE 35729

CMD [ "guard" ]
