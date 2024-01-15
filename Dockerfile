FROM node:20-alpine

WORKDIR usr/src/app

COPY package* .

RUN npm install

RUN npm install -g serve

EXPOSE 80

COPY . .

RUN npm run build

CMD ["serve", "-s", "build", "-l", "80"]