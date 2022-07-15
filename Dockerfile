FROM node:16
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000
ENTRYPOINT ["node", "app.js"]