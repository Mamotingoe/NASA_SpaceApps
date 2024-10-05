from flask import Flask, jsonify, render_template
import requests
from visualization_model import generate_visualization_suggestions, generate_interactive_plot

app = Flask(__name__)

# Helper function to fetch metadata from NASA OSDR API
def fetch_osdr_metadata(study_id):
    url = f"https://osdr.nasa.gov/osdr/data/osd/meta/{study_id}"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises error for 4xx/5xx responses
        return response.json()  # Parse the JSON response
    except requests.exceptions.RequestException as e:
        print(f"Error fetching metadata: {e}")
        return None

@app.route('/')
def index():
    return render_template('index.html')

# API for fetching metadata dynamically
@app.route('/api/metadata/<int:study_id>')
def get_metadata(study_id):
    metadata = fetch_osdr_metadata(study_id)

    if metadata:
        return jsonify(metadata)
    else:
        return jsonify({"error": "Could not fetch metadata"}), 500

# API for suggesting visualizations using GPT-4
@app.route('/api/suggest_visualization/<int:study_id>')
def suggest_visualization(study_id):
    metadata = fetch_osdr_metadata(study_id)

    if metadata:
        experiment_data = metadata.get("study", {}).get(f"OSD-{study_id}")

        if experiment_data:
            # Get visualization suggestions from GPT-4
            suggestions = generate_visualization_suggestions(experiment_data)
            return jsonify({"suggestions": suggestions})
        else:
            return jsonify({"error": "Experiment data not found"}), 404
    else:
        return jsonify({"error": "Could not fetch metadata"}), 500

# API for generating interactive Plotly visualizations
@app.route('/api/generate_plot/<int:study_id>')
def generate_plot(study_id):
    metadata = fetch_osdr_metadata(study_id)

    if metadata:
        experiment_data = metadata.get("study", {}).get(f"OSD-{study_id}")

        if experiment_data:
            # Generate Plotly visualization
            plot = generate_interactive_plot(experiment_data)
            # Plotly JSON output for rendering in frontend
            return plot.to_json()
        else:
            return jsonify({"error": "Experiment data not found"}), 404
    else:
        return jsonify({"error": "Could not fetch metadata"}), 500

# New route for fetching experiments (fixing the /api/experiments 404 issue)
@app.route('/api/experiments')
def get_experiments():
    try:
        # Assuming you want to list all available experiments, modify as per actual API
        response = requests.get('https://osdr.nasa.gov/osdr/data/osd/meta/')
        experiments = response.json().get('studies', [])
        return jsonify(experiments)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
