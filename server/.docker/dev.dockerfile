FROM node:12

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 4200

CMD ["npm", "run", "dev"]
