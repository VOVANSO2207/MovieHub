  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  import { BrowserRouter ,Routes,Route} from 'react-router-dom';
  
import WatchMovie from './pages/WatchMovie';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
    <App />
  </React.StrictMode>
  //   <BrowserRouter>
  //   {/* <Routes>
  //     <Route path="/" element={<App></App>}></Route>
  //     <Route path="/watch/:movieId" element={<WatchMovie />} />
  //   </Routes> */}
  // <App />
  // </BrowserRouter>
  );


  reportWebVitals();

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>