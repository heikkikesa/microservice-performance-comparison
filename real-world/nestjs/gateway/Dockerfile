FROM node:14.15-alpine AS BUILDER
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14.15-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
