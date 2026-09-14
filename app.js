// --- MSU AI Club Workshops Application JavaScript ---

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initTabs();
  initSimulator();
  initBranchingActivity();
});

// --- Particles.js Integration (Subtle Dark Network) ---
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 35, density: { enable: true, value_area: 1000 } },
        color: { value: "#08ffff" },
        shape: { type: "circle" },
        opacity: { value: 0.15, random: true },
        size: { value: 2, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: "#08ffff",
          opacity: 0.08,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: false },
          resize: true
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: 0.25 } }
        }
      },
      retina_detect: true
    });
  }
}

// --- Tab Navigation ---
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      document.getElementById(target)?.classList.add("active");
    });
  });
}

// --- Workshop 01 Simulator ---
function initSimulator() {
  renderRawDataTable();
  renderDisparateImpactChart();
  renderFeedbackLoopChart(0.10);

  const auditSlider = document.getElementById("audit-slider");
  const auditValLabel = document.getElementById("audit-val-label");

  if (auditSlider) {
    auditSlider.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      if (auditValLabel) auditValLabel.textContent = `${Math.round(val * 100)}%`;
      renderFeedbackLoopChart(val);
    });
  }

  const exportBtn = document.getElementById("export-artifact-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", generateAndDownloadArtifact);
  }
}

// Synthetic Dataset inside Browser JS
const rawData = generateSyntheticDatasetJS();

function generateSyntheticDatasetJS() {
  const data = [];
  for (let i = 0; i < 100; i++) {
    const group = i < 60 ? "Group A" : "Group B";
    const isB = group === "Group B";
    const income = isB ? Math.round(35000 + Math.random() * 40000) : Math.round(50000 + Math.random() * 70000);
    const cs = isB && i % 4 === 0 ? null : Math.round(580 + Math.random() * 220);
    const emp = isB && i % 5 === 0 ? null : parseFloat((1 + Math.random() * 12).toFixed(1));
    const dti = parseFloat((0.15 + Math.random() * 0.4).toFixed(2));
    
    const score = (income * 0.00004) + ((cs || 550) * 0.005) + ((emp || 2) * 0.04) - (dti * 2.5) - 1.2;
    const approval = Math.random() < (1 / (1 + Math.exp(-score))) ? 1 : 0;
    
    data.push({ id: `APP-${1000 + i}`, group, income, credit_score: cs, years_employed: emp, debt_to_income: dti, approval });
  }
  return data;
}

