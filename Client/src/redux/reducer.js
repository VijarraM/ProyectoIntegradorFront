const initialState = {
  myFavorites: [],
  allCharacters: [],
};
// removeFav: (state, action) => {
//   const newCharacters = state.characters.filter((char) => char.id !== action.payload);
//   const newFavorites = state.myFavorites.filter((char) => char.id !== action.payload);
//   return { ...state, characters: newCharacters, myFavorites: newFavorites };
// },
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_FAV':
      const favFiltered = [...state.myFavorites, payload];
      const newCharacter = [...state.allCharacters, payload];

      return { ...state, myFavorites: favFiltered, allCharacters: newCharacter };

    case 'REMOVE_FAV':
      const filtered = state.myFavorites.filter((char) => char.id !== payload);
      const character = state.allCharacters.filter((char) => char.id !== payload);
      return { ...state, myFavorites: filtered, allCharacters: character };

    case 'FILTER':
      let copy3 = state.allCharacters.filter((char) => {
        if (payload === '#') {
          return state.allCharacters;
        } else {
          return char.gender === payload;
        }
      });
      return { ...state, myFavorites: copy3 };

    case 'ORDER':
      let copy4 = state.myFavorites;
      let order = copy4.sort((a, b) => {
        if (payload === 'A') {
          return a.id - b.id;
        } else if (payload === 'D') {
          return b.id - a.id;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        myFavorites: order,
      };

    default:
      return state;
  }
};

export default rootReducer;
