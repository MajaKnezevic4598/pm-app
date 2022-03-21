import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuToggler = () => setMenuOpen((p) => !p);

    const Button = () => {
        return <button className={styles.button}>Logout</button>;
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__content}>
                <div>
                    <span className={styles.logo}>
                        <a href="/">Q Project Info</a>
                    </span>
                </div>
                <div>
                    <nav
                        className={`${styles.nav} ${
                            menuOpen ? styles[`nav--open`] : {}
                        }`}
                    >
                        <Link className={styles.nav__item} to="/my-projects">
                            My Projects
                        </Link>
                        <Link className={styles.nav__item} to="/account">
                            Account
                        </Link>
                        <div className={styles.nav__button__container}>
                            <Button />
                        </div>
                    </nav>
                </div>
                <div>
                    <div className={styles.header__button__container}>
                        <Button />
                    </div>
                    <button
                        className={styles.header__toggler}
                        onClick={menuToggler}
                    >
                        {!menuOpen ? <BiMenuAltRight /> : <AiOutlineClose />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
