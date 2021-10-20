FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.21.3-alpine

WORKDIR /usr/share/nginx/html/

COPY --from=builder /usr/src/app/build ./
COPY --from=builder /usr/src/app/public ./
