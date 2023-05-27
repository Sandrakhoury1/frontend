import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/Navbar.css';
import Logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function NavBarAdmin() {
    useEffect(() => {
        window.scrollTo(0,0)
    },[]);
    
    const [click, setClick] = useState(false);

    const [btn, setBtn] = useState(true);

    const handleClick = () => setClick(!click);

    const closeMenu = () => setClick(false);

    const viewButton = () => {
        if(window.innerWidth <= 960) {
            setBtn(false);
        } else {
            setBtn(true);
        }
    };
    
    useEffect(() => {
        viewButton();
    }, []);

    window.addEventListener('resize', viewButton);

    const handleLogOut = () => {
        closeMenu();
        localStorage.removeItem('token');
        window.location.href = "/login";
    }

    return (
        <>
         <nav className='navbar'>
            <div className='navbar-container'>
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
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
                        <div className='nav-links navbar__dropdown'>
                            Users
                            <div className='navbar__dropdown__content'>
                                <Link to = '/complaints/vip' className='nav-links' onClick={closeMenu}>
                                    VIP
                                </Link>
                                <Link to = '/complaints/non-vip' className='nav-links' onClick={closeMenu}>
                                    Non-VIP
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li className='nav-item'>
                        <div className="nav-links navbar__dropdown">
                            Complaints
                            <div className="navbar__dropdown__content">
                            <Link to= '/allcomplaints' className='nav-links' onClick={closeMenu}>
                                    All Complaints
                                </Link>
                                <Link to= '/complaints/pending' className='nav-links' onClick={closeMenu}>
                                    Pending
                                </Link>
                                <Link to= '/complaints/resolved' className='nav-links' onClick={closeMenu}>
                                    Resolved
                                </Link>
                                <Link to= '/complaints/rejected' className='nav-links' onClick={closeMenu}>
                                    Rejected
                                </Link>
                                <Link to= '/complaints/inprogress' className='nav-links' onClick={closeMenu}>
                                    In Progress
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li className='nav-item'> 
                        <Link to='/dashboard' className='nav-links' onClick={closeMenu}>
                            Dashboard
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-links-mobile' onClick={handleLogOut} >
                            Log Out
                        </Link>
                    </li>
                </ul>
                <div className='logout'>
                    {btn && <button className='logoutbtn' onClick={handleLogOut}>Log Out</button>}
                </div>
            </div>
         </nav>
        </>
    );
}

export default NavBarAdmin;