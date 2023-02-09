FROM php:fpm
WORKDIR "/application"

# Fix debconf warnings upon build
ARG DEBIAN_FRONTEND=noninteractive

# Install selected extensions and other stuff
RUN apt-get update \
    # && apt-get -y --no-install-recommends install  php7.4-mysql \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions gd xdebug mysqli pdo_mysql

RUN echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    # host.docker.internal does not work on Linux yet: https://github.com/docker/for-linux/issues/264
    # Workaround:
    # ip -4 route list match 0/0 | awk '{print $3 " host.docker.internal"}' >> /etc/hosts \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# An IDE key has to be set, but anything works, at least for PhpStorm and VS Code...
ENV XDEBUG_CONFIG="xdebug.idekey=''"
