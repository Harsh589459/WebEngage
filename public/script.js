document.getElementById('generate-csv-btn').addEventListener('click', async () => {
    const statusElement = document.getElementById('status');
  
    // Clear previous messages
  
    try {
      statusElement.textContent = 'Generating CSV...';
  
      // Call the API
      const response = await fetch('/generate-csv');
      if (!response.ok) {
        //if something filled the below text will appear
        throw new Error('Failed to generate CSV');
      }
  
      const result = await response.json();
  
      // once the file is generated this text will popup
      statusElement.innerHTML = 'CSV Generated Successfully!';
     
    } catch (error) {
      console.error(error);
      statusElement.textContent = 'Error: Could not generate CSV.';
    }
  });
  