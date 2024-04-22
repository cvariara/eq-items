// // import React, { useEffect, useState } from 'react';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import './App.css';

// // import Home from './pages/Home';
// // import Items from './pages/Items';
// // import Item from './pages/Item'
// // import Navbar from './components/Navbar';

// // import itemData from './utils/output_enriched.json'; // Import the JSON file
// // import SearchItem from './pages/SearchItem';

// // const App = () => {
// //   const [items, setItems] = useState(null);

// //   useEffect(() => {
// //     // Simulate fetching data from JSON file (replace with actual fetch call)
// //     // Assuming `itemData` is an array containing item objects
// //     setItems(itemData);
// //   }, []); // Empty dependency array ensures this effect runs only once on mount

// //   return (
// //     <div className='App'>
// //       <BrowserRouter>
// //         <Navbar />
// //         <Routes>
// //           <Route path='/' element={<Home />} />
// //           {/* Pass items data to Items component */}
// //           <Route path='/items' element={<Items items={items} />} />
// //           <Route path='/item/:id' element={<Item items={items} />} />
// //           <Route path='/item/search' element={<SearchItem items={items} />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </div>
// //   );
// // };

// // export default App;
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';

// import Home from './pages/Home';
// import Items from './pages/Items';
// import Item from './pages/Item'
// import Navbar from './components/Navbar';

// //const { MongoClient } = require('mongodb');
// import { MongoClient } from 'mongodb';

// const App = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Define MongoDB connection URL
//     const uri = 'mongodb+srv://cvariara:l1JZTHAOjnsYLbF8@cluster0.7nm2sge.mongodb.net/eq-items?retryWrites=true&w=majority';

//     // Create a MongoDB client
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     // Connect to MongoDB
//     async function connectToMongoDB() {
//       try {
//         await client.connect();
//         console.log('Connected to MongoDB');

//         // Access the database and collection
//         const database = client.db('eq-items');
//         const collection = database.collection('items');

//         // Fetch items from MongoDB collection
//         const fetchedItems = await collection.find().toArray();
//         setItems(fetchedItems);
//       } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//       }
//     }

//     // Call the async function to connect and fetch data
//     connectToMongoDB();

//     // Cleanup function to close MongoDB connection
//     return () => {
//       client.close();
//     };
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   return (
//     <div className='App'>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           {/* Pass items data to Items component */}
//           <Route path='/items' element={<Items items={items} />} />
//           <Route path='/item/:id' element={<Item items={items} />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Items from './pages/Items';
import Item from './pages/Item';
import Navbar from './components/Navbar';
import SearchItem from './pages/SearchItem';

const App = () => {

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/items' element={<Items />} />
          <Route path='/item/:id' element={<Item />} />
          <Route path='/search' element={<SearchItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
