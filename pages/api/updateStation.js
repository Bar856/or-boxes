const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { id, name, owner, ip, location } = req.body;

    // Read the CSV file and update the data
    const filePath = path.join(process.cwd(), 'stations.csv');
    const updatedData = [];
    let headers = []; // Store the headers when they are first encountered

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('headers', (headerList) => {
        headers = headerList; // Store the headers
      })
      .on('data', (row) => {
        if (row.id === id) {
          row.name = name;
          row.owner = owner;
          row.ip = ip;
          row.location = location;
        }
        updatedData.push(row);
      })
      .on('end', () => {
        // Write the updated data back to the CSV file
        fs.writeFileSync(filePath, '');
        fs.createWriteStream(filePath, { flags: 'a' })
          .write(headers.join(',') + '\n'); // Write the headers first
        updatedData.forEach((row) =>
          fs.createWriteStream(filePath, { flags: 'a' }).write(Object.values(row).join(',') + '\n')
        );

        res.status(200).json({ message: 'Data updated successfully!' });
      })
      .on('error', (error) => {
        console.error('Error updating CSV:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
