import styles from "./Form.module.css";
import React, { useState } from "react";
import validation from "./validation";

function Form(props) {
  const { login } = props;
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors(validation({ ...userData, [name]: value }));
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <h2>Bienvenido!</h2>
      <div className='inputEmail'>
        <label htmlFor=''>Email:</label>
        <input
          type='text'
          name='email'
          value={userData.email}
          onChange={handleChange}
        />
        <br />
        {errors.e1 ? (
          <span>{errors.e1}</span>
        ) : errors.e2 ? (
          <span>{errors.e2}</span>
        ) : (
          <span>{errors.e3}</span>
        )}
      </div>

      <br />
      <div>
        <label htmlFor=''>Password</label>
        <input
          type='password'
          name='password'
          id=''
          value={userData.password}
          onChange={handleChange}
        />
        <br />
        {errors.p1 ? <span>{errors.p1}</span> : <span>{errors.p2}</span>}
      </div>

      <button type='submit'>Login</button>
    </form>
  );
}

export default Form;
