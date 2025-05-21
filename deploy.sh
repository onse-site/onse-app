#!/bin/bash

cd /home/jalil-lafkir/me.files/Projects/buisness/onse-app/ || exit

echo "🔧 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully."

    git add .

    echo "📝 Enter commit message:"
    read commit_message

    git commit -m "$commit_message"

    echo "🚀 Pushing to origin main..."
    git push origin main
    echo "✅ Push completed."
else
    echo "❌ Build failed. Aborting Git operations."
    exit 1
fi
