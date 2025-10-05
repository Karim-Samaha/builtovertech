
FROM node:20.12-alpine3.18 AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build


FROM node:20.12-alpine3.18 AS production

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json* ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]