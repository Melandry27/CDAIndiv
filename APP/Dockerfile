FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npx expo export --platform web --output-dir dist

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80