import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = (props) => {
  const { onSearch } = props;

  return (
    <div className={styles.nav}>
      <NavLink exact to='/' activeClassName={styles.active} className={styles.link}>
        Home
      </NavLink>
      <NavLink exact to='/favorites' activeClassName={styles.active} className={styles.link}>
        Favorites
      </NavLink>
      <NavLink exact to='/about' activeClassName={styles.active} className={styles.link}>
        About
      </NavLink>
      <SearchBar onSearch={onSearch} />
      <NavLink exact to='/login' activeClassName={styles.active} className={styles.link}>
        Login
      </NavLink>
      <NavLink exact to='/reg' activeClassName={styles.active} className={styles.link}>
        Register
      </NavLink>
    </div>
  );
};

export default Nav;
