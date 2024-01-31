FROM node:alpine3.19 AS development
ENV NODE_ENV development
COPY . /frontend
WORKDIR /frontend

# COPY package*.json .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]

# FROM node:20-alpine AS production
# ENV NODE_ENV production
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install --production

# COPY . .
# EXPOSE 80
# CMD ["npm", "start"]