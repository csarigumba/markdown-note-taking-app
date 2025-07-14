# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Markdown Note-taking App** - a Node.js/Express.js RESTful API service for creating, storing, processing, and rendering markdown notes with file upload capabilities. The service is designed to be consumed by frontend applications or other services.

## Standard Workflow

1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with the user to verify the plan
4. Then, begin working on the todo items, marking them as complete as you go
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information

## Architecture

### Core Components

- **RESTful API Server**: Express.js-based server handling HTTP requests
- **File Upload Handler**: Multer middleware for multipart/form-data processing
- **Markdown Processor**: Library for converting markdown to HTML
- **Grammar Checker**: Service/library integration for content validation
- **Storage Layer**: File system or database for persistent note storage
- **Collision Prevention**: Unique identifier generation system

### Key API Endpoints

- `POST /notes` - Save new markdown notes (JSON or file upload)
- `GET /notes/{id}/render` - Convert markdown to HTML
- `POST /notes/{id}/grammar-check` - Grammar validation
- `GET /notes/{id}` - Retrieve saved notes

### Data Flow

1. Notes received via API (text or file upload)
2. Content validation and sanitization
3. Unique ID generation to prevent collisions
4. Persistent storage (file system or database)
5. On-demand processing (HTML rendering, grammar checking)

## Development Commands

Since this is a new project, the following commands will need to be set up:

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Type checking (if using TypeScript)
npm run typecheck
```

## Environment Configuration

Required environment variables:

- `PORT` - Server port number
- `STORAGE_PATH` - Path for file storage
- `MAX_FILE_SIZE` - Maximum allowed file size

## Technical Constraints

- File uploads limited to markdown files (.md, .txt)
- API responses must be under 500ms
- File name collision prevention required
- Input sanitization for security
- Support for concurrent file uploads

## Key Libraries/Dependencies

Based on requirements, the project will use:

- **Express.js** - Web framework
- **Multer** - File upload handling
- **Markdown parser** - For HTML conversion
- **Grammar checking library** - For content validation
- **File system utilities** - For storage management
