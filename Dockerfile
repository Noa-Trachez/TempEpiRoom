# Install dependencies only when needed
FROM node:20
WORKDIR /app
COPY ./epiroomnext/package.json ./
RUN yarn install
COPY ./epiroomnext ./
RUN yarn build
CMD ["yarn", "start"]

