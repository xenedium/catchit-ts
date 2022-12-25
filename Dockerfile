FROM node:18-bullseye

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update -y && \ 
    apt-get install -y nginx && \
    apt-get install -y supervisor

# Copy nginx config
COPY nginx/default.conf /etc/nginx/sites-available/default

# Copy supervisor config
COPY supervisord/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Check nginx config
RUN nginx -t

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

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]