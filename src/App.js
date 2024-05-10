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
import { URL_API } from './config.js';
import Swal from 'sweetalert2';

function App() {
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  // login con async await
  const login = async (userData) => {
    const URL = `${URL_API}/login/`;
    try {
      const { email, password } = userData;
      const { data } = await axios(`${URL}?email=${email}&password=${password}`);
      const { access } = data;
      setAccess(access);
      access && navigate('/home');
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fallo en el inicio de sesión. Por favor, revisa tus credenciales.',
      });
    }
  };

  useEffect(() => {
    !access && navigate('/');
  }, [access, navigate]);

  // ... rest of your component code

  const onSearch = (id) => {
    fetch(`${URL_API}/character/${id}`)
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
