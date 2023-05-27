import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    useEffect(() => {
        window.scrollTo(0,0)
    },[]);

    const [click, setClick] = useState(false);

    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    const handleLogOut = () => {
        closeMobileMenu();
        localStorage.removeItem('token');
        window.location.href = "/login";
    }

    return (
        <>
         <nav className='navbar'>
            <div className='navbar-container'>
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    <img src={Logo} alt="Logo" className='logo-image'/>
                    We Support
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <FontAwesomeIcon 
                    icon = {click ? faTimes : faBars}
                    className='icon'
                    />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'> 
                        <Link to='/complaints' className='nav-links' onClick={closeMobileMenu}>
                            Complaints
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                            About Us
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/signup' className='nav-links-mobile' onClick={handleLogOut} >
                            Log Out
                        </Link>
                    </li>
                </ul>
                <div className='logout'>
                    {button && <button className='logoutbtn' onClick={handleLogOut}>Log Out</button>}
                </div>
            </div>
         </nav>
        </>
    )
}

export default Navbar;