import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
import os

print("--- Testing Cell 1 ---")
DATA_URL = r"C:\Users\lowel\msu-ai-workshops\workshops\workshop1\applicant_data_raw.csv"
df = pd.read_csv(DATA_URL)
print(f"Dataset shape: {df.shape}")
student_reflection_q1 = "The dataset lacks non-traditional financial metrics like rental payment history and gig economy stability."

print("--- Testing Cell 2 ---")
df_naive = df.dropna()
dropped_count = len(df) - len(df_naive)
print(f"Dropped rows: {dropped_count}")
df_cleaned = df.fillna(df.median(numeric_only=True))

print("--- Testing Cell 3 ---")
features = ["income", "credit_score", "years_employed", "debt_to_income"]
X = df_cleaned[features]
y = df_cleaned["historical_approval"]

model = DecisionTreeClassifier(max_depth=4, random_state=42)
model.fit(X, y)
df_cleaned["predicted_approval"] = model.predict(X)

group_stats = df_cleaned.groupby("group")["predicted_approval"].agg(["count", "mean"]).reset_index()
group_stats.columns = ["group", "total_applicants", "approval_rate"]

rate_A = group_stats.loc[group_stats["group"] == "Group A", "approval_rate"].values[0]
rate_B = group_stats.loc[group_stats["group"] == "Group B", "approval_rate"].values[0]
disparate_impact_ratio = rate_B / rate_A

print(f"Rate A: {rate_A:.2f}, Rate B: {rate_B:.2f}, DI Ratio: {disparate_impact_ratio:.3f}")
student_reflection_q2 = "Group B suffers from lower approval due to missing traditional credit scores (Damage). The classifier hides weighting (Opacity)."

print("--- Testing Cell 4 ---")
def simulate_feedback_loop(df_base, generations=3, audit_rate=0.0):
    history = []
    current_df = df_base.copy()
    
    for gen in range(1, generations + 1):
        X_gen = current_df[features]
        y_gen = current_df["historical_approval"]
        
        clf = DecisionTreeClassifier(max_depth=4, random_state=gen)
        clf.fit(X_gen, y_gen)
        
        preds = clf.predict(X_gen)
        
        if audit_rate > 0.0:
            rejection_indices = np.where(preds == 0)[0]
            num_audited = int(len(rejection_indices) * audit_rate)
            audited_samples = np.random.choice(rejection_indices, size=num_audited, replace=False)
            preds[audited_samples] = (current_df.iloc[audited_samples]["income"] > 45000).astype(int)
            
        current_df["predicted_approval"] = preds
        
        rate_a = current_df[current_df["group"] == "Group A"]["predicted_approval"].mean()
        rate_b = current_df[current_df["group"] == "Group B"]["predicted_approval"].mean()
        di_ratio = rate_b / rate_a if rate_a > 0 else 0
        
        history.append({
            "Generation": f"Gen {gen}",
            "Group A Approval": rate_a,
            "Group B Approval": rate_b,
            "Disparate Impact Ratio": di_ratio,
            "Audit Rate": f"{int(audit_rate*100)}%"
        })
        
        current_df["historical_approval"] = current_df["predicted_approval"]
        
    return pd.DataFrame(history)

history_unmitigated = simulate_feedback_loop(df_cleaned, generations=4, audit_rate=0.0)
history_mitigated = simulate_feedback_loop(df_cleaned, generations=4, audit_rate=0.10)

print("--- Testing Cell 5 ---")
summary_path = r"C:\Users\lowel\msu-ai-workshops\workshops\workshop1\audit_summary_example.md"
with open(summary_path, "w", encoding="utf-8") as f:
    f.write(f"# 📜 Audit Summary Example\nDI Ratio: {disparate_impact_ratio:.3f}\n")
print(f"Wrote audit summary example to {summary_path}")
print("SUCCESS: All verification steps PASSED!")
