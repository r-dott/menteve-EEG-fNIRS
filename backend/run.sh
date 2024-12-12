#!/bin/bash

# Run server.py in the background
echo "Starting server.py..."
python sender.py &
SERVER_PID=$!

# Run back.py in the background
echo "Starting back.py..."
python server_listener.py &
BACK_PID=$!

# Wait for both processes to finish
wait $SERVER_PID
wait $BACK_PID
