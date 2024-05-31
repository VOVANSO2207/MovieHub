// import React from 'react'
// import '../css/search.css';

// function Search() {
//     return (
//         <div className="search">
//             <input type="text" placeholder="Search"/>
//             <ion-icon name="search-outline"></ion-icon>
//         </div>
//     );
// }

// export default Searchimport React, { useState } from 'react';
import '../css/search.css';
import React, { useState } from 'react';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="search">
      <input 
        type="text" 
        placeholder="Search" 
        value={query} 
        onChange={handleSearch} 
      />
      <ion-icon name="search-outline"></ion-icon>
    </div>
  );
}

export default Search;
