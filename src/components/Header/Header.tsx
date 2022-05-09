import { NavLink } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import useTypedSelector from '../../hooks/useTypedSelector';
import './Header.scss';

const Header = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();

  return (
    <header className="header">
      <NavLink to="/" className="header__btn btn-nav btn-home">
        home
      </NavLink>

      <div>
        <NavLink to="/editprofile" className="header__btn btn-nav">
          edit-profile
        </NavLink>
        <NavLink to="/#" className="header__btn btn-nav">
          new-board
        </NavLink>
      </div>

      <div>
        <select className="header__select">
          <option value="en">en</option>
          <option value="ru">ru</option>
        </select>
        {isAuth ? (
          <button
            type="button"
            className="header__btn"
            onClick={() => {
              logout();
            }}
          >
            log-out
          </button>
        ) : (
          <>
            <NavLink to="/login" className="header__btn btn-nav">
              sign-in
            </NavLink>
            <NavLink to="/signup" className="header__btn btn-nav">
              sign-up
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
