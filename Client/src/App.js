import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/nav/Nav';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';

function App() {
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  // function login(userData) {
  //   const { email, password } = userData;
  //   const URL = 'http://localhost:3001/rickandmorty/login';
  //   axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
  //     const { access: newAccess } = data; // Use a different variable name to avoid conflict
  //     setAccess(newAccess); // Update the state with the new access value
  //     newAccess && navigate('/home'); // Check the newAccess value for navigation
  //   });
  // }

  // login con async await
  const login = async (userData) => {
    const URL = 'http://localhost:3001/rickandmorty/login/';
    try {
      const { email, password } = userData;
      const { data } = await axios(`${URL}?email=${email}&password=${password}`);
      const { access } = data;
      setAccess(access);
      access && navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !access && navigate('/');
  }, [access, navigate]);

  // ... rest of your component code

  const onSearch = (id) => {
    fetch(`http://localhost:3001/rickandmorty/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert('¡No hay personajes con este ID!');
        }
      });
  };

  const onClose = (id) => {
    const filtered = characters.filter((char) => char.id !== id);
    setCharacters(filtered);
  };

  return (
    <div className='App' style={{ padding: '25px' }}>
      {location.pathname !== '/' && <Nav onSearch={onSearch} />}

      <Routes>
        <Route path={''} element={<Form login={login} />} />
        <Route path={'/home'} element={<Cards characters={characters} onClose={onClose} />} />
        <Route path={'/about'} element={<About />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
