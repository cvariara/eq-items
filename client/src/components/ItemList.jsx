// src/components/ItemList.js
import React, { useState, useEffect } from 'react';
import fetchItemDetails from '../utils/fetchItemDetails';

const ItemList = ({ items }) => {
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    const getItemDetails = async () => {
      const detailsMap = {};
      for (const item of items) {
        const { id, name, lucyLink } = item;
        if (lucyLink) {
          const details = await fetchItemDetails(lucyLink);
          if (details) {
            detailsMap[id] = { name, details };
          }
        }
      }
      setItemDetails(detailsMap);
    };

    getItemDetails();
  }, [items]);

  return (
    <div>
      <h2>EverQuest Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {itemDetails[item.id]?.details?.name || 'Loading...'}
            {/* Display additional item details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
