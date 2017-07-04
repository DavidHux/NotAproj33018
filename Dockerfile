FROM registry.njuics.cn/library/node:6-alpine

COPY . /app
WORKDIR /app

RUN npm install

ENTRYPOINT ["npm", "start"]
