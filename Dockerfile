FROM node:20-alpine

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/certs

COPY package* .

RUN npm install

RUN npm install -g serve

EXPOSE 443

COPY . .

RUN npm run build

CMD ["node", "serve.js"]