FROM node:18-bullseye

# Create app directory
WORKDIR /usr/src/app

RUN apt-get -y update && \ 
    apt-get -y install nginx && \
    apt-get -y install supervisor && \
    apt-get -y install apt-transport-https ca-certificates curl gnupg && \
    curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | apt-key add - && \
    echo "deb https://packages.doppler.com/public/cli/deb/debian any-version main" | tee /etc/apt/sources.list.d/doppler-cli.list && \
    apt-get -y update && \
    apt-get -y install doppler

# Copy nginx config
COPY nginx/default.conf /etc/nginx/sites-available/default

# Copy supervisor config
COPY supervisord/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Install React dependencies
RUN mkdir ./frontend
COPY frontend/package.json ./frontend
COPY frontend/yarn.lock ./frontend
RUN yarn install --frozen-lockfile --cwd ./frontend

# Install Express dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frontend-lockfile

# Copy source files & build
COPY . .
RUN yarn build

# Clean up
RUN rm -rf ./frontend ./src

EXPOSE 80
EXPOSE 443

CMD ["doppler", "run", "--", "/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]