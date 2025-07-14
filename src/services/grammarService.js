const writeGood = require('write-good');

class GrammarService {
  checkGrammar(content) {
    if (!content) {
      return [];
    }

    // Get suggestions from write-good
    const suggestions = writeGood(content);
    
    // Format suggestions for our API
    const formatted = suggestions.map((suggestion, index) => {
      // Extract line number from the content
      const lines = content.substring(0, suggestion.index).split('\n');
      const lineNumber = lines.length;
      
      return {
        line: lineNumber,
        issue: suggestion.reason,
        suggestion: suggestion.reason // write-good provides the issue description
      };
    });

    return formatted;
  }
}

module.exports = new GrammarService();