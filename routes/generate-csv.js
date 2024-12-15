const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
   // Define API endpoints
const apis = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/comments',
];

// Fetch data from all APIs concurrently
const [users, posts, comments] = await Promise.all(
  apis.map(api => axios.get(api).then(response => response.data))
);



    // Combining columns on the basis of id
    const csvData = users.map(user => {
      const post = posts.find(p => p.id === user.id) || {};
      const comment = comments.find(c => c.id === user.id) || {};

      return {
        name: user.name || 'name not found',
        title: post.title || 'title not found',
        body: comment.body || 'body not found',
      };
    });

    //giving headers to the csv file
    const fields = ['name', 'title', 'body'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(csvData);

    // File path of the file
    const filePath = path.join(__dirname, '../generatedFolder/generatedFile.csv');

    // Write CSV into the file
    fs.writeFileSync(filePath, csv);

    res.status(200).json({ message: 'CSV generated successfully', filePath });
  } catch (error) {
    console.error('Error generating CSV:', error.message);
    res.status(500).json({ message: 'Failed to generate CSV', error: error.message });
  }
});

module.exports = router;
