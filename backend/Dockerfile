FROM node

COPY . /app/
WORKDIR /app/
RUN npm install

EXPOSE 9000
ENTRYPOINT ["npm", "start"]
