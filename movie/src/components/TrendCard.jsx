import React from 'react'
import '../css/trendCard.css';
import { Link } from 'react-router-dom';
function TrendCard({slide}) {
  return (

    <div className="trend-card">
        <img src={slide.previewImg} alt="comming-soon" className="img-fluid" />
        <a href="#">
            Add to calendar <ion-icon name="calendar-outline"></ion-icon>
        </a>
    </div>
//     <div className="movie-card">
//   <img src={slide.previewImg} alt="Preview" className='img-fluid' />
//   <p>{slide.length} | {slide.category_name}</p>
//     <div className="content">
//      <h4>{slide.title}</h4>

//         <div className="card-icons">
          
//            <Link to={`/watch/${slide._id}`}>
//                   <ion-icon name="play-outline"></ion-icon>
//               </Link>
          
//         </div>
//     </div>
// </div>
  )
}

export default TrendCard