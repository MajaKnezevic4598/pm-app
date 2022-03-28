import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

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
    window.location.href = '/';
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
            <Link className={styles.nav__item} to="/">
              Users
            </Link>
            <Link className={styles.nav__item} to="/categories">
              Categories
            </Link>
            <div className={styles.nav__button__container}>
              <Button />
            </div>
          </nav>
          <Link className={styles.nav__item} to="/my-account">
            Account
          </Link>
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
