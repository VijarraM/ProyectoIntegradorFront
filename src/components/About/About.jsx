import React from 'react';
import styles from './About.module.css';
import Nav from '../nav/Nav';

function About() {
  return (
    <div className='about'>
      <h1 className={styles.title}>Rick and Morty App</h1>
      <h2 className={styles.description}>
        es una aplicación desarrollada durante mi etapa de estudio. Te permite explorar personajes de la serie "Rick and
        Morty", buscar por ID, ver información detallada y agregar tus favoritos. Es una forma divertida y sencilla de
        sumergirte en el universo de "Rick and Morty" mientras pones a prueba funciones como selección de favoritos,
        filtros y ordenamientos.
      </h2>
    </div>
  );
}

export default About;
