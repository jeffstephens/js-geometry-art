FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY index.html /usr/share/nginx/html
COPY interactive.js /usr/share/nginx/html
COPY render.js /usr/share/nginx/html
COPY jquery-3.2.1.min.js /usr/share/nginx/html
COPY style.css /usr/share/nginx/html

EXPOSE 80
