import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreator from '../redux/action-creators/actionCreator';

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreator, dispatch);
};

export default useActions;
