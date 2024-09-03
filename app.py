from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

HUBSPOT_API_KEY = os.getenv("HUBSPOT_API_KEY")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')

    if not name or not phone:
        return jsonify({"error": "Name and phone number are required"}), 400

    # Send data to CRM (HubSpot example)
    crm_response = store_in_crm(name, phone)

    if crm_response:
        return jsonify({"message": "Thank you! Our team will contact you soon."})
    else:
        return jsonify({"error": "Failed to store information"}), 500

def store_in_crm(name, phone):
    contact={"name":name,"phone":phone}
    with open('contacts.json', 'a') as file:
        file.write(str(contact))
        file.write('\n')
    
    
    
    
    """url = "https://api.hubapi.com/crm/v3/objects/contacts"
    headers = {
        "Authorization": f"Bearer {HUBSPOT_API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "properties": {
            "firstname": name,
            "phone": phone
        }
    }
    response = requests.post(url, headers=headers, json=data)
    return response.status_code == 201"""

    return True

if __name__ == '__main__':
    app.run(debug=True)
