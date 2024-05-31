// import React, { useState, useEffect } from 'react'
// import './schedule.css';
// import Card from '../components/Card';
// function Schedule() {
//     const filterList = [
//         {
//             _id: 1,
//             name: 'All',
//             active: true,
//         },
//         {
//             _id: 2,
//             name: 'Romance',
//             active: false,
//         },

//         {
//             _id: 3,
//             name: 'Action',
//             active: false,
//         },
//         {
//             _id: 4,
//             name: 'Detective',
//             active: false,
//         },
//         {
//             _id: 5,
//             name: 'Thriller',
//             active: false,
//         },
//         {
//             _id: 6,
//             name: 'Adventure',
//             active: false,
//         },

//     ];
//     const [data, setData] = useState([]);
//     const [movies, setMovies] = useState([]);
//     const [filters, setFilters] = useState(filterList);
//     const fetchData = () => {
//         fetch('http://localhost:3000/data/movieData.json')
//             .then(res => res.json())
//             .then(data => setData(data))
//             .catch(e => console.log(e.message));
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     useEffect(() => {
//         setMovies(data);
//     },[data]);
//     const handleFilterMovies  = category => {
//        setFilters(
//         filters.map(filter=>{
//             filter.active = false;
//             if(filter.name === category){
//                 filter.active = true;
//             }
//             return filter;
//              })
//         );
//         if (category === 'All'){
//             setMovies(data);
//             return;
//         }
//       const filteredMovies = data.filter(movie=> movie.category === category);
//       setMovies(filteredMovies);
//     };
//     return (
//         <section id="schedule" className='schedule'>
//             <div className="container-fluid">
//                 <div className="row">
//                     <h4 className="section-title">
//                         Opening this week
//                     </h4>
//                 </div>
//                 <div className="row">
//                     <ul className="filters">
//                         {
//                             filters.map(filter => (
//                                 <li key={filter._id} className={`${filter.active ? 'active' : undefined}`}
//                                 onClick={() => {handleFilterMovies(filter.name)}}
//                                 >{filter.name}
                                
//                                 </li>
//                             ))
//                         }
//                     </ul>

//                 </div>
//                 <div className="row mt-5">
//                     {movies && movies.length > 0 && movies.map(movie => (
//                         <Card key={movie._id} movie={movie}></Card>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Schedule;import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import './schedule.css';
import Card from '../components/Card';

function Schedule({ searchQuery }) {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([]);
    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState([{ _id: 1, name: 'All', active: true }]);

    // Fetch categories from the backend
    const fetchCategories = () => {
        fetch('http://localhost:8081/categories')
            .then(res => res.json())
            .then(categories => {
                // Create filter list with categories
                const categoryFilters = categories.map(category => ({
                    _id: category.category_id,
                    name: category.name,
                    active: false,
                }));
                setCategories(categories);
                setFilters([{ _id: 1, name: 'All', active: true }, ...categoryFilters]);
            })
            .catch(e => console.log(e.message));
    };

    // Fetch movies from the backend
    const fetchData = () => {
        fetch('http://localhost:8081/movies')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(e => console.log(e.message));
    };

    // Search movies by title
    const searchMovies = (query) => {
        fetch(`http://localhost:8081/movies/search?title=${query}`)
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(e => console.log(e.message));
    };

    // Initial data fetch
    useEffect(() => {
        fetchCategories();
        fetchData();
    }, []);

    // Update movies based on search query or data change
    useEffect(() => {
        if (searchQuery) {
            searchMovies(searchQuery);
        } else {
            setMovies(data);
        }
    }, [searchQuery, data]);

    // Handle filtering movies by category
    const handleFilterMovies = (category) => {
        setFilters(
            filters.map(filter => {
                filter.active = filter.name === category;
                return filter;
            })
        );
        if (category === 'All') {
            setMovies(data);
            return;
        }
        const filteredMovies = data.filter(movie => movie.category_name === category);
        setMovies(filteredMovies);
    };

    return (
        <section id="schedule" className='schedule'>
            <div className="container-fluid">
                <div className="row">
                    <h4 className="section-title">Opening this week</h4>
                </div>
                <div className="row">
                    <ul className="filters">
                        {filters.map(filter => (
                            <li key={filter._id} className={`${filter.active ? 'active' : ''}`}
                                onClick={() => { handleFilterMovies(filter.name) }}
                            >{filter.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="row mt-5">
                    {movies && movies.length > 0 && movies.map(movie => (
                        <Card key={movie._id} movie={movie}></Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Schedule;
