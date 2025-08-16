FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 8081 19000 19001 19002
CMD ["npx", "expo", "start", "--tunnel"]
