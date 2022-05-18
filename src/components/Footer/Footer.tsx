import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__left-container">
        <p>&copy;2022</p>
      </div>
      <div className="footer__center-container">
        <a href="https://github.com/kxzws">Aliona</a>
        <a href="https://github.com/Anastasiya-Poleshuk">Anastasiya</a>
        <a href="https://github.com/ElenaPogodaeva">Elena</a>
      </div>
      <div className="footer__right-container">
        <a href="https://rs.school/react/" className="course-link">
          {' '}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
