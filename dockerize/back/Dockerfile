FROM node:18-alpine3.15

WORKDIR /app

COPY ./back .

RUN npm ci

CMD [ "npm", "run", "start" ]

EXPOSE 4000
