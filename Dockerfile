FROM node:18.18.0 AS client
WORKDIR /app/client-app
COPY client-app/package.json ./
RUN npm install
COPY client-app/ .
RUN npm run build

FROM node:18.18.0 AS server
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]