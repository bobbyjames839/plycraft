import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/other/Header.css';
import { use, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

export function Header() {
    const [focused, setFocused] = useState(1);
    const location = useLocation();
    const [navDropdown, setNavDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setFocused(1);
        else if (path === '/products') setFocused(2);
        else if (path === '/about') setFocused(3);
        else if (path === '/contact') setFocused(4);
    }, [location]);


    return (
        <>
        <div className="h-header">
            <p className='h-logo'>PlyCraft</p>
            <div className="h-right">
                <Link to="/" className={focused === 1 ? 'h-link h-link-focused' : 'h-link'}>Home</Link>
                <Link to="/products" className={focused === 2 ? 'h-link h-link-focused' : 'h-link'}>Products</Link>
                <Link to="/about" className={focused === 3 ? 'h-link h-link-focused' : 'h-link'}>About</Link>
                <Link to="/contact" className={focused === 4 ? 'h-link h-link-focused' : 'h-link'}>Contact</Link>
            </div>
            <FontAwesomeIcon className='h-toggle' icon={faBars} onClick={() => (setNavDropdown(true))} />
        </div>

        {navDropdown && (
        <div className="h-dropdown">
          <FontAwesomeIcon className="h-dropdown-close" icon={faTimes} onClick={() => (setNavDropdown(false))} />
          <div className="h-dropdown-links">
            <Link className="h-dropdown-link" to="/" onClick={() => (setNavDropdown(false))}>Home</Link>
            <Link className="h-dropdown-link" to="/products" onClick={() => (setNavDropdown(false))}>Products</Link>
            <Link className="h-dropdown-link" to='/about' onClick={() => (setNavDropdown(false))}>About</Link>
            <Link className="h-dropdown-link" to="/contact" onClick={() => (setNavDropdown(false))}>Contact</Link>
          </div>

          <div className='h-dropdown-bottom'>
            <div className='h-dropdown-socials'>
                <a href='https://www.facebook.com/profile.php?id=61553292410630' className='h-dropdown-social-link' aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href='https://www.instagram.com/swalesidevaleting/' className='h-dropdown-social-link' aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
                </a>
            </div>
            <p className='h-logo'>PlyCraft</p>
          </div>
        </div>
      )}
      </>
    )
}