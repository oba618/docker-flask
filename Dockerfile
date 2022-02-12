FROM python:3.8.11-slim-buster

RUN pip install --upgrade pip
RUN pip install flask==2.0.1

ENV PORT 80

WORKDIR /app

COPY ./app/ /app

CMD ["python", "app.py"]