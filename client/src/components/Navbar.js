import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.menuIcon}>
                <i className="fa fa-bars"></i>
            </div>
            <div style={styles.brand}>
                Startup
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #66ff66 0%, #99ffcc 100%)',
        color: '#fff',
        padding: '10px 20px',
    },
    brand: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    menuIcon: {
        fontSize: '1.5rem',
        cursor: 'pointer',
    }
};

export default Navbar;
