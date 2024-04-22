import { readFileSync, writeFileSync } from 'fs';

const filePath = './src/utils/items.txt';  // Path to your text file

const convertTxtToObject = (filePath) => {
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const lines = fileContent.trim().split('\n');

    const items = lines.slice(1).map((line) => {
      const [id, name, lucylink] = line.split(',');
      return {
        id: parseInt(id),
        name: name.replace(/"/g, '').trim(),  // Remove surrounding quotes and trim whitespace
        lucylink: lucylink.trim()
      };
    });

    return items;
  } catch (error) {
    console.error('Error reading or parsing file:', error);
    return [];
  }
};

const writeItemsToFile = (items) => {
  const jsonContent = JSON.stringify(items, null, 2);  // Convert items array to formatted JSON
  const outputFile = './output.json';  // Path to the output JSON file

  try {
    writeFileSync(outputFile, jsonContent);
    console.log(`Successfully wrote ${items.length} items to ${outputFile}`);
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

const items = convertTxtToObject(filePath);
writeItemsToFile(items);
