# Use official Node image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy package*.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

# Expose the port (for local clarity)
EXPOSE 5000

# Command to start
CMD ["npm", "start"]
