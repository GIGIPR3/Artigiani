FROM node:latest as build
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod
FROM trion/nginx-angular:latest AS ngi

COPY --from=build /app/dist/artigiani /usr/share/nginx/html
EXPOSE 8080