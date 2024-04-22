import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SearchItem = () => {
  const [items, setItems] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch items from backend API when component mounts
    async function fetchItems() {
      try {
        const response = await fetch('/api/items');
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

  // Filter items based on search term
  const filteredItems = items ? items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10) : [];

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
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
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