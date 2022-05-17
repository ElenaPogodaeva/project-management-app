import './SignUp.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignUpFormData } from '../../types/interfaces';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchSignUp } from '../../redux/thunks';
import Loading from '../Loading/Loading';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ISignUpFormData>();
  const { isLoading, isAuth } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth]);

  const onSubmit: SubmitHandler<ISignUpFormData> = (data) => {
    const name = String(getValues('name'));
    const login = String(getValues('login'));
    const password = String(getValues('password'));

    dispatch(fetchSignUp({ name, login, password }));
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

          <button type="submit" className="btn-submit">
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
