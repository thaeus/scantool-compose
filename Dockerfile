FROM node:latest
RUN mkdir -p /scan
#WORKDIR /egg
#COPY . /egg
#RUN yarn run build
#RUN yarn global add serve
#RUN apt update &&  apt install mongodb
WORKDIR /scan
COPY . /scan
#RUN npm install
#CMD ["npm", "run-script", "build"]
CMD ["npm", "start"]
EXPOSE 8891
##ENTRYPOINT "./randomEgg.sh"
