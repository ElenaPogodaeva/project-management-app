import './EditProfile.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IEditFormData } from '../../types/interfaces';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchDelete, fetchUpdate } from '../../redux/thunks/authThunks';
import Loading from '../Loading/Loading';
import { authSlice } from '../../redux/reducers/authSlice';
import { getUserId } from '../../api/apiService';

const EditProfile = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEditFormData>();
  const { isLoading, error, token, isAuth } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { logout } = authSlice.actions;
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuth) navigate('/');
    if (error) {
      setSuccess(false);
    }
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [isAuth, success, error]);

  const onDelete = () => {
    const userId = getUserId(token as string);
  };

  const onSubmit: SubmitHandler<IEditFormData> = (data) => {
    const userId = getUserId(token as string);
    const authData = {
      userId,
      userData: data,
      token: token as string,
    };

    dispatch(fetchUpdate(authData));
    setSuccess(true);
    reset();
  };

  return (
    <section className="signup-form">
      <div className="center-container">
        {isLoading ? <Loading /> : null}
        <form action="#" className="form" onSubmit={handleSubmit(onSubmit)}>
          {!isLoading && success ? <p className="form-complete">Changes applied</p> : null}
          <h2 className="form-title">Edit profile</h2>
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

          {error ? <p className="form-error">Oops! There is an error</p> : null}

          <button type="submit" className="btn-submit">
            Edit
          </button>

          <button
            type="button"
            className="btn-submit btn-delete"
            onClick={() => {
              onDelete();
            }}
          >
            Delete user
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
