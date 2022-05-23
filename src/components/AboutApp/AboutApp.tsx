import './AboutApp.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const AboutApp = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 200 });
  }, []);

  return (
    <section className="about-app">
      <h1 className="title">About App</h1>
      <div className="about-app__card" data-aos="fade-up">
        <img src="" alt="" className="card-img" />
        <article>
          <h3>Your new project organizer</h3>
          <p className="description">
            A new way to ad your team to the board, add cards with information and have a full view
            of what you have done and has to do
          </p>
        </article>
      </div>
      <div className="about-app__card" data-aos="fade-up">
        <article>
          <h3>Board</h3>
          <p className="description">
            It&apos;s possible to change the name of the column by editing, delete column and move
            them to another position. You can also add as many columns as you need
          </p>
        </article>
        <img src="" alt="" className="card-img" />
      </div>
      <div className="about-app__card" data-aos="fade-up">
        <img src="" alt="" className="card-img" />
        <article>
          <h3>Details</h3>
          <p className="description">
            A drag and drop system is used to move a cards between the columns
          </p>
        </article>
      </div>
    </section>
  );
};

export default AboutApp;
