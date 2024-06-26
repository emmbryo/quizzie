# Specifies a base image, a specific version of the Node.js image.
FROM node:20.8.0-bullseye-slim

# Creates a working directory in the Docker image. The application will be placed here.
WORKDIR /usr/src/app

# Copies the package.json and package-lock.json (or npm-shrinkwrap.json) to the app directory.
# This is done separately from copying the rest of the app's code to leverage Docker's cache.
# As a result, the Docker image layer with installed dependencies is only rebuilt when these files change.
COPY package*.json ./

# Runs the npm install command to install the dependencies specified in the package.json file.
RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

# Copies the rest of the application code to the app directory.
COPY . .

# Create the log directory
RUN mkdir -p /var/log/quizzie-auth

# Change the owner of the log directory to the node user
RUN chown -R node:node /var/log/quizzie-auth

# Sets the user that the Docker container runs as. In this case, it's set to 'node' to avoid running as root for security reasons.
USER node

# Exposes a port that the application listens on. The actual port number is provided by the NODE_PORT environment variable.
EXPOSE ${NODE_PORT}

# Defines the command to start the application. In this case, the application is started with nodemon, a utility that monitors for any changes in the source and automatically restarts the server. 
# The '-e' flag is used to specify the file extensions that nodemon should watch.
# The '--inspect' flag is used to enable the inspector agent.
CMD [ "npx", "nodemon", "-e" , "js,json,ejs,html,css", "--inspect", "src/server.js"]
