// import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = (props) => {
  const { onSearch, nameInicial, access, logout } = props;
  // const [menuVisible, setMenuVisible] = useState(false);

  // const toggleMenu = () => {
  //   setMenuVisible(!menuVisible);
  // };

  return (
    <div className={styles.nav}>
      <div className={styles.linksContainer}>
        <NavLink to='/' className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
          Home
        </NavLink>
        <NavLink
          to='/favorites'
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
        >
          Favorites
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
          About
        </NavLink>
      </div>
      <SearchBar onSearch={onSearch} />
      <div className={styles.userMenu}>
        {!access && (
          <>
            <NavLink
              to='/login'
              className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            >
              <i className='fas fa-sign-in-alt'></i> Sign In
            </NavLink>
            <NavLink
              to='/reg'
              className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            >
              <i className='fas fa-user-plus'></i> Sign Up
            </NavLink>
          </>
        )}
        {access && (
          <>
            <span className={styles.userInitial}>{nameInicial}</span>
            <span className={styles.signOut} onClick={logout}>
              <i className='fas fa-sign-out-alt'></i> Sign Out
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
