FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node . .

ENV DEBUG=playground:*

USER node

EXPOSE 3000

CMD ["npm", "start"]
