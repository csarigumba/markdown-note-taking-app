# Curl Commands Documentation

This document contains example curl commands for testing the Markdown Note-taking API endpoints.

## Prerequisites

Set the API domain as an environment variable:

```bash
# For local development (default)
export API_URL="http://localhost:3000"

# For staging
export API_URL="https://staging-api.example.com"

# For production
export API_URL="https://api.example.com"

# For custom port
export API_URL="http://localhost:8080"
```

If not set, the commands will default to `http://localhost:3000`.

## API Endpoints

### 1. Create a New Note (JSON)

```bash
# Create a note with JSON content
curl -X POST ${API_URL:-http://localhost:3000}/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Note",
    "content": "# Hello World\n\nThis is my first markdown note.\n\n## Features\n- Easy to use\n- Markdown support\n- Grammar checking"
  }'
```

### 2. Create a New Note (File Upload)

```bash
# Upload a markdown file
curl -X POST ${API_URL:-http://localhost:3000}/notes \
  -F "file=@./sample.md" \
  -F "title=Uploaded Note"

# Upload with additional metadata
curl -X POST ${API_URL:-http://localhost:3000}/notes \
  -F "file=@./documentation.md" \
  -F "title=API Documentation" \
  -F "description=Technical documentation for the API"
```

### 3. Get a Note by ID

```bash
# Retrieve a specific note (replace {id} with actual note ID)
curl -X GET ${API_URL:-http://localhost:3000}/notes/{id}

# Example with actual ID
curl -X GET ${API_URL:-http://localhost:3000}/notes/abc123def456
```

### 4. Get All Notes

```bash
# List all notes
curl -X GET ${API_URL:-http://localhost:3000}/notes

# With pagination
curl -X GET "${API_URL:-http://localhost:3000}/notes?page=1&limit=10"
```

### 5. Update a Note

```bash
# Update an existing note
curl -X PUT ${API_URL:-http://localhost:3000}/notes/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "# Updated Content\n\nThis note has been updated."
  }'
```

### 6. Delete a Note

```bash
# Delete a note
curl -X DELETE ${API_URL:-http://localhost:3000}/notes/{id}
```

### 7. Render Note as HTML

```bash
# Get HTML rendered version of a note
curl -X GET ${API_URL:-http://localhost:3000}/notes/{id}/render

# Save rendered HTML to file
curl -X GET ${API_URL:-http://localhost:3000}/notes/{id}/render -o rendered-note.html
```

### 8. Grammar Check

```bash
# Check grammar for a note
curl -X POST ${API_URL:-http://localhost:3000}/notes/{id}/grammar-check

# Grammar check with specific options
curl -X POST ${API_URL:-http://localhost:3000}/notes/{id}/grammar-check \
  -H "Content-Type: application/json" \
  -d '{
    "language": "en-US",
    "rules": ["spelling", "grammar", "punctuation"]
  }'
```

## Sample Files

### Create a sample.md file for testing

```bash
cat > sample.md << EOF
# Sample Markdown Note

This is a sample markdown file for testing the upload functionality.

## Section 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### Subsection 1.1

- Item 1
- Item 2
- Item 3

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Links

[GitHub](https://github.com)
EOF
```

## Testing Workflow

### 1. Create a note and save the ID

```bash
# Create note and extract ID from response
RESPONSE=$(curl -s -X POST ${API_URL:-http://localhost:3000}/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Note",
    "content": "# Test\n\nThis is a test."
  }')

# Debug: Show the response
echo "Response: $RESPONSE"

# Extract ID - multiple methods for different JSON formats
# Method 1: If response has "id":"value" format
NOTE_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*' | grep -o '[^"]*$')

# Method 2: If response has "id": "value" format (with space)
if [ -z "$NOTE_ID" ]; then
  NOTE_ID=$(echo $RESPONSE | grep -o '"id"[[:space:]]*:[[:space:]]*"[^"]*' | grep -o '[^"]*$')
fi

# Method 3: If response has numeric id without quotes
if [ -z "$NOTE_ID" ]; then
  NOTE_ID=$(echo $RESPONSE | grep -o '"id"[[:space:]]*:[[:space:]]*[0-9]*' | grep -o '[0-9]*$')
fi

# Method 4: Using jq if available (more reliable)
if command -v jq &> /dev/null && [ -z "$NOTE_ID" ]; then
  NOTE_ID=$(echo $RESPONSE | jq -r '.id // empty')
fi

echo "Created note with ID: $NOTE_ID"
```

### 2. Test all operations with the created note

```bash
# Get the note
curl -X GET ${API_URL:-http://localhost:3000}/notes/$NOTE_ID

# Render as HTML
curl -X GET ${API_URL:-http://localhost:3000}/notes/$NOTE_ID/render

# Check grammar
curl -X POST ${API_URL:-http://localhost:3000}/notes/$NOTE_ID/grammar-check

# Update the note
curl -X PUT ${API_URL:-http://localhost:3000}/notes/$NOTE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Test Note",
    "content": "# Updated Test\n\nThis note has been updated."
  }'

# Delete the note
curl -X DELETE ${API_URL:-http://localhost:3000}/notes/$NOTE_ID
```

## Error Testing

### Test validation errors

```bash
# Missing required fields
curl -X POST ${API_URL:-http://localhost:3000}/notes \
  -H "Content-Type: application/json" \
  -d '{}'

# Invalid content type
curl -X POST ${API_URL:-http://localhost:3000}/notes \
  -H "Content-Type: text/plain" \
  -d 'This should fail'

# Non-existent note
curl -X GET ${API_URL:-http://localhost:3000}/notes/non-existent-id

# Large file upload (create a large file first)
dd if=/dev/zero of=large.md bs=1M count=10
curl -X POST ${API_URL:-http://localhost:3000}/notes \
  -F "file=@./large.md" \
  -F "title=Large File Test"
```

## Useful Options

### Verbose output
```bash
curl -v -X GET ${API_URL:-http://localhost:3000}/notes
```

### Include headers in output
```bash
curl -i -X GET ${API_URL:-http://localhost:3000}/notes
```

### Pretty print JSON response
```bash
curl -X GET ${API_URL:-http://localhost:3000}/notes | json_pp
```

### Save response to file
```bash
curl -X GET ${API_URL:-http://localhost:3000}/notes -o notes.json
```

### Time the request
```bash
curl -w "\nTotal time: %{time_total}s\n" -X GET ${API_URL:-http://localhost:3000}/notes
```

## Notes

- Replace `{id}` with actual note IDs in the commands
- All examples use `localhost:3000` - adjust if your server runs on a different port
- For file uploads, ensure the file path is correct relative to where you run the curl command
- Some endpoints may require authentication in production - add appropriate headers if needed