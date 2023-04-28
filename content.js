function extractText() {
  const chatContainers = Array.from(document.querySelectorAll('.group.w-full'));
  console.log('chatContainers length:', chatContainers.length);
  const extractedText = [];

  chatContainers.forEach((container) => {
    const questionElement = container.querySelector('[class*="min-h-"]');
    const chatContent = container.querySelector('[class*="flex-1"]');

    if (questionElement) {
      console.log('Question found:', questionElement.textContent.trim());
      extractedText.push('Question: ' + questionElement.textContent.trim() + '\n');
    }

    if (chatContent) {
      console.log('Answer found:', chatContent.textContent.trim());
      extractedText.push('Answer: ' + chatContent.textContent.trim() + '\n');
    }
  });

  console.log('Extracted text:', extractedText);
  return extractedText;
}

function saveAsFile(textArray) {
  const fileName = 'extracted_text.txt';
  const blob = new Blob([textArray.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = fileName;
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractText') {
    const extractedTextArray = extractText();
    saveAsFile(extractedTextArray);
  }
});
