# pull the official base image
FROM python:3.8-slim-buster

# set work directory
WORKDIR /flaskapi

# copy project
COPY . /flaskapi


# install dependencies
RUN pip3 install --upgrade pip 
RUN pip3 install -r requirements.txt

EXPOSE 8000

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]