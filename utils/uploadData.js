const { MongoClient } = require('mongodb');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI;
const filePath = 'output_enriched.json';

async function importData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('eq-items');
    const collection = database.collection('items');

    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const result = await collection.insertMany(jsonData);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (error) {
    console.error('Error importing data to MongoDB:', error);
  } finally {
    client.close();
  }
}

importData();



