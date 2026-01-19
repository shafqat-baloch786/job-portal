# Use official Node.js LTS
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Expose app port
EXPOSE 8000

# Run app in dev mode
CMD ["npm", "run", "dev"]
