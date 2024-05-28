import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/nav/Nav';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import { URL_API } from './config.js';
import Swal from 'sweetalert2';
import Register from './components/Register/Register.jsx';
import NotFound from './components/NotFound/NotFound.jsx';

function App() {
  const navigate = useNavigate();
  const location = useLocation(); // Obtén la ubicación actual
  const [characters, setCharacters] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [access, setAccess] = useState(false);
  const [nameInicial, setNameInicial] = useState('');

  const login = async (userData) => {
    const URL = `${URL_API}/login/`;
    try {
      const { email, password } = userData;
      const { data } = await axios(`${URL}?email=${email}&password=${password}`);
      const { access, nameInicial } = data;
      setAccess(access);
      if (access) {
        setNameInicial(nameInicial);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fallo en el inicio de sesión. Por favor, revisa tus credenciales.',
      });
    }
  };

  const logout = () => {
    setAccess(false);
    setNameInicial('');
    navigate('/login');
  };

  const onSearch = async (id) => {
    try {
      const response = await fetch(`${URL_API}/character/${id}`);
      const data = await response.json();

      if (data.name) {
        setCharacters([data]); // Establece el estado con solo el personaje solicitado
      } else {
        window.alert('¡No hay personajes con este ID!');
      }
    } catch (error) {
      console.error('Hubo un error al realizar la búsqueda:', error);
    }
  };

  const onClose = (id) => {
    const filtered = characters.filter((char) => char.id !== id);
    setCharacters(filtered);
    // Recargar todos los personajes
    fetchData(`${URL_API}/characters`);
  };

  const fetchData = async (url) => {
    try {
      const { data } = await axios.get(url);
      setCharacters(data.characters);
      setPaginationInfo({ next: data.next, prev: data.prev });
    } catch (error) {
      console.error('Hubo un error al obtener los personajes:', error);
    }
  };

  useEffect(() => {
    fetchData(`${URL_API}/characters`);
  }, []);

  const handleNextClick = () => {
    if (paginationInfo.next) {
      fetchData(paginationInfo.next);
    }
  };

  const handlePreviousClick = () => {
    if (paginationInfo.prev) {
      fetchData(paginationInfo.prev);
    }
  };

  return (
    <div className='App'>
      <Nav onSearch={onSearch} nameInicial={nameInicial} access={access} logout={logout} />
      <Routes>
        <Route path={'/'} element={<Cards characters={characters} onClose={onClose} />} />
        <Route path={'/reg'} element={<Register />} />
        <Route path={'/login'} element={<Form login={login} />} />
        <Route path={'/about'} element={<About />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>

      {/* Renderizar paginación solo en la ruta de inicio */}
      {location.pathname === '/' && paginationInfo && (
        <div className='pagination'>
          {paginationInfo.prev && (
            <Link to='#' onClick={handlePreviousClick}>
              Previous
            </Link>
          )}
          {paginationInfo.next && (
            <Link to='#' onClick={handleNextClick}>
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
