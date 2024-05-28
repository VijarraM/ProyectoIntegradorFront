import styles from './Register.module.css';
import React, { useState } from 'react';
import validation from '../Form/validation';
import axios from 'axios';
import { URL_API } from '../../config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    register(userData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors(validation({ ...userData, [name]: value }));
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const register = async (userData) => {
    try {
      const { email, password, name } = userData;
      const response = await axios.post(`${URL_API}/reg`, { email, password, name });
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Registrado...',
          text: 'Seras redirigido al login para ingresar tus credenciales',
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Fallo en el registro. Por favor, revisa tus credenciales.',
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data}`,
      });
    }
  };

  return (
    <form className={styles.register} onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className='inputName'>
        <label htmlFor=''>Name:</label>
        <input type='text' name='name' value={userData.name} onChange={handleChange} />
        <br />
        {/* {errors.e1 ? <span>{errors.e1}</span> : errors.e2 ? <span>{errors.e2}</span> : <span>{errors.e3}</span>} */}
      </div>

      <br />
      <div className='inputEmail'>
        <label htmlFor=''>Email:</label>
        <input type='text' name='email' value={userData.email} onChange={handleChange} />
        <br />
        {errors.e1 ? <span>{errors.e1}</span> : errors.e2 ? <span>{errors.e2}</span> : <span>{errors.e3}</span>}
      </div>

      <br />
      <div>
        <label htmlFor=''>Password</label>
        <input type='password' name='password' id='' value={userData.password} onChange={handleChange} />
        <br />
        {errors.p1 ? <span>{errors.p1}</span> : <span>{errors.p2}</span>}
      </div>

      <button type='submit'>Register Now</button>
    </form>
  );
};

export default Register;
