# Use an updated Node.js version (bcrypt requires Node 18+)
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first (to leverage Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure bcrypt is installed correctly inside the container
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application files
COPY . .

# Expose the port used by the app
EXPOSE 5000

# Command to start the application
CMD ["npm", "start"]
