interface ILoginFormData {
  login: string;
  password: string;
}

interface ISignUpFormData {
  name: string;
  login: string;
  password: string;
}

interface IEditFormData {
  name: string;
  login: string;
  password: string;
}

export type { ILoginFormData, ISignUpFormData, IEditFormData };
