FROM node:14.8-alpine as builder

WORKDIR /app

# Copy all requirements
COPY package*.json ./

# Install dependencies
RUN npm update --location=global npm
RUN npm install --only=production

# Copy sources
COPY public public
COPY src src

#ENTRYPOINT npm start
# Build the sources
RUN npm run build

FROM nginx:alpine as server

WORKDIR /usr/share/nginx/html

# Copy built website
COPY --from=builder /app/build/ .
