# Use a Node.js base image
FROM node:latest

# Set working directory in container
WORKDIR ./app

# Copy package.json and yarn.lock to workdir
COPY . .

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build TypeScript code
RUN yarn build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the TypeScript code
CMD ["node", "dist/index.js"]
