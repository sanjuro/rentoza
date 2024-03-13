FROM node:18-alpine

# Arguments for user and group IDs
ARG UID=1000
ARG GID=1000

# Expose port
EXPOSE 6000

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY ./package.json /package.json

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy remaining source code
COPY . .

# Change ownership of the /app directory to the specified user and group
RUN chown -R $UID:$GID /app

# Switch to non-root user
USER $UID

# Start the application
CMD ["npm", "start"]
