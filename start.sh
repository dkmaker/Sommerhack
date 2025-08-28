#!/bin/bash

echo "🚀 Starting TODO MVP App..."
echo "📍 Location: $(pwd)"
echo ""

if [ "$EUID" -ne 0 ]; then
    echo "⚠️  Running without sudo - if port 80 fails, try: sudo ./start.sh"
    echo ""
fi

python3 server.py