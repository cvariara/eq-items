import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SearchItem = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch items from backend API when component mounts
    async function fetchItems() {
      try {
        const response = await fetch(`/api/items?searchTerm=${encodeURIComponent(searchTerm)}`);
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
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div id="Search">
      <h1>Search Items</h1>
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm === '' ? (
        <p className="message">Search up items for their information</p>
      ) : (
        <div className="item-list">
          {items.length > 0 ? (
            items.map(item => (
              <div key={item.id} className="item">
                <Link to={`/item/${item.id}`}>
                  <img src={item.information.imgsrc} alt={item.name} />
                  <p>{item.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <p className="message">No items found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchItem;