import React from 'react';
import axios from 'axios';
import styles from './Detail.module.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { URL_API } from '../../config';

function Detail(props) {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  useEffect(() => {
    axios(`${URL_API}/character/${id}`).then(({ data }) => {
      if (data.name) {
        setCharacter(data);
      } else {
        window.alert('No hay personajes con ese ID');
      }
    });
    return setCharacter({});
  }, [id]);
  console.log(character);

  return (
    <div className={styles.container}>
      <div>
        <h1>NAME: {character.name}</h1>
        <h3>STATUS: {character.status}</h3>
        <h3>SPECIE: {character.species}</h3>
        <h3>GENDER: {character.gender}</h3>
        <h3>ORIGIN:{character.origin?.name}</h3>
        <h3>ID: {character.id}</h3>
      </div>
      <img src={character.image} alt='' />
    </div>
  );
}

export default Detail;
