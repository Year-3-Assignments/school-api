FROM node:14.17
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -g @babel/core @babel/cli
EXPOSE 4000
ENTRYPOINT [ "npm", "run" ]
CMD [ "production" ]