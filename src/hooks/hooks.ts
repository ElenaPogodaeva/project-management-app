import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers/reducer';
import { AppDispatch } from '../redux/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
