import styles from "./Card.module.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { removeFav, addFav } from "../../redux/actions";

function Card(props) {
  const location = useLocation();

  const { onClose, id, origin, name, status, species, gender, image } = props;

  const characters = useSelector((state) => state.characters);

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.myFavorites);
  const isFav =
    Array.isArray(favorites) && favorites.some((fav) => fav.id === id);

  const handleFavorite = () => {
    if (isFav) {
      dispatch(removeFav(id));
    } else {
      dispatch(addFav(props));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.botones}>
        <button onClick={handleFavorite} className={styles.fav}>
          {isFav ? "❤️" : "🤍"}
        </button>
        {location.pathname !== "/favorites" && (
          <button onClick={() => onClose(id)} className={styles.button}>
            ✖️
          </button>
        )}
      </div>

      <Link to={`/detail/${id}`}>
        <h2 className={styles.name}>{name}</h2>
      </Link>

      <div className={styles.info}>
        <h2>status: {status}</h2>
        <h2>species: {species}</h2>
        <h2>gender: {gender}</h2>
        <h3>origin: {origin}</h3>
      </div>
      <div>
        <img src={image} alt='' />
      </div>
    </div>
  );
}

export default Card;
