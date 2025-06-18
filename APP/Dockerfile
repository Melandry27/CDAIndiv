FROM node:18

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps
RUN npx expo export --platform web --output-dir dist

EXPOSE 8080

CMD ["npx", "serve", "dist", "-l", "8080"]
