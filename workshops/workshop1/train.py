"""
Palmer Penguins Species Classifier & Data Lifecycle Training Pipeline
Author: MSU AI Club Workshop 01 Team
Date: Fall 2026

This script executes the complete 5-stage Data Lifecycle pipeline:
1. Ingestion: Load raw Palmer Archipelago penguin dataset (penguins.csv)
2. Cleaning & Imputation: Handle missing biological measurements
3. Feature Engineering & Preprocessing: Prepare feature matrix X and target y
4. Model Training: Train a Random Forest Classifier
5. Evaluation & Export: Save trained model artifact (penguin_model.pkl)
"""

import os
import sys
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Ensure cross-platform UTF-8 terminal encoding
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

def load_data(file_path="penguins.csv"):
    """Stage 1: Load raw Palmer Penguins dataset."""
    if not os.path.exists(file_path):
        file_path = "https://raw.githubusercontent.com/lowell-monis/msu-ai-workshops/main/workshops/workshop1/penguins.csv"
    print(f"[Ingestion] Loading dataset from: {file_path}")
    df = pd.read_csv(file_path)
    print(f"            Dataset Shape: {df.shape[0]} rows, {df.shape[1]} columns")
    return df

def clean_data(df):
    """Stage 2: Process & Impute missing values (Data Lifecycle Stage 2)."""
    df_clean = df.copy()
    
    numeric_cols = ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]
    for col in numeric_cols:
        if df_clean[col].isnull().sum() > 0:
            median_val = df_clean[col].median()
            df_clean[col] = df_clean[col].fillna(median_val)
            
    if df_clean["sex"].isnull().sum() > 0:
        mode_sex = df_clean["sex"].mode()[0]
        df_clean["sex"] = df_clean["sex"].fillna(mode_sex)
        
    return df_clean

def train_model(df):
    """Stage 3 & 4: Train classifier and evaluate performance."""
    feature_cols = ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]
    X = df[feature_cols]
    y = df["species"]
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    clf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
    clf.fit(X_train, y_train)
    
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print("\n" + "=" * 50)
    print(f"[Evaluation] Model Accuracy Score: {accuracy:.1%}")
    print("=" * 50)
    print("\n--- Classification Performance Report ---")
    print(classification_report(y_test, y_pred))
    
    print("--- Feature Importances ---")
    for feat, imp in zip(feature_cols, clf.feature_importances_):
        print(f"  * {feat:20s}: {imp:.4f}")
        
    return clf, accuracy

def export_model(model, output_path="penguin_model.pkl"):
    """Stage 5: Save trained model artifact."""
    with open(output_path, "wb") as f:
        pickle.dump(model, f)
    print(f"\n[Export] Model artifact saved successfully to: {output_path}")

def main():
    print("Starting Palmer Penguins ML Classifier & Data Lifecycle Training...")
    df_raw = load_data()
    df_clean = clean_data(df_raw)
    model, accuracy = train_model(df_clean)
    export_model(model)
    print("[Success] Training Pipeline Finished Successfully!")

if __name__ == "__main__":
    main()
