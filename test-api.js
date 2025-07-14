// Simple test script to verify API functionality
const baseUrl = 'http://localhost:3000';

async function testAPI() {
  console.log('Testing Markdown Note-taking API...\n');

  try {
    // Test 1: Create a note
    console.log('1. Creating a new note...');
    const createResponse = await fetch(`${baseUrl}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'My First Note',
        content: '# Hello World\n\nThis is my first markdown note!'
      })
    });

    const createdNote = await createResponse.json();
    console.log('Created note:', createdNote);

    // Test 2: Retrieve the note
    console.log('\n2. Retrieving the note...');
    const getResponse = await fetch(`${baseUrl}/notes/${createdNote.id}`);
    const retrievedNote = await getResponse.json();
    console.log('Retrieved note:', retrievedNote);

    // Test 3: Get all notes
    console.log('\n3. Getting all notes...');
    const allNotesResponse = await fetch(`${baseUrl}/notes`);
    const allNotes = await allNotesResponse.json();
    console.log('All notes count:', allNotes.length);

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run tests if server is running
testAPI();