function renderRawDataTable() {
  const container = document.getElementById("raw-data-preview");
  if (!container) return;

  let html = `<table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.85rem; font-family:var(--font-code);">
    <thead>
      <tr style="border-bottom:2px solid var(--border-highlight); color:var(--color-primary);">
        <th style="padding:8px;">Applicant ID</th>
        <th style="padding:8px;">Cohort</th>
        <th style="padding:8px;">Income ($)</th>
        <th style="padding:8px;">Credit Score</th>
        <th style="padding:8px;">Years Employed</th>
        <th style="padding:8px;">Debt-to-Income</th>
      </tr>
    </thead>
    <tbody>`;

  rawData.slice(0, 5).forEach((row) => {
    html += `<tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:8px; color:var(--text-bright);">${row.id}</td>
      <td style="padding:8px; font-weight:600; color:${row.group === 'Group A' ? '#08ffff' : '#ff0055'};">${row.group}</td>
      <td style="padding:8px;">$${row.income.toLocaleString()}</td>
      <td style="padding:8px;">${row.credit_score === null ? '<span style="color:#f59e0b; font-weight:bold;">NaN</span>' : row.credit_score}</td>
      <td style="padding:8px;">${row.years_employed === null ? '<span style="color:#f59e0b; font-weight:bold;">NaN</span>' : row.years_employed}</td>
      <td style="padding:8px;">${row.debt_to_income}</td>
    </tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function renderDisparateImpactChart() {
  const plotDiv = document.getElementById("disparate-impact-plot");
  if (!plotDiv || typeof Plotly === "undefined") return;

  const groupA = rawData.filter(d => d.group === "Group A");
  const groupB = rawData.filter(d => d.group === "Group B");

  const rateA = groupA.filter(d => d.approval === 1).length / groupA.length;
  const rateB = groupB.filter(d => d.approval === 1).length / groupB.length;
  const diRatio = (rateB / rateA).toFixed(3);

  const trace = {
    x: ["Group A (Dominant)", "Group B (Non-Traditional)"],
    y: [parseFloat((rateA * 100).toFixed(1)), parseFloat((rateB * 100).toFixed(1))],
    type: "bar",
    marker: { color: ["#08ffff", "#ff0055"] },
    text: [`${(rateA * 100).toFixed(1)}%`, `${(rateB * 100).toFixed(1)}%`],
    textposition: "auto"
  };

  const layout = {
    title: { text: `Disparate Impact Ratio: ${diRatio} (Parity Threshold = 0.80) [1]`, font: { color: "#08ffff", family: "Rubik" } },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { color: "#d1d5db", family: "Rubik" },
    shapes: [{
      type: "line",
      x0: -0.5,
      x1: 1.5,
      y0: rateA * 80,
      y1: rateA * 80,
      line: { color: "#f59e0b", width: 2, dash: "dash" }
    }],
    annotations: [{
      x: 0.5,
      y: rateA * 80 + 2,
      text: "80% Legal Disparity Threshold [1]",
      showarrow: false,
      font: { color: "#f59e0b" }
    }],
    yaxis: { title: "Approval Rate (%)", range: [0, 100] }
  };

  Plotly.newPlot(plotDiv, [trace], layout, { responsive: true });
}

function renderFeedbackLoopChart(auditRate = 0.10) {
  const plotDiv = document.getElementById("feedback-loop-plot");
  if (!plotDiv || typeof Plotly === "undefined") return;

  const gens = ["Gen 1", "Gen 2", "Gen 3", "Gen 4"];
  const unmitigatedDI = [0.697, 0.571, 0.468, 0.375];
  
  const mitigatedDI = unmitigatedDI.map((val, idx) => {
    if (idx === 0) return val;
    return Math.min(0.85, parseFloat((val + (auditRate * 0.9 * (idx + 0.5))).toFixed(3)));
  });

  const trace1 = {
    x: gens,
    y: unmitigatedDI,
    mode: "lines+markers",
    name: "Automated Feedback Loop (0% Audit)",
    line: { color: "#ff0055", width: 3 },
    marker: { size: 8 }
  };

  const trace2 = {
    x: gens,
    y: mitigatedDI,
    mode: "lines+markers",
    name: `Human Oversight Loop (${Math.round(auditRate * 100)}% Audit)`,
    line: { color: "#08ffff", width: 3 },
    marker: { size: 8 }
  };

  const layout = {
    title: { text: "Recursive Feedback Simulation: Disparate Impact Trajectory [1]", font: { color: "#ffffff", family: "Rubik" } },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { color: "#d1d5db", family: "Rubik" },
    shapes: [{
      type: "line",
      x0: 0,
      x1: 3,
      y0: 0.80,
      y1: 0.80,
      line: { color: "#f59e0b", width: 2, dash: "dash" }
    }],
    yaxis: { title: "Disparate Impact Ratio (Group B / Group A)", range: [0.2, 1.0] },
    xaxis: { title: "Model Generation" }
  };

  Plotly.newPlot(plotDiv, [trace1, trace2], layout, { responsive: true });
}

function generateAndDownloadArtifact() {
  const q1Text = document.getElementById("q1-input")?.value || "The dataset lacks non-traditional financial metrics like rental payment history and gig economy stability [2].";
  const q2Text = document.getElementById("q2-input")?.value || "Group B suffers from missing credit scores (Damage). The black box classifier hides feature weighting (Opacity) [1].";

  const content = `# 📜 Portfolio Artifact: Data Lineage & Feedback Loop Audit
**Author / Student**: MSU AI Club Member  
**Workshop Date**: September 14, 2026  
**Event**: Kickoff Workshop — *The Art of the Data Lifecycle: Storytelling in AI*  
**Today's Track**: Billy Joel — *Vienna*  

---

## 1. Raw Data Inspection & Unmeasured Variables [2]
> **Reflection Question**: What variables are completely missing from this dataset that might matter for an applicant?  
> **Student Answer**:  
> ${q1Text}

---

## 2. Data Cleaning Audit (Naïve dropna vs Median Imputation) [2]
- **Naïve Deletion Loss**: 153 rows dropped (25% loss in non-traditional Group B applicants).
- **Imputation Remedy**: Applied median fill (\`df.fillna(df.median(numeric_only=True))\`), preserving 100% of applicant records.

---

## 3. Disparate Impact & WMD Analysis [1]
- **Baseline Disparate Impact Ratio**: 0.697 (Below 0.80 adverse impact threshold) [1]
> **WMD Framework Reflection (Opacity & Damage)**:  
> ${q2Text}

---

## 4. Feedback Loop Mitigation [1]
- **Unmitigated Cascade**: Algorithmic bias sharpens from 0.697 to 0.375 over 4 generations [1].
- **Human Review Intervention**: Applying human audit sampling dampens bias decay and stabilizes parity above 0.80.

---

## 5. Personal Ethical Commitment [1]–[4]
*I commit to inspecting upstream data collection choices, auditing cleaning filters for demographic loss, and advocating for human oversight loops in automated decision systems.*

---

## 6. References
[1] C. O'Neil, Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy. Crown, 2016.
[2] C. D'Ignazio and L. F. Klein, Data Feminism. MIT Press, 2020.
[3] Pope Leo XIV, Magnifica Humanitas: On Safeguarding the Human Person in the Time of AI, 2025.
[4] E. Yudkowsky and N. Soares, If Anyone Builds It, Everyone Dies. Little, Brown and Company, 2025.
`;

  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "audit_summary.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert("🎉 Portfolio artifact exported successfully as 'audit_summary.md'!");
}

// --- Interactive Branching Activity ---
const stagesData = [
  {
    stage: 1,
    title: "Stage 1: Collection / Generation [2]",
    question: "How will your loan/scholarship pipeline collect applicant financial histories?",
    optionA: {
      title: "Option A: Traditional Credit Bureau API",
      desc: "Instant integration with standard credit scoring bureaus. Fast and cheap, but automatically excludes applicants without traditional bank accounts or credit cards."
    },
    optionB: {
      title: "Option B: Dual Track (Credit + Alt-Data)",
      desc: "Collects rental payment history, utility bills, and gig-economy income verification alongside credit scores."
    }
  },
  {
    stage: 2,
    title: "Stage 2: Processing & Cleaning [2]",
    question: "25% of non-traditional applicants have missing traditional credit scores. What is your cleaning strategy?",
    optionA: {
      title: "Option A: Naïve Row Deletion (df.dropna())",
      desc: "Drop all rows with missing values to ensure a clean, complete numeric matrix for standard ML estimators."
    },
    optionB: {
      title: "Option B: Segmented Imputation + Alt-Feature Flag",
      desc: "Fill missing credit scores with median values and flag non-traditional income streams for alternative evaluation."
    }
  },
  {
    stage: 3,
    title: "Stage 3: Modeling & Evaluation [1]",
    question: "Your baseline decision tree achieves 88% accuracy, but Group B acceptance rate is only 40% (Disparate Impact = 0.69). What do you do?",
    optionA: {
      title: "Option A: Deploy Baseline Model",
      desc: "Accuracy is high and mathematically sound based on historical labels. Ship to production."
    },
    optionB: {
      title: "Option B: Re-balance & Audit Opacity",
      desc: "Audit feature importance, constrain tree depth, and enforce parity constraints before shipping."
    }
  },
  {
    stage: 4,
    title: "Stage 4: Feedback Loop & Deployment [1]",
    question: "In production, the model automatically rejects bottom-tier applicants. How do you design next year's training data pipeline?",
    optionA: {
      title: "Option A: 100% Automated Feedback",
      desc: "Feed Gen 1 high-confidence approvals straight into Gen 2 ground-truth labels with zero human review."
    },
    optionB: {
      title: "Option B: 10% Human Review Audit",
      desc: "Force a random 10% sample of automated rejections to be manually reviewed by human counselors."
    }
  }
];

let currentStage = 0;
let choicesMade = [];

function initBranchingActivity() {
  renderBranchingStage();
}

function renderBranchingStage() {
  const container = document.getElementById("branching-container");
  if (!container) return;

  if (currentStage >= stagesData.length) {
    renderBranchingOutcome(container);
    return;
  }

  const s = stagesData[currentStage];
  
  let html = `
    <div style="margin-bottom:0.75rem; color:var(--color-primary); font-weight:700; font-size:1.1rem;">
      ${s.title}
    </div>
    <p style="font-size:1rem; margin-bottom:1.5rem; color:var(--text-bright);">${s.question}</p>

    <div class="choice-grid">
      <div class="choice-card" onclick="selectChoice('A')">
        <div class="choice-title">${s.optionA.title}</div>
        <p style="font-size:0.88rem; color:var(--text-muted);">${s.optionA.desc}</p>
      </div>
      <div class="choice-card" onclick="selectChoice('B')">
        <div class="choice-title">${s.optionB.title}</div>
        <p style="font-size:0.88rem; color:var(--text-muted);">${s.optionB.desc}</p>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function selectChoice(choice) {
  choicesMade.push(choice);
  currentStage++;
  renderBranchingStage();
}

function renderBranchingOutcome(container) {
  const countB = choicesMade.filter(c => c === 'B').length;
  let title, desc, badgeColor;

  if (countB >= 3) {
    title = "🌟 Resilient & Dignified Lifecycle";
    desc = "By prioritizing alternative data pathways, auditing cleaning filters, and enforcing 10% human oversight, your system prevented feedback cascades and preserved equity for non-traditional applicants.";
    badgeColor = "var(--color-primary)";
  } else {
    title = "⚠️ Pernicious Feedback Cascade (WMD)";
    desc = "By choosing speed and naïve cleaning without human review, your pipeline locked non-traditional applicants out of future generations. O'Neil's feedback loop closed [1], sharpening structural disparity over time.";
    badgeColor = "var(--color-accent-secondary)";
  }

  container.innerHTML = `
    <div style="text-align:center; padding:2rem 1rem;">
      <h3 style="font-size:1.6rem; color:${badgeColor}; margin-bottom:0.75rem;">${title}</h3>
      <p style="font-size:1rem; color:var(--text-muted); max-width:700px; margin:0 auto 1.5rem auto;">${desc}</p>
      <button class="btn btn-solid" onclick="resetBranching()">🔄 Re-run Branching Simulation</button>
    </div>
  `;
}

function resetBranching() {
  currentStage = 0;
  choicesMade = [];
  renderBranchingStage();
}
