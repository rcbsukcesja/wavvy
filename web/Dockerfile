### STAGE 1: Build ###
FROM node:20.10.0-alpine AS build
WORKDIR /usr/src/app

COPY . .

ARG API_URL
ARG KEYCLOAK_REALM
ARG KEYCLOAK_URL
ARG KEYCLOAK_CLIENT_ID

ENV API_URL=${API_URL}
ENV KEYCLOAK_REALM=${KEYCLOAK_REALM}
ENV KEYCLOAK_URL=${KEYCLOAK_URL}
ENV KEYCLOAK_CLIENT_ID=${KEYCLOAK_CLIENT_ID}

RUN npm install
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.24.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/starter/browser /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html/assets/images/logo
RUN mkdir /usr/share/nginx/html/assets/images/project
