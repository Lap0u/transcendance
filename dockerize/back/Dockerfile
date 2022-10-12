FROM node:18-alpine3.15

WORKDIR /app

COPY ./setup.sh .

RUN chmod +x ./setup.sh

EXPOSE 4000

# CMD ["tail", "-f", "/dev/null" ]

ENTRYPOINT [ "/app/setup.sh" ]

