FROM python:3.8-slim-buster

WORKDIR /app

RUN pip install -U pip

COPY . .

RUN pip install -r requirements.txt

EXPOSE 80

CMD uvicorn main:app --host 0.0.0.0 --port 80



#machine
#-------
#localhost    127.0.0.1 <- defaut
#public         0.0.0.0
#
#uvicorn main:app --host localhost --port 8000
#public:8000
#
#utilisateur
#-----------
#localhost    127.0.0.1
#
#
#localhost:8000
#8000:8000
