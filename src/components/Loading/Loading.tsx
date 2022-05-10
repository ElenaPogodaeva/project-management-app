import './Loading.scss';
import loading from '../../assets/spinner.gif';

const Loading = () => {
  return <img data-testid="loading" src={loading} alt="gif: loading" className="loading" />;
};

export default Loading;
