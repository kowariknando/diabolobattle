# Use the latest LTS version of Node (Node 18)
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure bcrypt and other native dependencies are rebuilt correctly
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to start the application
CMD ["npm", "start"]
