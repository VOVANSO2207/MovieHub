import React, { useState,useEffect} from 'react'
import { Swiper,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import TrendCard from '../components/TrendCard';
import '../css/relatedMovie.css';
function RelatedMovie  (){
    const [slides,setSlides] = useState([]);
    const fetchData = () => {
        fetch('http://localhost:8081/movies')
            .then(res => res.json())
           .then(data =>{
            setSlides(data);
           })
           .catch(e => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);
  return (
   <section id="trend" className='trend'>
        <div className="container">
            <div className="row">
                <h4 className="section-title">Related Movies</h4>
            </div>
            <div className="row">
                <Swiper
                    breakpoints={{
                        320:{
                            slidesPerView: 1 ,
                            spaceBetween : 20 ,
                        },
                        480:{
                            slidesPerView: 3 ,
                            spaceBetween : 30 ,
                        },
                        640:{
                            slidesPerView: 4 ,
                            spaceBetween : 30 ,
                        },
                        992:{
                            slidesPerView: 6 ,
                            spaceBetween : 30 ,
                        },

                    }}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false, 
                    }}
                    loop = {true}
                    modules={[Autoplay]}
                    className="trendSwiperRelatedMovie"
                >
                        {
                            slides && slides.length > 0 && slides.map(slide => (
                                <SwiperSlide key={slide._id}>
                                        <TrendCard slide={slide}></TrendCard>
                                </SwiperSlide>
                            ))
                        }
                </Swiper>
            </div>
        </div>
   </section>
  );
}

export default RelatedMovie