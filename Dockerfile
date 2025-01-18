
FROM oven/bun:1 AS base

WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install node modules
COPY bun.lockb package.json ./
RUN bun install

# Copy application code
COPY . .

# Build application
RUN bun run build --preset bun

# Remove development dependencies
# RUN bun prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", ".output/server/index.mjs" ]