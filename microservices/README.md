# Microservices

You need a dedicated environment to run the microservices (ideally Anaconda). You can create this environment this way:

```shell
cd microservices
conda create -n boot python=3.9 pip
conda activate boot
pip install -r requirements.txt
```

To run the microservices locally in two separated terminals:

```shell
cd microservices/flights
uvicorn main:app --port 8000 --reload
```

```shell
cd microservices/booking
uvicorn main:app --port 8001 --reload
```

You can check they are running by opening respectively http://localhost:8000 and http://localhost:8001 in your browser. 
