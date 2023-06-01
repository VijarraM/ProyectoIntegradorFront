import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  // const {onSearch} = props;
  const [character, setCharacter] = useState("");
  const handleInputChange = (event) => {
    const { value } = event.target;
    setCharacter(value);
  };
  return (
    <div className={styles.search}>
      <input
        type='search'
        placeholder='Buscar ID'
        onChange={handleInputChange}
      />
      <button onClick={() => props.onSearch(character)}>Agregar</button>
    </div>
  );
}
