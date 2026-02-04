import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def explain_pathway(context, steps):
    prompt = f"""
You explain clinical workflows.
You do NOT diagnose conditions.
You do NOT recommend treatments.
You do NOT introduce new tests or scores.

Patient:
Age: {context['age']}
Symptom: {context['symptom']}
Severity: {context['severity']}

Workflow Steps (use ONLY these):
{', '.join(steps)}

Instructions:
- Explain WHY each step is done
- Do NOT add extra medical tools or scores
- Use simple, patient-friendly language
- End with a safety disclaimer
"""


    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    return response.choices[0].message.content
