# Use the official Node.js image to build the app
FROM node:20 AS build
#WORKDIR ../../../VS Code/Vue/MusicSynchronizer/music-synchronizer

# Set the working directory in docker environment
WORKDIR /vue

# Copy package.json and package-lock.json (if it exists)
COPY package*.json ./
# RUN npm i -g @quasar/cli
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app using Quasar CLI
RUN npm run build

# Use Nginx to serve the app
FROM nginx:alpine
COPY --from=build /vue/dist/spa /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d/default.conf

# Expose the port the app runs on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
