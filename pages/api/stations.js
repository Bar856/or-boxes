const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');


const filePath = path.join(process.cwd(), 'stations.csv');

export default async function handler(req, res) {
  try {
    const csvData = await new Promise((resolve, reject) => {
      const data = [];
      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on('data', (row) => {
          data.push(row);
        })
        .on('end', () => {
          resolve(data);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    // Set response headers and send JSON data
    return res.status(200).json(csvData);
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
