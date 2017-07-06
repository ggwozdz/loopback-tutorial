FROM node:7.3.0
RUN mkdir /opt/shared &&\
 mkdir /opt/shared/config &&\
 mkdir /opt/shared/log &&\
 touch /opt/shared/handler_file &&\
 mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app
COPY app-start /usr/bin/
RUN chmod +x /usr/bin/app-start

LABEL appVersion="__appVersion__"
EXPOSE 3000
ENTRYPOINT [ "/usr/bin/app-start"]
