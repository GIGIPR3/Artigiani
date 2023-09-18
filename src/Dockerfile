FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm build
FROM nginx:latest
COPY --from=build /app/dist/app /usr/share/nginx/html
EXPOSE 8082