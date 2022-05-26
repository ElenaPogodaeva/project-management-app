import './SignUp.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignUpFormData } from '../../types/interfaces';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchSignUp, fetchSignIn } from '../../redux/thunks/authThunks';
import Loading from '../Loading/Loading';
import { authSlice } from '../../redux/reducers/authSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignUpFormData>();
  const { isLoading, error, isAuth } = useTypedSelector((state) => state.auth);
  const { emptyError } = authSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) navigate('/');
    return () => {
      if (error) dispatch(emptyError());
    };
  }, [isAuth]);

  const onSubmit: SubmitHandler<ISignUpFormData> = (data) => {
    dispatch(fetchSignUp(data));
    const { login, password } = data;
    setTimeout(() => {
      if (isAuth) {
        dispatch(fetchSignIn({ login, password }));
      }
    }, 500);
    reset();
  };

  return (
    <section className="signup-form">
      <div className="center-container">
        {isLoading ? <Loading /> : null}
        <form action="#" className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form-title">Registration</h2>
          <input
            className={`form-input input-text ${errors.login ? 'input-error' : null}`}
            placeholder="Name"
            {...register('name', { required: true, minLength: 3 })}
          />
          <p className={`form-error ${errors.login ? null : 'none'}`}>
            *Required field of at least three characters
          </p>

          <input
            className={`form-input input-text ${errors.login ? 'input-error' : null}`}
            placeholder="Login"
            {...register('login', { required: true, minLength: 3 })}
          />
          <p className={`form-error ${errors.login ? null : 'none'}`}>
            *Required field of at least three characters
          </p>

          <input
            type="password"
            className={`form-input input-text ${errors.password ? 'input-error' : null}`}
            placeholder="Password"
            {...register('password', { required: true, minLength: 4 })}
          />
          <p className={`form-error ${errors.password ? null : 'none'}`}>
            *Required field of at least four characters
          </p>

          {error && <p className="form-error">Probably user is already exist</p>}

          <button type="submit" className="btn-submit">
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
