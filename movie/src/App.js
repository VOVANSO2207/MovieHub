import 'bootstrap/dist/css/bootstrap.min.css';
// Import Swiper styles
import 'swiper/css';
import './App.css';
import React ,{useState,useEffect} from 'react';
import Header from './pages/Header';
import Banner from './pages/Banner';
import Main from './pages/Main';
import Footer from './pages/Footer';
import BackToTopBtn from './components/BackToTopBtn';

function App() {
  const [scroll,setScroll] = useState(0);
  // Bắt sự kiện srcoll của màn hình 
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      setScroll(window.scrollY);
    });
    return () =>{
      window.removeEventListener('scroll',() =>{
          setScroll(window.scrollY);
      });
    };
  },[scroll]);
  return (
    <>
     <Header scroll={scroll}></Header>
      
      <Banner></Banner>
      <Main></Main>
      <Footer></Footer>
      <BackToTopBtn scroll={scroll}></BackToTopBtn>
    </>
   
  );
}

export default App;
