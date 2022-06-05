# FROM node:16.5.0-alpine
FROM node:12.18.3-alpine

WORKDIR /app
COPY package.json /app

RUN npm install

COPY . .

# RUN rm -r client/node_modules
RUN cd client &&npm install --save-dev rebuild-node-sass node-sass
RUN cd client && npm i --legacy-peer-deps
RUN cd client && npm run build

CMD ["node", "index.js"]