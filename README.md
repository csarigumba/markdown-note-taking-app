# Markdown Note-taking App API

A RESTful API service for creating, storing, processing, and rendering markdown notes with file upload capabilities.

## Features

- **Create notes** via JSON payload or file upload
- **Store notes** with unique IDs to prevent collisions
- **Render markdown** to HTML
- **Check grammar** of note content
- **File upload support** for .md and .txt files

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd markdown-note-taking-app

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start the server
npm start
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `STORAGE_PATH` - Path for file storage (default: ./storage/notes)
- `MAX_FILE_SIZE` - Maximum file size in bytes (default: 5242880 - 5MB)
- `NODE_ENV` - Environment (development/production)

## API Endpoints

### Health Check
```
GET /health
```

### Create Note
```
POST /notes
```

**JSON Payload:**
```json
{
  "title": "My Note",
  "content": "# Markdown content here"
}
```

**File Upload:**
```bash
curl -X POST -F "file=@note.md" -F "title=My Note" http://localhost:3000/notes
```

### Get Note
```
GET /notes/:id
```

### Get All Notes
```
GET /notes
```

### Render Note as HTML
```
GET /notes/:id/render
```

### Check Grammar
```
POST /notes/:id/grammar-check
```

## Example Usage

### Create a note
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Note",
    "content": "# Hello World\n\nThis is my note."
  }'
```

### Upload a file
```bash
curl -X POST http://localhost:3000/notes \
  -F "file=@mynote.md" \
  -F "title=Uploaded Note"
```

### Get rendered HTML
```bash
curl http://localhost:3000/notes/{id}/render
```

### Check grammar
```bash
curl -X POST http://localhost:3000/notes/{id}/grammar-check
```

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

## Architecture

- **Express.js** - Web framework
- **Multer** - File upload handling
- **Marked** - Markdown to HTML conversion
- **Write-good** - Grammar checking
- **UUID** - Unique ID generation
- **File-based storage** - Simple persistence layer

## Performance

The API is designed to respond within 500ms for all endpoints under normal load.