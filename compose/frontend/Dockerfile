FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY ../../frontend/package.json ../../frontend/package-lock.json* ./

# Install all dependencies (dev + prod)
RUN npm install

# Copy all frontend code
COPY ../../frontend/. ./

# Expose port for Next.js dev server
EXPOSE 3000

# Start dev server
CMD ["npm", "run", "dev"]
