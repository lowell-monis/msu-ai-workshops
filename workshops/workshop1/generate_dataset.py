import pandas as pd
import numpy as np
import os

def generate_applicant_data(num_samples=1000, seed=42):
    np.random.seed(seed)
    
    applicant_ids = [f"APP-{1000 + i}" for i in range(num_samples)]
    groups = np.random.choice(["Group A", "Group B"], size=num_samples, p=[0.6, 0.4])
    
    income = []
    credit_score = []
    years_employed = []
    debt_to_income = []
    nontraditional_gig = []
    
    for g in groups:
        if g == "Group A":
            inc = np.random.normal(75000, 20000)
            cs = np.random.normal(710, 50)
            emp = np.random.normal(7, 3)
            dti = np.random.normal(0.28, 0.08)
            gig = np.random.choice([0, 1], p=[0.85, 0.15])
        else:
            inc = np.random.normal(52000, 18000)
            cs = np.random.normal(640, 65)
            emp = np.random.normal(4, 2.5)
            dti = np.random.normal(0.36, 0.10)
            gig = np.random.choice([0, 1], p=[0.45, 0.55])
            
        income.append(max(18000, round(inc, 2)))
        credit_score.append(max(300, min(850, round(cs))))
        years_employed.append(max(0, round(emp, 1)))
        debt_to_income.append(max(0.05, min(0.85, round(dti, 3))))
        nontraditional_gig.append(gig)
        
    df = pd.DataFrame({
        "applicant_id": applicant_ids,
        "group": groups,
        "income": income,
        "credit_score": credit_score,
        "years_employed": years_employed,
        "debt_to_income": debt_to_income,
        "nontraditional_gig": nontraditional_gig
    })
    
    mask_b = df["group"] == "Group B"
    missing_cs_idx = df[mask_b].sample(frac=0.25, random_state=seed).index
    missing_emp_idx = df[mask_b].sample(frac=0.20, random_state=seed+1).index
    
    df.loc[missing_cs_idx, "credit_score"] = np.nan
    df.loc[missing_emp_idx, "years_employed"] = np.nan
    
    score = (
        0.00004 * df["income"].fillna(40000) +
        0.005 * df["credit_score"].fillna(550) +
        0.04 * df["years_employed"].fillna(2) -
        2.5 * df["debt_to_income"] - 1.2
    )
    prob = 1 / (1 + np.exp(-score))
    df["historical_approval"] = (np.random.rand(num_samples) < prob).astype(int)
    
    return df

if __name__ == "__main__":
    out_dir = r"C:\Users\lowel\msu-ai-workshops\workshops\workshop1"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "applicant_data_raw.csv")
    df = generate_applicant_data()
    df.to_csv(out_path, index=False)
    print(f"Generated synthetic dataset with {len(df)} rows at: {out_path}")
