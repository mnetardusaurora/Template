#!/bin/bash

# Remove emojis and AI-generated indicators from markdown files

# Function to clean a file
clean_file() {
    local file="$1"

    # Create temporary file
    temp_file=$(mktemp)

    # Remove emoji patterns and AI indicators
    sed -E \
        -e 's/[🚀🎯📋📝✅❌⚠️🔄🎉🆘📚🧪📊🔒🛡️⏸️🏷️✨🔥💡📦🎬👋😊💪🙌🤝👍⭐🌟💻🖥️📱🎨🔧🔨⚙️🔍📈📉💰💳🏆🎓📄📃📝📖🗂️🗃️📁📂🗄️📇📋📊📈📉🗒️🗓️📆📅🗃️⏰⏱️⏲️🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🔔🔕]//g' \
        -e 's/🤖 Generated with \[Claude Code\]\(https:\/\/claude\.com\/claude-code\)//g' \
        -e 's/Co-Authored-By: Claude <noreply@anthropic\.com>//g' \
        -e '/^Co-Authored-By: Claude/d' \
        -e '/Generated with Claude Code/d' \
        -e '/Generated with \[Claude Code\]/d' \
        -e 's/🤖//g' \
        "$file" > "$temp_file"

    # Replace original file
    mv "$temp_file" "$file"
}

# Find and clean all markdown files
find . -name "*.md" -type f ! -path "./node_modules/*" ! -path "./.git/*" | while read -r file; do
    echo "Cleaning: $file"
    clean_file "$file"
done

echo "Done! All markdown files cleaned."
