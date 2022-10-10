FROM node:18-alpine3.15

WORKDIR /app

COPY ./game .

RUN npm ci 

CMD [ "npm", "run", "start" ]

# ENV NODE_ENV production

EXPOSE 3000