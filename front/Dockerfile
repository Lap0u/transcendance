FROM node:16.17-buster

WORKDIR /app

COPY ./setup.sh .

RUN chmod +x ./setup.sh

EXPOSE 3000

# CMD ["tail", "-f", "/dev/null" ]

ENTRYPOINT [ "sh", "/app/setup.sh" ]
