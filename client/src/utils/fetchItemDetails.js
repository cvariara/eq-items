import { readFileSync, writeFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

// Load the JSON data from output.json
const jsonData = readFileSync('output.json', 'utf8');
const items = JSON.parse(jsonData);

// Function to fetch item details from Lucy link and update the item object
async function fetchItemDetails(item) {
    try {
        const response = await fetch(item.lucylink);
        const html = await response.text();

        // Parse HTML string using JSDOM
        const { window } = new JSDOM(html);
        const document = window.document;

        // Check if the document contains item details
        const shotDataElement = document.querySelector('.spellview .shotdata');
        if (!shotDataElement) {
            throw new Error('Item details not found in the document');
        }

        // Extract item details from the shotDataElement
        const itemNameElement = shotDataElement.querySelector('.spellview');
        if (!itemNameElement) {
            throw new Error('Item name element not found');
        }
        const itemName = itemNameElement.textContent.trim();

        // Update the item object with extracted details
        item.name = itemName;

        // Optionally remove lucylink from the item object (if needed)
        delete item.lucylink;

        console.log(`Details fetched for item ID ${item.id}: ${item.name}`);
    } catch (error) {
        console.error(`Error fetching item details for ID ${item.id}: ${error.message}`);
    }
}

// Process each item in the array asynchronously
async function processItems() {
    for (const item of items) {
        await fetchItemDetails(item);
    }

    // Write updated JSON data back to output.json
    writeFileSync('output.json', JSON.stringify(items, null, 2), 'utf8');
    console.log('Item details updated and saved to output.json');
}

// Start processing items
processItems();
