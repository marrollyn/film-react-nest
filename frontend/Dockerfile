FROM node:20-alpine AS build
# FROM node:20-slim AS build 
WORKDIR /app
COPY package*.json ./
# RUN npm install
RUN rm -f package-lock.json && npm install --include=optional

COPY . .
RUN npm run build
CMD ["npm", "run", "build"]
