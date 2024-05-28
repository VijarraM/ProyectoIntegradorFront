import { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar(props) {
  const [character, setCharacter] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setCharacter(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchAndClear();
    }
  };

  const searchAndClear = () => {
    props.onSearch(character);
    setCharacter('');
  };

  return (
    <div className={styles.search}>
      <input
        type='search'
        placeholder='Search ID...'
        value={character}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={searchAndClear}>Search</button>
    </div>
  );
}
