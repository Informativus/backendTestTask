FROM node:22-alpine

WORKDIR /testBackend
COPY package.json package-lock.json ./

RUN npm install --production
COPY dist ./dist
COPY .env.prod .env

ENTRYPOINT ["npm", "run", "start:prod"]

