import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/login/LoginForm/LoginForm";
import { startSessionThunk } from "../../store/slices/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const Login = () => {
  const isLogged = useSelector((store) => store.authSlice.isLogged);
  const dispatch = useDispatch();
  // Me da información acerca de la ruta, en este caso queremos saber si se le pasó la ruta de procedencia por su propiedad "state"
  // La propiedad state de las rutas permiten pasar info entre rutas
  const location = useLocation();
  const from = location.state?.from;

  const handleLogin = async (loginData) => {
    dispatch(startSessionThunk(loginData));
  };

  return (
    <div>
      <section>
        <p>Welcome! Enter your email and password to continue</p>

        <section>
          <h3>Test data</h3>
          <ul>
            <li>
              <en>Email</en>: miguel@gmail.com
            </li>
            <li>
              <en>Password</en>: 2412
            </li>
          </ul>
        </section>

        <LoginForm onLogin={handleLogin}/>
      </section>

      {isLogged && <Navigate to={from ?? "/"}/>}
    </div>
  );
};

export default Login;
