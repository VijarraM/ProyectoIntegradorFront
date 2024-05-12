// import { ADD_FAV, REMOVE_FAV } from './actionsTypes';
import axios from "axios";
import { URL_API } from "../config";

export const addFav = (character) => {
  const endpoint = `${URL_API}/fav`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);
      dispatch({
        type: "ADD_FAV",
        payload: data,
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };
};

export const removeFav = (id) => {
  const endpoint = `${URL_API}/fav/?id=${id}`;
  return (dispatch) => {
    axios.delete(endpoint).then(({ data }) => {
      return dispatch({
        type: "REMOVE_FAV",
        payload: data.id,
      });
    });
  };
};

export const filterCards = (gender) => {
  return {
    type: "FILTER",
    payload: gender,
  };
};
export const orderCards = (order) => {
  return {
    type: "ORDER",
    payload: order,
  };
};
