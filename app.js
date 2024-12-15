const express = require('express');
const path = require('path');
const generateCsvRoute = require('./routes/generate-csv');

const app = express();
//server will run on port 3000
const PORT = 3000;

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for CSV generation
app.use('/generate-csv', generateCsvRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
