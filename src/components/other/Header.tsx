import { Link, useLocation } from 'react-router-dom';
import '../../styles/other/Header.css';
import { useEffect, useState } from 'react';

export function Header() {
    const [focused, setFocused] = useState(1);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setFocused(1);
        else if (path === '/products') setFocused(2);
        else if (path === '/about') setFocused(3);
        else if (path === '/contact') setFocused(4);
    }, [location]);


    return (
        <div className="h-header">
            <p className='h-logo'>PlyCraft</p>
            <div className="h-right">
                <Link to="/" className={focused === 1 ? 'h-link h-link-focused' : 'h-link'}>Home</Link>
                <Link to="/products" className={focused === 2 ? 'h-link h-link-focused' : 'h-link'}>Products</Link>
                <Link to="/about" className={focused === 3 ? 'h-link h-link-focused' : 'h-link'}>About</Link>
                <Link to="/contact" className={focused === 4 ? 'h-link h-link-focused' : 'h-link'}>Contact</Link>
            </div>
        </div>
    )
}