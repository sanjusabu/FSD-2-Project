import React from 'react';
import '../Home/Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer-container">
      <section className='footer-subscription'>
        <p className='footer-subscription-heading gdcgsuydcs'>
          A whole ecosystem of modern investment apps
          tailored to specific needs, built from the ground up
        </p>
      </section>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              STOCK PORTFOLIO DASHBOARD
            </Link>
          </div>
          <small className='website-rights'>SPD © 2023</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f gdcgsuydcs'/>
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
              <i class='fab fa-instagram gdcgsuydcs' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
              <i class='fab fa-youtube gdcgsuydcs' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
              <i class='fab fa-twitter gdcgsuydcs' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
              <i class='fab fa-linkedin gdcgsuydcs' />

            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
