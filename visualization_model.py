import openai
import plotly.graph_objects as go
import os

# Load OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_visualization_suggestions(experiment_data):
    """
    Uses GPT-4 to suggest the best types of visualizations for the given experiment data.
    """
    prompt = f"""
    Based on the following metadata of a biological space experiment, suggest the most appropriate
    data visualizations (charts, 3D models, timelines, etc.):

    Experiment Data: {experiment_data}

    Suggest visual types and justify your choices.
    """

    response = openai.Completion.create(
        model="gpt-4",
        prompt=prompt,
        max_tokens=150
    )

    return response.choices[0].text

def generate_interactive_plot(experiment_data):
    """
    Generates a simple Plotly chart based on the experiment timeline events.
    """
    timeline_events = experiment_data['timeline_events']

    # Create a timeline plot
    fig = go.Figure(
        data=[go.Scatter(x=[event['date'] for event in timeline_events],
                         y=[event['name'] for event in timeline_events],
                         mode='lines+markers',
                         marker=dict(size=10),
                         line=dict(color='royalblue', width=3))]
    )

    fig.update_layout(
        title="Experiment Timeline",
        xaxis_title="Date",
        yaxis_title="Event",
        xaxis=dict(type='category'),
        yaxis=dict(categoryorder='category ascending')
    )

    return fig
