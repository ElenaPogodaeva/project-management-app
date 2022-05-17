import React from 'react';
import { useForm } from 'react-hook-form';

type TaskFormValues = {
  taskTitle: string;
  taskDescription: string;
};

type AddTaskFormProps = {
  onSubmit: (data: TaskFormValues) => void;
  onCancel: () => void;
};

const AddTaskForm = ({ onSubmit, onCancel }: AddTaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {errors?.taskTitle && <span className="formError">* task title should be fill</span>}
      <input
        type="text"
        className="formInput"
        {...register('taskTitle', { required: true })}
        placeholder="Enter task title"
        autoComplete="off"
      />
      {errors?.taskDescription && (
        <span className="formError">* task description should be fill</span>
      )}
      <textarea
        className="formText"
        {...register('taskDescription', { required: true })}
        placeholder="Enter task description"
        autoComplete="off"
      />
      <div className="btnWrapper">
        <input className="formBtn" type="submit" value="Submit" />
        <input className="formBtn" type="button" value="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
};

export default AddTaskForm;
