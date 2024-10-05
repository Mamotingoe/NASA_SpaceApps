// Get the elements
const fetchMetadataBtn = document.getElementById('fetch-metadata-btn');
const experimentIdInput = document.getElementById('experiment-id');
const metadataContent = document.getElementById('metadata-content');
const suggestionsContent = document.getElementById('suggestions-content');
const plotContent = document.getElementById('plot-content');

// Event listener for fetching metadata
fetchMetadataBtn.addEventListener('click', function() {
    const experimentId = experimentIdInput.value.trim();

    if (experimentId) {
        fetchMetadata(experimentId);
        fetchVisualizationSuggestions(experimentId);
        fetchPlot(experimentId);
    } else {
        alert("Please enter a valid experiment ID.");
    }
});

// Fetch experiment metadata
function fetchMetadata(experimentId) {
    const numericStudyId = experimentId.replace('OSD-', '');  // Removes 'OSD-' prefix

    fetch(`/api/metadata/${numericStudyId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                metadataContent.innerHTML = `<p>Error: ${data.error}</p>`;
            } else {
                metadataContent.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            }
        })
        .catch(err => {
            metadataContent.innerHTML = `<p>Error fetching metadata: ${err}</p>`;
        });
}

// Fetch visualization suggestions
function fetchVisualizationSuggestions(experimentId) {
    const numericStudyId = experimentId.replace('OSD-', '');  // Removes 'OSD-' prefix

    fetch(`/api/suggest_visualization/${numericStudyId}`)
        .then(response => response.json())
        .then(data => {
            if (data.suggestions) {
                suggestionsContent.innerHTML = `<ul>${data.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}</ul>`;
            } else {
                suggestionsContent.innerHTML = `<p>Error: ${data.error}</p>`;
            }
        })
        .catch(err => {
            suggestionsContent.innerHTML = `<p>Error fetching suggestions: ${err}</p>`;
        });
}

// Fetch the generated plot
function fetchPlot(experimentId) {
    const numericStudyId = experimentId.replace('OSD-', '');  // Removes 'OSD-' prefix

    fetch(`/api/generate_plot/${numericStudyId}`)
        .then(response => response.json())
        .then(plotData => {
            // Assuming Plotly is used for plotting, render the plot
            if (plotData) {
                Plotly.newPlot('plot-content', plotData.data, plotData.layout);
            } else {
                plotContent.innerHTML = `<p>Error generating plot.</p>`;
            }
        })
        .catch(err => {
            plotContent.innerHTML = `<p>Error fetching plot: ${err}</p>`;
        });
}
