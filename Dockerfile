# ########## BUILD FOR LOCAL DEVELOPMENT ##########

FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Install app dependencies using package.json and yarn.lock
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Bundle app source and switch user
COPY . .
USER node

# Bundle app source and switch user
COPY . .
USER node

# ########## BUILD FOR PRODUCTION ##########

FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copy package manifests and install all dependencies
COPY package.json yarn.lock ./
COPY --from=development /usr/src/app/node_modules ./node_modules

# Copy all source code and run the production build
COPY . .
RUN yarn build

# Install only production dependencies and cleanup cache
ENV NODE_ENV production
RUN yarn install --frozen-lockfile --production && yarn cache clean
USER node

# ########## PRODUCTION ##########

FROM node:18-alpine AS production

# Copy necessary files from build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
USER node

# Start the application
CMD [ "node", "dist/main.js" ]
