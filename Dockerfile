# build environment
FROM node:18-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
# FROM nginx:stable-alpine
FROM openresty/openresty:xenial
RUN apt-get update && apt-get install -y build-essential git \
    libpcre3-dev libcurl4-openssl-dev libcurl3 luarocks wget curl
RUN wget -qO- "https://cmake.org/files/v3.17/cmake-3.17.0-Linux-x86_64.tar.gz" | tar --strip-components=1 -xz -C /usr/local
COPY install-c-server-sdk.sh .
RUN ./install-c-server-sdk.sh
RUN mkdir -p /usr/local/openresty/nginx/scripts
COPY nginx/default.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY shared.lua /usr/local/openresty/nginx/scripts/

# COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /app/dist /usr/share/nginx/html

ADD https://raw.githubusercontent.com/nginx/nginx/master/conf/mime.types /etc/nginx/mime.types

ADD https://github.com/launchdarkly/lua-server-sdk/archive/1.2.2.zip \
    /tmp/lua-server-sdk/sdk.zip

RUN cd /tmp/lua-server-sdk/ && \
    unzip sdk.zip && \
    cd lua-server-sdk-1.2.2 && \
    luarocks make launchdarkly-server-sdk-1.0-0.rockspec && \
    cp launchdarkly_server_sdk.so /usr/local/openresty/lualib/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
