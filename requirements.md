# **Product Requirements Document (PRD)**

## **Markdown Note-taking App**

---

### **1. Project Overview**

**Title:** Markdown Note-taking App
**Difficulty Level:** Moderate
**Type:** Backend Service with RESTful API
**Owner:** Developer
**Target Users:** Content creators, developers, and writers who need to create, edit, and render markdown notes
**Primary Goal:** Provide a RESTful API for creating, storing, processing, and rendering markdown notes with file upload capabilities

---

### **2. Purpose and Scope**

The service aims to:

- Provide endpoints for creating and managing markdown notes
- Support file uploads through RESTful API endpoints
- Process markdown text and convert it to HTML
- Check grammar of note content
- Store notes persistently while avoiding file name collisions

This service provides a backend API for markdown note management that can be consumed by frontend applications or other services.

---

### **3. Features and Requirements**

#### **3.1 Functional Requirements**

| ID  | Feature              | Description                                                    |
| --- | -------------------- | -------------------------------------------------------------- |
| FR1 | Save Note            | Save markdown note content via POST endpoint                   |
| FR2 | Render Note          | Convert markdown to HTML and return rendered content          |
| FR3 | Grammar Check        | Check grammar of note content and return suggestions          |
| FR4 | File Upload          | Handle file uploads through RESTful API                       |
| FR5 | Retrieve Note        | Get saved note content by ID or name                          |

#### **3.2 Non-Functional Requirements**

| ID   | Requirement | Description                                     |
| ---- | ----------- | ----------------------------------------------- |
| NFR1 | Performance | API responses should be under 500ms            |
| NFR2 | Scalability | Handle concurrent file uploads and processing  |
| NFR3 | Security    | Validate file types and sanitize input content |
| NFR4 | Reliability | Ensure data persistence and avoid name collisions |

---

### **4. User Flow**

1. User uploads a markdown file or sends markdown text via API
2. System processes the request and stores the note
   - Validates file type and content
   - Generates unique identifier to avoid collisions
3. User can request grammar check for the note content
4. User can request HTML rendering of the markdown note
5. User can retrieve previously saved notes

---

### **5. Technical Design**

- **Storage:** File system or database for persistent note storage
- **Markdown Processing:** Markdown parsing library for HTML conversion
- **File Upload:** Multer (Node.js) for handling multipart/form-data
- **Grammar Check:** Grammar checking service or library
- **Languages/Frameworks:** Node.js with Express.js framework
- **Environment Variables:**

  - `PORT` - Server port number
  - `STORAGE_PATH` - Path for file storage
  - `MAX_FILE_SIZE` - Maximum allowed file size

---

### **6. API Specification**

**Endpoint:** `POST /notes`
**Description:** Save a new markdown note
**Content-Type:** `application/json` or `multipart/form-data`

**Request Body:**
```json
{
  "title": "Note Title",
  "content": "# Markdown Content\n\nThis is a note."
}
```

**Response Example:**
```json
{
  "id": "unique-note-id",
  "title": "Note Title",
  "created_at": "2025-07-14T10:30:00Z"
}
```

**Endpoint:** `GET /notes/{id}/render`
**Description:** Get HTML rendered version of markdown note

**Response Example:**
```json
{
  "id": "unique-note-id",
  "html": "<h1>Markdown Content</h1><p>This is a note.</p>"
}
```

**Endpoint:** `POST /notes/{id}/grammar-check`
**Description:** Check grammar of note content

**Response Example:**
```json
{
  "id": "unique-note-id",
  "suggestions": [
    {
      "line": 1,
      "issue": "Grammar suggestion",
      "suggestion": "Corrected text"
    }
  ]
}
```

---

### **7. Constraints & Assumptions**

- File uploads are limited to markdown files (.md, .txt)
- Maximum file size should be configurable
- Notes are stored with unique identifiers to prevent collisions
- Grammar checking may require external service integration

---

### **8. Milestones**

| Milestone | Description                           | ETA   |
| --------- | ------------------------------------- | ----- |
| M1        | Basic API structure and note storage  | Day 1 |
| M2        | File upload functionality             | Day 2 |
| M3        | Markdown to HTML rendering            | Day 3 |
| M4        | Grammar checking integration          | Day 4 |
| M5        | Testing and deployment                | Day 5 |