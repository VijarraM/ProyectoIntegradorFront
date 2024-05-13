import styles from "./Register.module.css";
import React, { useState } from "react";
import validation from "../Form/validation";

const Register = () => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    // login(userData);
  };

  return (
    <form className={styles.register} onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className='inputEmail'>
        <label htmlFor=''>Email:</label>
        <input
          type='text'
          name='email'
          // value={userData.email}
          // onChange={handleChange}
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
          // value={userData.password}
          // onChange={handleChange}
        />
        <br />
        {errors.p1 ? <span>{errors.p1}</span> : <span>{errors.p2}</span>}
      </div>

      <button type='submit'>Register Now</button>
    </form>
  );
};

export default Register;
