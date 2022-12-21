version="0.0.1"
pip freeze > requirements.txt
docker build -f Dockerfile -t cars_rent:v$version .
#docker tag compute-similarity:v$version 435994096874.dkr.ecr.eu-west-1.amazonaws.com/compute-similarity:v$version
#docker push 435994096874.dkr.ecr.eu-west-1.amazonaws.com/compute-similarity:v$version

#kubectl delete -f kubernetes.yaml
#kubectl apply -f kubernetes.yaml