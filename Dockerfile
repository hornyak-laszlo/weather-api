FROM node:12-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production
COPY . .

ENV PORT 8080
ENV HOST 0.0.0.0

CMD ["npm", "start"]