import './AboutTeam.scss';

const AboutTeam = () => {
  return (
    <section className="about-team">
      <h1 className="title">Our team</h1>
      <div className="member-card_container">
        <div className="member-card">
          <img src="" alt="member" className="photo" />
          <h2 className="name">Elena</h2>
          <p className="role">back-end developer</p>
          <p className="description">did a lot</p>
        </div>
        <div className="member-card">
          <img src="" alt="member" className="photo" />
          <h2 className="name">Aliona</h2>
          <p className="role">front-end developer</p>
          <p className="description">did a lot</p>
        </div>
        <div className="member-card">
          <img src="" alt="member" className="photo" />
          <h2 className="name">Anastasiya</h2>
          <p className="role">team lead</p>
          <p className="description">did a lot</p>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
