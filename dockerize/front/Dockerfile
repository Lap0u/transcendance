FROM node:18-alpine3.15

WORKDIR /app

COPY ./game .

RUN npm ci 

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npx", "serve", "build" ]