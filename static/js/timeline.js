document.addEventListener("DOMContentLoaded", function() {
  fetch("/api/experiments")
      .then(response => response.json())
      .then(data => {
          data.experiments.forEach(exp => {
              renderTimeline(exp);
          });
      });

  function renderTimeline(exp) {
      const timelineContainer = document.getElementById("timeline-container");
      const timelineDiv = document.createElement("div");
      timelineDiv.className = "timeline";
      timelineDiv.innerHTML = `<h3>${exp.name} Timeline</h3>`;

      exp.timeline_events.forEach(event => {
          const eventItem = document.createElement("div");
          eventItem.className = "timeline-event";
          eventItem.innerHTML = `<strong>${event.date}</strong>: ${event.name}`;
          timelineDiv.appendChild(eventItem);
      });

      timelineContainer.appendChild(timelineDiv);
  }
});
