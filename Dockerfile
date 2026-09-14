FROM python:3.10-slim

WORKDIR /app

COPY generate_dataset.py verify_notebook.py README.md ./

RUN pip install --no-cache-dir pandas numpy scikit-learn plotly

RUN python generate_dataset.py

CMD ["python", "verify_notebook.py"]
