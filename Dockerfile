FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY . .
RUN npm install 


EXPOSE 3000


CMD ["npm", "run", "start"]

## rodar como "podman run -p 3000:3000 progweb-image"