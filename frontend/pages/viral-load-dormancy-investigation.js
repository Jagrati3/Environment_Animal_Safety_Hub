    (function() {
      const resultDiv = document.getElementById('simulation-result');
      const simulateBtn = document.getElementById('simulateBtn');
      const resetBtn = document.getElementById('resetBtn');

      // helper to generate realistic viral load metrics
      function generateViralLoad() {
        // randomise within plausible ranges
        const baseLoad = (Math.random() * 3.2e5 + 4.8e5).toFixed(0); // 480k - 800k copies/mL
        const suppressionIndex = (Math.random() * 35 + 60).toFixed(1); // 60% - 95% 
        const thresholdMet = Math.random() > 0.15 ? 'exceeded' : 'below'; // 85% chance threshold exceeded
        const riskLevel = thresholdMet === 'exceeded' ? 'high' : 'moderate';

        let colorClass = '#a12b2b';
        if (riskLevel === 'high') colorClass = '#b13e3e';
        else colorClass = '#d98c2e';

        return `
          <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
            <div>
              <span class="metric-badge"><i class="fas fa-dna"></i> peak load</span>
              <span class="metric-value">${Number(baseLoad).toLocaleString()}</span> <span style="font-size:1rem; color:#2f4a66;">copies/mL</span>
            </div>
            <div>
              <span class="metric-badge"><i class="fas fa-thermometer-half"></i> immune suppression</span>
              <span class="metric-value">${suppressionIndex}%</span>
            </div>
            <div style="background:${colorClass}20; padding:0.6rem 1.3rem; border-radius:3rem;">
              <span style="font-weight:700; color:${colorClass};"><i class="fas fa-exclamation-circle"></i> threshold ${thresholdMet}</span>
            </div>
          </div>
          <div style="margin-top: 1.5rem; background:rgba(0,60,110,0.05); border-radius:1.5rem; padding:1rem;">
            <i class="fas fa-chart-simple" style="margin-right:10px; color:#20618b;"></i> 
            <strong>interpretation:</strong> In this simulated dormant state, viral load ${thresholdMet === 'exceeded' ? 'surges above winter proliferation threshold' : 'remains near baseline, but suppression index is significant'}. 
            ${thresholdMet === 'exceeded' ? '⛄ Dormancy amplifies replication risk.' : '❄️ Partial immune function still contains virus.'}
          </div>
        `;
      }

      // show simulation with fresh data
      function runSimulation() {
        resultDiv.innerHTML = generateViralLoad();
        resultDiv.classList.add('show');
      }

      // reset: hide and clear content (optional but nice)
      function resetSimulation() {
        resultDiv.classList.remove('show');
        resultDiv.innerHTML = ''; 
      }

      simulateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        runSimulation();
      });

      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetSimulation();
      });

      // optionally run a first simulation so the page is not empty (but we respect "display: none" initially, so left empty)
      // we keep it hidden until user clicks – per original behaviour.
      // however if you'd like to show a preview, uncomment next line:
      // setTimeout(runSimulation, 200);  (but would be visible without click)
      // we follow original: hidden until click.
    })();