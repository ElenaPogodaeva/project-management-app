import { useState } from 'react';
import './Welcome.scss';
import AboutTeam from '../../components/AboutTeam/AboutTeam';
import AboutApp from '../../components/AboutApp/AboutApp';

const Welcome = () => {
  const [isAboutApp, setIsAboutApp] = useState(true);
  return (
    <>
      <section className="welcome">
        <div className="">
          <h1 className="title">Welcome to Goodie!</h1>
          <p>something interesting and useful text about application</p>
        </div>
        <img src="" alt="something great" className="welcome-img" />
      </section>
      <div className="links-box">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setIsAboutApp(false);
          }}
        >
          About team
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setIsAboutApp(true);
          }}
        >
          About app
        </button>
      </div>
      <div className="">{isAboutApp ? <AboutApp /> : <AboutTeam />}</div>
    </>
  );
};

export default Welcome;
