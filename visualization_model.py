import plotly.express as px
import plotly.graph_objects as go

def generate_visualization_suggestions(experiment_data):
    suggestions = []

    if 'assays' in experiment_data:
        suggestions.append("Consider a bar chart to visualize assay results.")
    if 'factors' in experiment_data:
        suggestions.append("A scatter plot might help show the correlation between factors.")

    return suggestions

def generate_interactive_plot(experiment_data):
    # Check for the required data in experiment_data
    if 'some_data' not in experiment_data:  # Replace 'some_data' with the actual key
        print("Experiment data received:", experiment_data)  # Log the entire experiment_data
        raise ValueError("No data to generate plot")

    # Create the plot if the required data is present
    fig = px.line(experiment_data['some_data'], x='time', y='value', title='Experiment Data Over Time')
    return fig
