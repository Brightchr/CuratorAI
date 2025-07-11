# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY ./app/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code (including run_backend.py and app folder)
COPY ./app ./app
COPY ./run_backend.py ./run_backend.py

# Set PYTHONPATH so `app` is treated as a module
ENV PYTHONPATH=/app

# Expose the port FastAPI will use
EXPOSE 8000

# Run using the Python entry point
CMD ["python", "run_backend.py"]
