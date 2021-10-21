FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN apt-get update \
    && apt-get install -y postgresql-client-13 \
    && rm -rf /var/lib/apt/lists/*
RUN pip install -r requirements.txt
COPY . /code/

