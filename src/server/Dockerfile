FROM public.ecr.aws/docker/library/python:3.12-bookworm

WORKDIR /app

COPY . /app/

RUN pip install httpx fastapi uvicorn bs4

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]