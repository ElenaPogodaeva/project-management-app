import './Header.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAppDispatch from '../../hooks/useAppDispatch';
import useTypedSelector from '../../hooks/useTypedSelector';
import { authSlice } from '../../redux/reducers/authSlice';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { logout } = authSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      }
      if (window.scrollY < 11) {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isSticky ? 'header_sticky' : ''}`}>
      <div className="center-container">
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
                dispatch(logout());
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
      </div>
    </header>
  );
};

export default Header;
