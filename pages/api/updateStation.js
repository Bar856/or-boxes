const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, name, owner, ip, location } = req.body;

    // Read the CSV file and update the data
    const filePath = path.join(process.cwd(), 'stations.csv');

    try {
      // Read the entire CSV file into memory and perform updates
      const data = await new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            console.error('Error reading CSV file:', err);
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      const lines = data.trim().split('\n');
      const headers = lines[0].split(',');

      // Find the index of the station with the provided ID
      const stationIndex = lines.findIndex((line) => {
        const columns = line.split(',');
        return columns[0] === id;
      });

      if (stationIndex === -1) {
        return res.status(404).json({ error: 'Station not found' });
      }

      // Update the data for the station
      lines[stationIndex] = [id, name, owner, ip, location].join(',');

      // Join all lines back into a single CSV string
      const updatedData = lines.join('\n');

      // Write the updated data back to the CSV file
      await new Promise((resolve, reject) => {
        fs.writeFile(filePath, updatedData, 'utf-8', (err) => {
          if (err) {
            console.error('Error updating CSV file:', err);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      return res.status(200).json({ message: 'Data updated successfully!' });
    } catch (error) {
      console.error('Error updating CSV file:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}