import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFound from './views/NotFound/NotFound';
import Main from './views/Main/Main';
import Board from './views/Board/Board';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/board/:boardId" element={<Board />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
