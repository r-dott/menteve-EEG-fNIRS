Menteve Dashboard

Overview

This project is a real-time EEG monitoring and visualization system that integrates data streaming from an EEG headband with a responsive web-based frontend. It uses Vite and React for the frontend, and Python for the backend to handle signal processing and data streaming.

Prerequisites

Before setting up the project, ensure you have the following installed:

Node.js: Required to run the frontend.
Python 3.x: Required to run the backend scripts.
npm: Installed along with Node.js. Verify installation by running npm -v.

Setup Instructions

1. Installing Dependencies

Navigate to the root of the project and install the required dependencies by running:

`npm install`
or
`npm i`

2. Connecting the EEG Headband

Ensure that the EEG headband is properly connected to the device’s Wi-Fi.

3. Running the Backend

Navigate to the "backend" folder and follow these steps:

Step 1: Start the Server Listener

The server listener opens port 8000 to listen to the incoming stream of data. Start it by running:

`python server_listener.py`

Step 2: Start the Signal Sender

The signal sender script streams signals to the server at localhost:8000/data. Start it by running:

`python sender.py`

4. Starting the Frontend

Navigate back to the root directory of the project and start the frontend development server by running:

`npm run dev`

This will launch the web-based frontend using Vite, providing real-time visualization of the EEG data.
