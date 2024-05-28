import React from 'react';
import axios from 'axios';
import styles from './Detail.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { URL_API } from '../../config';

function Detail(props) {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const navigate = useNavigate(); // Obtener la función navigate

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const { data } = await axios(`${URL_API}/character/${id}`);
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert('No hay personajes con ese ID');
        }
      } catch (error) {
        console.error('Error fetching character:', error);
        window.alert('Hubo un problema al obtener el personaje');
      }
    };

    fetchCharacter();
    return () => setCharacter({});
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1> {character.name}</h1>
        <h4>STATUS: {character.status}</h4>
        <h4>SPECIE: {character.species}</h4>
        <h4>GENDER: {character.gender}</h4>
        <h4>ORIGIN: {character.origin?.name}</h4>
        <h4>ID: {character.id}</h4>
        <img src={character.image} alt='' />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => navigate('/')}>
          Return
        </button>
      </div>
    </div>
  );
}

export default Detail;
