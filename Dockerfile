FROM node:16.14.2-alpine3.15
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S lob-user
COPY . .
RUN npm install
RUN chown -R lob-user /opt/app
USER lob-user
EXPOSE 4200
CMD ["npm", "start"]
