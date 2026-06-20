# 🛡️ PhishShield AI

**Real-time browser protection against phishing websites**

> Stop phishing before it reaches you.

---

![Python](https://img.shields.io/badge/Python-3.10-blue)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-Scikit--Learn-orange)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Flask-red)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 💡 Overview

**Ever clicked a link and wondered if it's safe?**

PhishShield AI is a real-time browser security system that detects and blocks phishing websites before they load. A lightweight Chrome extension monitors browsing activity and communicates with a machine learning backend that analyzes URLs in real time, helping users stay protected from malicious websites.

---

## 🎬 Demo

PhishShield AI scans every visited URL and warns users before a phishing website is opened.

> 📌 Demo GIF coming soon.

---

## 🚀 Features

- 🛡️ Real-time phishing website detection
- ⚡ Blocks malicious websites before page rendering
- 🧠 Machine learning-based URL classification
- 🔍 Intelligent lexical and structural URL analysis
- 🌐 Lightweight Chrome extension with minimal overhead
- 📊 Risk score prediction for every visited URL

---

## 🧠 How It Works

1. User visits a website.
2. Chrome extension captures the URL.
3. URL is securely sent to the backend API.
4. Backend extracts lexical and structural features.
5. Machine learning model predicts whether the URL is **Safe** or **Phishing**.
6. Prediction is returned to the extension.
7. The extension either allows access or displays a phishing warning.

---

## 🏗️ System Design

### 🌐 Chrome Extension

- Captures browser navigation events
- Sends URLs to the backend API
- Displays phishing alerts and warning pages

### ⚙️ Backend API

- Built with Python (FastAPI / Flask)
- Receives URL requests from the extension
- Extracts security-related URL features
- Executes the machine learning prediction pipeline
- Returns the prediction to the extension

### 🧠 Machine Learning Engine

- Trained on phishing and legitimate URLs
- Performs feature engineering using:
  - URL length
  - URL tokens
  - Special characters
  - Subdomains
  - Structural URL patterns
- Generates a phishing probability score

---

## 🛠️ Technical Stack

**Frontend / Browser Extension**
- JavaScript (ES6+)
- HTML5
- CSS3
- Chrome Extensions API

**Backend**
- Python
- FastAPI / Flask

**Machine Learning**
- Scikit-learn
- Pandas
- NumPy
- Random Forest / XGBoost

**Core Methodology**
- Lexical URL Analysis
- Structural Feature Extraction
- Machine Learning Classification

---

## 🔄 System Flow

Browser Navigation → Chrome Extension → Backend API → Feature Extraction → Machine Learning Model → Safe / Phishing Prediction → Browser Response

---

## ⚙️ Setup

### 🔧 Backend

```bash
cd backend

python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt

python app.py
```

### 🌐 Extension

- Open Chrome → `chrome://extensions/`
- Enable **Developer Mode**
- Click **Load Unpacked**
- Select the `extension/` folder
- Pin the extension to the toolbar

---

## ✨ Key Highlights

- 🛡️ Real-time browser protection
- ⚡ Lightweight Chrome extension
- 🧠 AI-powered phishing detection
- 🔍 Intelligent URL feature analysis
- 🚫 Blocks malicious websites before they load
- 🏗️ Decoupled browser extension and ML backend architecture

---

## 🎯 Result

PhishShield AI provides an intelligent first line of defense against phishing attacks by identifying malicious URLs before users interact with unsafe websites, delivering a faster and safer browsing experience.
