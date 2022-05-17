import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/hooks';
import './Header.scss';
import CreateBoardModal from '../CreateBoardModal/CreateBoardModal';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();

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

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className={`header ${isSticky ? 'header_sticky' : ''}`}>
        <div className="center-container">
          <NavLink to="/" className="header__btn btn-nav btn-home">
            home
          </NavLink>

          <div>
            <NavLink to="/editprofile" className="header__btn btn-nav">
              edit-profile
            </NavLink>
            <NavLink to="/#" className="header__btn btn-nav" onClick={() => toggleModal()}>
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
        </div>
      </header>
      {isOpen && <CreateBoardModal close={toggleModal} />}
    </>
  );
};

export default Header;
