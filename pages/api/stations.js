const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const filePath = path.join(process.cwd(), 'stations.csv');
export default function handler(req, res) {

  try {
    const csvData = [];
    
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => {
        csvData.push(row);
      })
      .on('end', () => {
        // Set response headers and send JSON data
        // res.setHeader('Content-Type', 'application/json');
        res.status(200).json(csvData);
      })
      .on('error', (error) => {
        console.error('Error parsing CSV:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
