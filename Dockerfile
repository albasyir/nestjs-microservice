# syntax=docker/dockerfile:1

###########################################
# BASE IMAGE
###########################################
FROM node:22.14 AS base

WORKDIR /app

###########################################
# Build App
###########################################
FROM base AS build
COPY . .
COPY --from=install_deps /app/node_modules ./node_modules

# Set the environment variable
ENV NODE_ENV=production

# Run the build command
RUN bun run build order
RUN bun run build kitchen
RUN bun run build notification

###########################################
# Development Image
###########################################
FROM base AS development

# copy project
COPY . .

# setup entrypoint
COPY ./docker/development/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the environment variable
ENV NODE_ENV=development

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

###########################################
# Install Project Depedencies
###########################################
FROM base AS install_deps

# Copy only file that required for install depedency
COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json

# Install all package dependencies
RUN npm install --frozen-lockfile

###########################################
# Production Image
###########################################
FROM base AS production

# copy entry point script
COPY ./docker/production/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the environment variable
ENV NODE_ENV=production

# Copy the output from the build stage
COPY --from=build /app/dist/apps .
COPY --from=install_deps /app/node_modules ./node_modules

# Command to run the application
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

