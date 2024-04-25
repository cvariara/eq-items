import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch items from backend API when component mounts
    async function fetchItems() {
      try {
        const response = await fetch('/api/items/subset');
        if (response.ok) {
          const data = await response.json();
          setItems(data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch items');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div id='Items'>
      <h2>Featured Items</h2>
      <ul className='list-items'>{items.map((item) => (
        <li key={item.id} className='list-item'>
          <Link to={`/item/${item.id}`}>
            <img src={item.information.imgsrc} />
            <h3>{item.name}</h3>
          </Link>
        </li>
      ))}</ul>
    </div>
  );
};

export default Items;
