import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../store/slices/authSlice";
import userImg from "../../assets/images/user.svg"
import "./Profile.css"

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((store)=>store.authSlice.fullname)
  
  const logout = () => {
    dispatch(reset());
    navigate("/login");
  };

  return (
    <section className="profile">
        <h1>Profile</h1>
        <div className="profile__user-container">
          <div className="profile__user-img">
            <img src={userImg} alt="user-img" />
          </div>
          <h3 className="profile__username">{userName}</h3>
          <button className="profile__logout" onClick={logout}>
            Log out
          </button>
        </div>
    </section>
  )
}

export default Profile