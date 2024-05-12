import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/nav/Nav";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import Favorites from "./components/Favorites/Favorites";
import { URL_API } from "./config.js";
import Swal from "sweetalert2";
import Register from "./components/Register/Register.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

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
      const { data } = await axios(
        `${URL}?email=${email}&password=${password}`
      );
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fallo en el inicio de sesión. Por favor, revisa tus credenciales.",
      });
    }
  };

  const onSearch = async (id) => {
    try {
      const response = await fetch(`${URL_API}/character/${id}`);
      const data = await response.json();
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        window.alert("¡No hay personajes con este ID!");
      }
    } catch (error) {
      console.error("Hubo un error al realizar la búsqueda:", error);
    }
  };

  const onClose = (id) => {
    const filtered = characters.filter((char) => char.id !== id);
    setCharacters(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${URL_API}/characters`);
        setCharacters(data.characters);
      } catch (error) {
        console.error("Hubo un error al obtener los personajes:", error);
      }
    };

    fetchData();
  }, []); // [] significa que solo se ejecuta una vez al inicio

  return (
    <div className='App' style={{ padding: "25px" }}>
      <Nav onSearch={onSearch} />
      <Routes>
        <Route
          path={"/"}
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path={"/reg"} element={<Register />} />
        <Route path={"/login"} element={<Form login={login} />} />
        <Route path={"/about"} element={<About />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
