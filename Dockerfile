# specify the node base image with your desired version node:<version>
FROM node:6


WORKDIR /usr/src/app

COPY . .

RUN npm i


# replace this with your application's default port
EXPOSE 3000

CMD ["npm", "start" ]