import { useEffect, useState } from 'react';
import './nav.css';

const Nav = () => {
    const [isSticky, setIsSticky] = useState(false);



    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.pageYOffset > 0);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const navigationClass = isSticky ? 'navigation-menu sticky' : 'navigation-menu';

    return (
        <nav className={navigationClass}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/instagram">Instagram</a>
        </nav>
    );
};

export default Nav
