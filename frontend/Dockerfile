FROM node AS build

ARG ENDPOINT

COPY package.json webpack.config.js /app/
WORKDIR /app/
RUN npm install

COPY src /app/src
RUN npm run build

FROM nginx

COPY --from=build /app/build /www/static/
COPY nginx.conf /etc/nginx/
