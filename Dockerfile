# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the NestJS application will run (change it if needed)
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start"]
