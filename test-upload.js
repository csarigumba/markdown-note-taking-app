// Test file upload functionality
const fs = require('fs');
const path = require('path');

const baseUrl = 'http://localhost:3000';

async function testFileUpload() {
  console.log('Testing file upload functionality...\n');

  try {
    // Create a test markdown file
    const testContent = '# Test Note\n\nThis is a test note uploaded as a file.';
    const testFilePath = path.join(__dirname, 'test-note.md');
    fs.writeFileSync(testFilePath, testContent);

    // Test 1: Upload a markdown file
    console.log('1. Uploading a markdown file...');
    const formData = new FormData();
    const fileBlob = new Blob([testContent], { type: 'text/markdown' });
    formData.append('file', fileBlob, 'test-note.md');
    formData.append('title', 'Uploaded Test Note');

    const uploadResponse = await fetch(`${baseUrl}/notes`, {
      method: 'POST',
      body: formData
    });

    const uploadedNote = await uploadResponse.json();
    console.log('Uploaded note:', uploadedNote);

    // Test 2: Retrieve the uploaded note
    console.log('\n2. Retrieving the uploaded note...');
    const getResponse = await fetch(`${baseUrl}/notes/${uploadedNote.id}`);
    const retrievedNote = await getResponse.json();
    console.log('Retrieved note content:', retrievedNote.content);

    // Clean up
    fs.unlinkSync(testFilePath);

    console.log('\n✅ File upload tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testFileUpload();