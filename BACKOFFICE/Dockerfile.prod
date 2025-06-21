FROM node:18

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 4173

CMD ["npx", "vite", "preview", "--host", "--port", "4173"]
