from flask import Flask, jsonify, render_template
import json
from visualization_model import generate_visualization_suggestions, generate_interactive_plot

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# API endpoint for fetching metadata
@app.route('/api/metadata')
def get_metadata():
    with open('data/osdr_metadata.json') as f:
        metadata = json.load(f)
    return jsonify(metadata)

# API for suggesting visualizations using GPT-4
@app.route('/api/suggest_visualization/<experiment_id>')
def suggest_visualization(experiment_id):
    with open('data/osdr_metadata.json') as f:
        metadata = json.load(f)

    experiment_data = next(exp for exp in metadata["experiments"] if exp["id"] == experiment_id)

    # Get visualization suggestions from GPT-4
    suggestions = generate_visualization_suggestions(experiment_data)

    return jsonify({"suggestions": suggestions})

# API for generating interactive Plotly visualizations
@app.route('/api/generate_plot/<experiment_id>')
def generate_plot(experiment_id):
    with open('data/osdr_metadata.json') as f:
        metadata = json.load(f)

    experiment_data = next(exp for exp in metadata["experiments"] if exp["id"] == experiment_id)

    # Generate Plotly visualization
    plot = generate_interactive_plot(experiment_data)

    # Plotly JSON output for rendering in frontend
    return plot.to_json()

if __name__ == "__main__":
    app.run(debug=True)
