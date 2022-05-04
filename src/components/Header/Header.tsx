import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <p className="home">home</p>
      <div className="">
        <p className="edit-profile">edit-profile</p>
        <p className="new-board">new-board</p>
      </div>
      <div>
        <select className="language">
          <option value="en">en</option>
          <option value="ru">ru</option>
        </select>
        <button type="button" className="login">
          login
        </button>
        <button type="button" className="sign-up">
          sign-up
        </button>
      </div>
    </header>
  );
};

export default Header;
