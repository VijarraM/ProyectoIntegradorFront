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
  // const EMAIL = '';
  // const PASSWORD = '';

  function login(userData) {
    const { email, password } = userData;
    const URL = 'http://localhost:3001/rickandmorty/login/';
    axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
      const { access } = data;
      setAccess(data);
      access && navigate('/home');
    });
  }

  // function login(userData) {
  //   if (userData.password === PASSWORD && userData.email === EMAIL) {
  //     setAccess(true);
  //     navigate('/home');
  //   }
  // }
  useEffect(() => {
    !access && navigate('/');
  }, [access, navigate]);

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
      {location !== '/' && <Nav onSearch={onSearch} />}
      <Routes>
        <Route path={''} element={<Form login={login} />} />
        <Route
          path={'/home'}
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path={'/about'} element={<About />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
