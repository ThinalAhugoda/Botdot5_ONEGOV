FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install 
RUN npm install -g expo-cli @expo/ngrok
COPY . .
EXPOSE 8081 19000 19001 19002
CMD ["expo", "start", "--tunnel", "--port", "8081", "--localhost"]
