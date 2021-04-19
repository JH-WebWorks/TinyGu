FROM node:14.16

COPY . .

RUN yarn install

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "deploy"]