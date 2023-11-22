### STAGE 1: Build ###
FROM node:20.9.0-bullseye AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.24.0-bullseye
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/starter /usr/share/nginx/html
