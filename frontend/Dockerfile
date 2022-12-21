FROM node:14.8-alpine as builder

WORKDIR /app

# Copy all requirements
COPY package.json package-lock.json ./

# Install dependencies
RUN npm update --location=global npm
RUN npm install --only=production

# Copy sources
COPY public public
COPY src src

#ENTRYPOINT npm start
# Build the sources
#ENV FLIGHTS_API_URL http://40.113.156.11/
#ENV FLIGHTS_API_URL http://localhost:4990/
#ENV HOTELS_API_URL http://40.113.156.11/
#ENV HOTELS_API_URL http://localhost:4992/
RUN printenv > .env

RUN npm run build

FROM nginx:alpine as server

WORKDIR /usr/share/nginx/html

# Copy built website
COPY --from=builder /app/build/ .
