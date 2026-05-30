FROM node:24.15.0-alpine3.23

WORKDIR /app

COPY package.json package-lock.json* ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]