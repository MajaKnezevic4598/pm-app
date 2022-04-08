import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './AdminHeader.module.scss';

import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggler = () => setMenuOpen((p) => !p);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('profileId');
    setMenuOpen(false);
    window.location.href = '/';
  };

  const closeNav = () => {
    setMenuOpen(false);
  };

  const Button = () => {
    return (
      <button className={styles.button} onClick={logout}>
        Logout
      </button>
    );
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
            className={`${styles.nav} ${menuOpen ? styles[`nav--open`] : {}}`}
          >
            <Link className={styles.nav__item} onClick={closeNav} to="/">
              Users
            </Link>
            <Link
              className={styles.nav__item}
              onClick={closeNav}
              to="/categories"
            >
              Categories
            </Link>
            <Link
              className={styles.nav__item}
              onClick={closeNav}
              to="/my-account"
            >
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
          <button className={styles.header__toggler} onClick={menuToggler}>
            {!menuOpen ? <BiMenuAltRight /> : <AiOutlineClose />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
