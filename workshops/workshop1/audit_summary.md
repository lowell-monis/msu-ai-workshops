# 📜 Portfolio Artifact: Data Lineage & Feedback Loop Audit
**Author / Student**: MSU AI Club Member  
**Workshop Date**: September 14, 2026  
**Event**: Kickoff Workshop — *The Art of the Data Lifecycle: Storytelling in AI*  
**Song of the Day**: Billy Joel — *Vienna*  

---

## 1. Raw Data Inspection & Unmeasured Variables [2]
> **Reflection Question**: What variables are completely missing from this dataset that might matter for an applicant?  
> **Student Answer**:  
> # TODO: Replace this string with your reflection
# E.g., 'The dataset lacks non-traditional financial metrics like rental payment history, caregiving duties, and gig-economy stability [2].'

---

## 2. Data Cleaning Audit (Naïve dropna vs Imputation) [2]
- **Total Applicants**: 1000
- **Naïve Deletion Loss**: 158 rows dropped (15.8%)
- **Demographic Impact**: Non-traditional Group B lost disproportionately more rows due to missing credit reporting [2].
- **Imputation Remedy**: Applied median fill (`df.fillna(df.median(numeric_only=True))`), preserving 100% of applicants.

---

## 3. Disparate Impact & WMD Analysis [1]
- **Group A Approval Rate**: 100.0%
- **Group B Approval Rate**: 97.2%
- **Disparate Impact Ratio**: 0.972 (Legal Threshold: 0.80) [1]
> **WMD Framework Reflection (Opacity & Damage)**:  
> # TODO: Write your note on Opacity and Damage below
# E.g., 'Group B suffers from lower approval due to unmeasured non-traditional signals (Damage). The black box classifier hides feature weighting (Opacity) [1].'

---

## 4. Feedback Loop Mitigation [1]
- **Unmitigated Feedback Loop**: Disparate impact degrades over 4 generations as automated predictions reinforce historical exclusion [1].
- **Human Oversight Intervention**: Adding a 10% manual audit sample on rejections prevents catastrophic feedback cascades and stabilizes parity above the 0.80 threshold.

---

## 5. Personal Ethical Commitment [1]–[4]
*I commit to inspecting upstream data collection choices, auditing cleaning filters for demographic loss, and advocating for human oversight loops in automated decision systems.*

---

## 6. References
[1] C. O'Neil, Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy. Crown, 2016.
[2] C. D'Ignazio and L. F. Klein, Data Feminism. MIT Press, 2020.
[3] Pope Leo XIV, Magnifica Humanitas: On Safeguarding the Human Person in the Time of AI, 2025.
[4] E. Yudkowsky and N. Soares, If Anyone Builds It, Everyone Dies. Little, Brown and Company, 2025.
