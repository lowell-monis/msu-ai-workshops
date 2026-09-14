# 📊 Workshop 01: The Art of the Data Lifecycle: Storytelling in AI
### *The Data Lineage Inspector & Feedback Loop Simulator*

**Date**: September 14, 2026 @ 6:00 PM  
**Location**: STEM 3202, Michigan State University  
**Points**: 100 PTS  
**Event Link**: [MSU AI Club Events Page](https://www.msuaiclub.com/events)  
**Today's Track**: Billy Joel — *Vienna*  

---

# How to Reproduce Results & Run Workshop 1

Follow these steps to run the analysis pipeline and generate your executive audit summary (`audit_summary.md`).

### Option 1: In-Browser Interactive Suite (Zero Installation)
Open [`index.html`](index.html) in any web browser or visit the live GitHub Pages / Vercel site:
* Execute interactive cell simulations directly inside your browser.
* Use the **Human Oversight Audit Slider** (0% to 50%) to dynamically damp feedback cascades in real time.
* Click **📥 Export Executive Audit Summary** to download your `audit_summary.md`.

### Option 2: Open in Google Colab
Launch the pre-configured notebook directly in Google Colab:
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/lowell-monis/msu-ai-workshops/blob/main/workshops/workshop1/data_lineage_inspector.ipynb)

### Option 3: Run Locally via Python & Jupyter
```bash
# Navigate to Workshop 1 directory
cd msu-ai-workshops/workshops/workshop1

# Install dependencies
pip install pandas numpy scikit-learn plotly jupyter

# Generate synthetic dataset (if needed)
python generate_dataset.py

# Test notebook pipeline
python verify_notebook.py

# Launch Jupyter Notebook
jupyter notebook data_lineage_inspector.ipynb
```
* *Expected Outcome*: Running `verify_notebook.py` prints `SUCCESS: All verification steps PASSED!` and writes `audit_summary_example.md`.

---

# 📚 References

[1] C. O'Neil, *Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy*. New York, NY, USA: Crown Publishing Group, 2016.

[2] C. D'Ignazio and L. F. Klein, *Data Feminism*. Cambridge, MA, USA: MIT Press, 2020.

[3] Pope Leo XIV, *Magnifica Humanitas: On Safeguarding the Human Person in the Time of Artificial Intelligence*, Encyclical Letter, Vatican City: Libreria Editrice Vaticana, 2025.

[4] E. Yudkowsky and N. Soares, *If Anyone Builds It, Everyone Dies: Why Superhuman AI Would Kill Us All*. New York, NY, USA: Little, Brown and Company, 2025.

---

## 💙 Credits & License
Maintained by [**Lowell Monis**](https://lowell-monis.github.io/) & the **MSU AI Club Workshop Team**.  
Dedicated to empowering students with hands-on AI engineering, ethical data practices, and industry portfolio development.  
© 2026 Michigan State University AI Club. All rights reserved. Released under the MIT License.
