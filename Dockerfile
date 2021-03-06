FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4001
CMD [ "npm", "start" ]
