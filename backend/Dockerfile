FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# Change ownership of the whole working directory after copying
RUN chown -R node:node /app

# Switch to non-root user
USER node

EXPOSE 5000

CMD ["node", "src/server.js"]