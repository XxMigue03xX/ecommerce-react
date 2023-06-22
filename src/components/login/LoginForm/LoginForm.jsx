import { useId } from "react";
import { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const nameId = useId();
  const passwordId = useId();

  const [formData, setFormData] = useState({ email: "", password: ""});

  const handleChange = (e) => {
    // Obtenemos el nombre y valor del input
    const { name, value } = e.target;

    // Clonamos el objeto que contiene email y password
    // Creamos una propiedad llamada como el input y con el valor del input. De este modo se sobrescribe el valor de la propiedad, se actualiza
    const newFormData = {...formData, [name]: value};
    setFormData(newFormData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!formData.email || !formData.password) return;
    else onLogin(formData);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-label">
        <label htmlFor={nameId}>Email</label>
      </div>
      <input
        className="email-input"
        onChange={handleChange}
        type="email"
        value={formData.email}
        id={nameId}
        name="email"
        required
      />
      <div className="login-label">
        <label htmlFor={passwordId}>Password</label>
      </div>
      <div className="password">
        <input
          className="password-input"
          onChange={handleChange}
          value={formData.password}
          type={isPasswordVisible ? "" : "password"}
          id={passwordId}
          name="password"
          required
        />
        <button
          className="password-btn"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          type="button"
        >
          <i className="bx bx-low-vision"></i>
        </button>
      </div>
      <button className="login-btn" type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
