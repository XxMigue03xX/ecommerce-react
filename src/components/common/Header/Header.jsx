import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { reset } from "../../../store/slices/authSlice";
import "./Header.css"

const Header = ({updateCartVisible}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.authSlice.isLogged);
  
  const userTo = isLogged ? "/profile" : "/login"
  
  const logout = () => {
    dispatch(reset());
    navigate("/login");
  };

  const getClass = ({isActive}) => {
    if(isActive) return "header__navlink header__navlink--active"
    else return "header__navlink"
  }

  const handleCartClick = () => {
    if(isLogged) updateCartVisible();
    else navigate("/login");
  }

  return (
    <header className="header-container">
      <Link style={{textDecoration: "none", color: "unset"}} to="/">
        <h1 className="header__title">e-commerce</h1>
      </Link>
      <nav className="header__list-container">
        <ul className="header__list">
          <li className="header__list__item">
            <NavLink  className={getClass} to={userTo}>
            <i className='bx bx-user'></i>  
            </NavLink>
          </li>
          <li className="header__list__item">
            <NavLink className={getClass} to="/purchases">
            <i className='bx bx-box' ></i>
            </NavLink>
          </li>
          <li className="header__list__item">
              <button onClick={handleCartClick} className="header__list__btn">
                <i className='bx bx-cart' ></i>
              </button>
          </li>
          {isLogged && (
          <li className="header__list__item">
            <button className="header__list__btn" onClick={logout}>
              <i className='bx bx-log-out'></i>
            </button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header