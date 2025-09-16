import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/other/Header.css';
import { useEffect, useState } from 'react';
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

  // prevent background scroll when dropdown is open
  useEffect(() => {
    if (navDropdown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [navDropdown]);

  const handleNavigate = (path: string) => {
    // Close dropdown and navigate in the same tick
    setNavDropdown(false);
    navigate(path);
  };

  return (
    <>
      <div className="h-header">
        <p className="h-logo">PlyCraft.</p>

        {/* Desktop links */}
        <div className="h-right">
          <Link to="/" className={focused === 1 ? 'h-link h-link-focused' : 'h-link'}>Home</Link>
          <Link to="/products" className={focused === 2 ? 'h-link h-link-focused' : 'h-link'}>Products</Link>
          <Link to="/about" className={focused === 3 ? 'h-link h-link-focused' : 'h-link'}>About</Link>
          <Link to="/contact" className={focused === 4 ? 'h-link h-link-focused' : 'h-link'}>Contact</Link>
        </div>

        <FontAwesomeIcon
          className="h-toggle"
          icon={faBars}
          onClick={() => setNavDropdown(true)}
          role="button"
          aria-label="Open navigation menu"
          tabIndex={0}
        />
      </div>


      {navDropdown && (
        <>
          {/* Optional backdrop to block clicks/scroll */}
          <div
            className="h-backdrop"
            onClick={() => setNavDropdown(false)}
            aria-hidden="true"
          />

          <div className="h-dropdown" role="dialog" aria-modal="true">
            <FontAwesomeIcon
              className="h-dropdown-close"
              icon={faTimes}
              onClick={() => setNavDropdown(false)}
              role="button"
              aria-label="Close navigation menu"
              tabIndex={0}
            />

            <div className="h-dropdown-links">
              <p className="h-dropdown-link" onClick={() => handleNavigate('/')}>
                Home
              </p>
              <p className="h-dropdown-link" onClick={() => handleNavigate('/products')}>
                Products
              </p>
              <p className="h-dropdown-link" onClick={() => handleNavigate('/about')}>
                About
              </p>
              <p className="h-dropdown-link" onClick={() => handleNavigate('/contact')}>
                Contact
              </p>
            </div>

            <div className="h-dropdown-bottom">
              <div className="h-dropdown-socials">
                <a
                  href="https://www.facebook.com/profile.php?id=61553292410630"
                  className="h-dropdown-social-link"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="https://www.instagram.com/swalesidevaleting/"
                  className="h-dropdown-social-link"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
              <p className="h-logo">PlyCraft</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
