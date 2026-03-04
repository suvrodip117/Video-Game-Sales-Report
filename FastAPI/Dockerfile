# Base docker image
FROM python:3.11-slim

#Setting the working directory
WORKDIR /app

#Copying requirements.txt into main dir and installing dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt


#Copying all folders/files to /app
COPY . .

#exposing PORT
EXPOSE 8000

#Running app
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]