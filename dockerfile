FROM node:10
WORKDIR /opt/app
COPY package*.json ./
RUN npm install

RUN echo "v3"
COPY . .
EXPOSE 5000
CMD [ "node", "app.js" ]
