
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /app /usr/share/nginx/html
EXPOSE 8082