FROM python:3.11-slim

WORKDIR /usr/src/app
COPY . .

EXPOSE 8000
CMD ["python", "-m", "http.server", "8000"]