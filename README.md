# 📊 MSU AI Club Workshop Hub & Portfolio Journey
### *Michigan State University AI Club — Fall 2026 / Spring 2027 Series*

**Official Landing Hub**: [MSU AI Workshops Web Application](index.html)  
**Main Event Link**: [MSU AI Club Events Page](https://www.msuaiclub.com/events)  
**Official Spotify Playlist**: [AI Club Workshop Playlist](https://open.spotify.com/playlist/3c5WgCEdJatgJeFhgUbVwN?si=9cf4eca9bb424ca4)  
**Today's Track (Workshop 1)**: Billy Joel — *Vienna*  

---

# Overview

This repository (**`msu-ai-workshops`**) is the single consolidated landing hub and master repository for the entire year-long **MSU AI Club Workshop Series**.

Instead of creating separate scattered repositories for every session, all workshop codebases, datasets, notebooks, and interactive simulators are structured cleanly within subdirectories under `workshops/`.

## Consolidated Repository Architecture

```
msu-ai-workshops/
├── index.html                           # Master Hub Landing Page (Rubik font, Pure Black #000000 theme)
├── styles.css                           # Editorial Dark CSS Design System (Rubik font-optical-sizing, high-contrast)
├── app.js                               # Particles.js canvas, tab switcher, Plotly charts, branching tree & exporter
├── README.md                            # Centralized Master Hub Documentation, Rubik Font guide & references
├── Dockerfile                           # Containerized run configuration
├── .gitignore                           # Git ignore configuration
└── workshops/
    └── workshop1/
```

---

# Typography: Rubik Font Integration

The landing page loads the complete variable weight range of **Rubik** (weights 300 to 900, normal and italic) via Google Fonts API:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
```

And applies font optical sizing in CSS:
```css
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

body {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
}
```

---

# The Year-Long Workshop Roadmap

| Subdirectory | Topic | Presenter(s) | Date / Slot | Key Concepts | Artifact Export |
|---|---|---|---|---|---|
| **[`workshops/workshop1/`](workshops/workshop1/)** | *The Art of the Data Lifecycle: Storytelling in AI* | Lowell Monis & Mariah Haymer | Sept 14, 2026 @ STEM 3202 | Data Lineage, Cleaning Audit [2], Disparate Impact [1], Feedback Loops [1] | `audit_summary.md` |
| **`workshops/workshop2/`** | *A Bayesian Perspective on Machine Learning* | Lowell Monis & Ishan Sinha | Sept 21, 2026 @ STEM 3202 | Bayesian ML, Probabilistic Modeling, Uncertainty Quant | `bayesian_ml_artifact.md` |
| **`workshops/workshop3/`** | *Reinforcement Learning: Building a Game-Playing Agent* | Carson Breissinger | Sept 28, 2026 @ STEM 3202 | Q-Learning, Deep Q-Networks (DQN), PyTorch, Gymnasium | `rl_agent_checkpoint.pth` |

*Detailed instructions on running specific workshop pipelines are located in their respective subdirectories (e.g., [`workshops/workshop1/README.md`](workshops/workshop1/README.md)).*

---

# Containerized Run using Docker

```bash
# Build Docker image
docker build -t msu-ai-workshops .

# Run container with volume mount to persist output
docker run --rm -v "${PWD}:/app" msu-ai-workshops
```

---

# Contributing, Issues, & Pull Requests (PR Guide)

We welcome contributions, bug fixes, and additional workshop modules!

## 🐛 Opening Issues
To report a bug or suggest a new feature:
1. Go to the repository **[Issues](https://github.com/lowell-monis/msu-ai-workshops/issues)** tab on GitHub.
2. Click **New Issue** and describe the issue with reproduction steps.

## 🔀 Submitting Pull Requests (PRs)
1. Fork this repository.
2. Create a topic branch: `git checkout -b feature/my-new-workshop`
3. Verify changes locally: `python workshops/workshop1/verify_notebook.py`
4. Commit and push your changes: `git push origin feature/my-new-workshop`
5. Click **New Pull Request** on GitHub!

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
