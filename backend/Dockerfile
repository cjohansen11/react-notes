FROM node:18

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3001

RUN yarn prisma generate

RUN yarn prisma migrate deploy

CMD ["yarn", "build"]