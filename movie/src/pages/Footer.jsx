import React from 'react'
import './footer.css';
import FooterNavItem from '../components/FooterNavItem';
function Footer() {
    const usefullLinks = [
        'Home',
        'Movies',
        'My list',
        'Term of serve',
        'Privacy Policy',
        'Poclisa dadc '

    ];
    const locations = [
        'TPHCM',
        'Hà Nội',
        'Đà Nẵng',
        'Cần Thơ',
        'Nha Trang',
        'Ninh Thuận',
    ];
  return (
    <footer id='footer' className='footer'>
        <div className="footer-top">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-5 col-md-12 footer-info">
                        <a href="/" className="logo d-flex align-items-center">
                            <span>CINEMA</span>
                        </a>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, debitis libero cumque neque nemo doloremque deserunt nam perferendis, iure qui exercitationem aperiam soluta beatae magnam quo. Cum omnis ab quae!
                        </p>
                        <div className="social-links mt-3">
                            <a href="#" className="twitter">
                             <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                            <a href="#" className="facebook">
                             <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a href="#" className="instagram">
                             <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                            <a href="#" className="youtube">
                             <ion-icon name="logo-youtube"></ion-icon>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-2 col-6 footer-links">
                        <h4>Useful Links </h4>
                        <ul>
                            {
                                usefullLinks.map(link => (
                                    <FooterNavItem key={link} name={link}></FooterNavItem>
                                ))
                            }
                        </ul>
                        </div>
                        <div className="col-lg-2 col-6 footer-links">
                        <h4>Our Cinemas</h4>
                        <ul>
                            {
                                locations.map(link => (
                                    <FooterNavItem key={link} name={link}></FooterNavItem>
                                ))
                            }
                        </ul>
                        </div>
                      
               

                    <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                        <h4>Contact Us </h4>
                        <p>Street Name <br />
                        City Name ,State 123456 <br />
                        Việt Nam <br />
                        <br />
                        <strong>Phone :</strong> +84 12345678
                        <br />
                        <strong>Email :</strong> info@gmail.com
                        <br />
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="copyright">
                &copy; CopyRight{' '}
                <strong>
                    <span> My Group</span>
                </strong>
                .All Rights Resversd

            </div>
            <div className="credits">
                Designed by <a href="#">My Group</a>
            </div>
        </div>
    </footer>
  );
}

export default Footer;