FROM python:3.8-slim-buster
WORKDIR /server

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY server.py .
EXPOSE 8000
CMD ["gunicorn", "server:app", "-b 0.0.0.0:8000"]
