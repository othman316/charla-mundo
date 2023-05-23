FROM node:18.16.0-alpine3.17
# RUN addgroup app && adduser -S -G app app
# USER app
WORKDIR /app
RUN mkdir data
COPY package*.json .
RUN npm install
COPY . .
ENV KEY=value
EXPOSE 3000

#exec CMD
CMD ["npm","run","dev"]