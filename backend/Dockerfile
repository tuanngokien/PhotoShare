FROM node:8
RUN mkdir /photoshare
WORKDIR /photoshare
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 1411
CMD [ "npm", "start" ]
