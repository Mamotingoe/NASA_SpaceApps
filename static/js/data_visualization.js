document.addEventListener("DOMContentLoaded", function() {
  fetch("/api/experiments")
      .then(response => response.json())
      .then(data => {
          renderDataVisualizations(data.experiments);
      });

  function renderDataVisualizations(experiments) {
      const container = document.getElementById("experiment-container");
      experiments.forEach(exp => {
          const expDiv = document.createElement("div");
          expDiv.className = "experiment";
          expDiv.innerHTML = `
              <h2>${exp.name}</h2>
              <p>Treatment: ${exp.treatment}</p>
              <p>Subjects per group: ${exp.subjects_per_group}</p>
              <h3>Pre-launch Events:</h3>
              <ul>${exp.pre_launch_events.map(event => `<li>${event}</li>`).join('')}</ul>
              <h3>Post-return Events:</h3>
              <ul>${exp.post_return_events.map(event => `<li>${event}</li>`).join('')}</ul>
              <h3>Timeline Events:</h3>
              <ul>${exp.timeline_events.map(event => `<li>${event.name} on ${event.date}</li>`).join('')}</ul>`;
          container.appendChild(expDiv);
      });
  }
});
