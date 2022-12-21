FROM python:3.8-slim-buster

WORKDIR /app

RUN apt-get update && pip install -U pip

COPY . .

RUN pip install -r requirements.txt

EXPOSE 80

CMD uvicorn main:app --host 0.0.0.0 --port 80
