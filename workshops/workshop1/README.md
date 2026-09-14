# 🐧 Palmer Penguins Species Classifier & Data Lifecycle Pipeline
### *MSU AI Club Workshop 01 Template Repository*

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.0%2B-orange.svg)](https://scikit-learn.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Pipeline-Passing-brightgreen.svg)](verify_pipeline.py)

An end-to-end Machine Learning classification pipeline predicting Palmer Archipelago penguin species (`Adelie`, `Chinstrap`, `Gentoo`) based on biological measurements. Built with `pandas`, `scikit-learn`, `plotly`, and containerized CLI inference tools.

---

## 📊 Project Overview

This repository executes a 5-stage Data Lifecycle pipeline on the famous Palmer Station Antarctica LTER dataset (`penguins.csv`):

1. **Ingestion**: Raw measurement collection across 344 penguin observations.
2. **Cleaning & Imputation**: Handling missing physical measurements with median/mode imputation.
3. **Preprocessing**: Feature matrix formulation ($X$) and stratified train/test splitting.
4. **Model Training**: Random Forest classification achieving **>95% accuracy**.
5. **CLI Inference**: Interactive command-line tool (`predict.py`) for real-time species predictions.

---

## 🚀 Quickstart & Installation

```bash
# 1. Clone the repository
git clone https://github.com/lowell-monis/msu-ai-workshops.git
cd msu-ai-workshops/workshops/workshop1

# 2. Install required Python packages
pip install pandas numpy scikit-learn plotly jupyter

# 3. Train the classifier model (creates penguin_model.pkl)
python train.py

# 4. Predict species for custom penguin measurements via CLI
python predict.py --bill_length 48.5 --bill_depth 15.0 --flipper_length 217 --body_mass 5000

# 5. Run automated unit tests
python verify_pipeline.py
```

---

## 📁 Repository Architecture

```
palmer-penguins-ml-classifier/
├── README.md                   # Project documentation & Model Card
├── penguins.csv                # Palmer Archipelago raw dataset (344 rows)
├── train.py                    # 5-stage Data Lifecycle training pipeline
├── predict.py                  # CLI inference script
├── penguin_classifier.ipynb    # Jupyter Notebook with EDA & Plotly visualizations
├── verify_pipeline.py          # Automated unit test suite (>95% accuracy check)
└── penguin_model.pkl           # Trained Random Forest model artifact
```

---

## 🎯 Model Performance & Metrics

| Metric | Adelie | Chinstrap | Gentoo | Overall |
|---|---|---|---|---|
| **Precision** | 97% | 92% | 96% | **96%** |
| **Recall** | 97% | 86% | 100% | **96%** |
| **F1-Score** | 97% | 89% | 98% | **96%** |
| **Accuracy** | — | — | — | **95.7%** |

---

## 📚 References

[1] K. B. Gorman, T. D. Williams, and W. R. Fraser, "Ecological sexual dimorphism and environmental variability within a community of Antarctic penguins (genus *Pygoscelis*)," *PLoS ONE*, vol. 9, no. 3, p. e90081, 2014.

[2] C. O'Neil, *Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy*. New York, NY, USA: Crown Publishing Group, 2016.

[3] C. D'Ignazio and L. F. Klein, *Data Feminism*. Cambridge, MA, USA: MIT Press, 2020.

[4] E. Yudkowsky and N. Soares, *If Anyone Builds It, Everyone Dies: Why Superhuman AI Would Kill Us All*. New York, NY, USA: Little, Brown and Company, 2025.

---

## 💙 Credits & License
Maintained by [**Lowell Monis**](https://lowell-monis.github.io/) & the **MSU AI Club Workshop Team**.  
© 2026 Michigan State University AI Club. All rights reserved. Released under the MIT License.
