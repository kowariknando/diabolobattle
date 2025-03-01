# Dockerfile at the root of your repository
FROM node:18

# Create app directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first (for faster caching)
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all project files into container
COPY . .

# Expose the backend port (check what port you actually use in your code)
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "start"]
