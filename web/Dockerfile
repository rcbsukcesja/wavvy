### STAGE 1: Build ###
FROM node:20.5.1-bullseye AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.24.0-bullseye
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/starter/browser /usr/share/nginx/html
