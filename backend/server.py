from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import re
from urllib.parse import urlparse
import numpy as np
import pandas as pd

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/classify": {"origins": "*"}})

# Load the model with error handling
model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
model = None

try:
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        print("✅ Model loaded successfully!")
    else:
        raise FileNotFoundError("❌ model.pkl not found! Ensure the trained model is saved correctly.")
except Exception as e:
    print(f"❌ Error loading model: {e}")

# Define expected feature columns
feature_columns = [
    'NumDots', 'PathLevel', 'NumDash', 'AtSymbol', 'NumUnderscore',
    'NumQueryComponents', 'NumHash', 'NoHttps', 'IpAddress', 'DomainInPaths',
    'PathLength', 'DoubleSlashInPath', 'EmbeddedBrandName', 'PctExtResourceUrls',
    'InsecureForms', 'ExtFormAction', 'PctNullSelfRedirectHyperlinks',
    'FakeLinkInStatusBar', 'PopUpWindow', 'IframeOrFrame', 'ImagesOnlyInForm',
    'UrlLengthRT', 'AbnormalExtFormActionR', 'PctExtNullSelfRedirectHyperlinksRT'
]

# Placeholder function for detecting suspicious words
def suspicious_words(url):
    suspicious_keywords = ["secure", "account", "login", "bank", "verify"]
    return any(word in url.lower() for word in suspicious_keywords)

# Feature extraction functions
def having_ip_address(url):
    pattern = (r'(([01]?\d\d?|2[0-4]\d|25[0-5])\.'  
               r'([01]?\d\d?|2[0-4]\d|25[0-5])\.'  
               r'([01]?\d\d?|2[0-4]\d|25[0-5])\.'  
               r'([01]?\d\d?|2[0-4]\d|25[0-5])\/?)')
    return 1 if re.search(pattern, url) else 0

def abnormal_url(url):
    hostname = urlparse(url).hostname or ""
    return 1 if re.search(hostname, url) else 0

def count_character(url, char):
    return url.count(char)

def count_directories(url):
    return urlparse(url).path.count('/')

def count_double_slash(url):
    return urlparse(url).path.count('//')

def extract_features(url):
    features = {
        'NumDots': count_character(url, '.'),
        'PathLevel': count_directories(url),
        'NumDash': count_character(url, '-'),
        'AtSymbol': count_character(url, '@'),
        'NumUnderscore': count_character(url, '_'),
        'NumQueryComponents': count_character(url, '?'),
        'NumHash': count_character(url, '#'),
        'NoHttps': 1 if 'https' not in url else 0,
        'IpAddress': having_ip_address(url),
        'DomainInPaths': abnormal_url(url),
        'PathLength': len(urlparse(url).path),
        'DoubleSlashInPath': count_double_slash(url),
        'EmbeddedBrandName': suspicious_words(url),
        'PctExtResourceUrls': 0,  # Placeholder
        'InsecureForms': 0,  # Placeholder
        'ExtFormAction': 0,  # Placeholder
        'PctNullSelfRedirectHyperlinks': 0,  # Placeholder
        'FakeLinkInStatusBar': 0,  # Placeholder
        'PopUpWindow': 0,  # Placeholder
        'IframeOrFrame': 0,  # Placeholder
        'ImagesOnlyInForm': 0,  # Placeholder
        'UrlLengthRT': len(url),
        'AbnormalExtFormActionR': 0,  # Placeholder
        'PctExtNullSelfRedirectHyperlinksRT': 0  # Placeholder
    }
    return pd.DataFrame([features], columns=feature_columns)

# Prediction function
def get_prediction_from_url(url):
    if model is None:
        return "Error: Model not loaded."

    # Extract features
    df = extract_features(url)

    # Validate feature size
    try:
        expected_features = model.n_features_in_
        if df.shape[1] != expected_features:
            return f"Error: Model expects {expected_features} features, but received {df.shape[1]}."
    except AttributeError:
        return "Error: Unable to determine expected feature size from model."

    try:
        prediction = model.predict(df)[0]
        return "SAFE" if prediction == 0 else "PHISHING"
    except Exception as e:
        return f"Error: Failed to make a prediction - {e}"

# API endpoint for classification
@app.route('/classify', methods=['POST'])
def classify():
    try:
        data = request.get_json()
        
        # Validate input
        if 'url' not in data:
            return jsonify({'error': 'Missing "url" parameter'}), 400

        url = data['url'].replace("https://", "").replace("http://", "")
        prediction = get_prediction_from_url(url)

        return jsonify({'classification': prediction})
    except Exception as e:
        return jsonify({'error': f"Unexpected error: {str(e)}"}), 500
    

# Run Flask server
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

