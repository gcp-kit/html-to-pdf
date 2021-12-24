FROM node:16.13-alpine

WORKDIR /work

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "start" ]
