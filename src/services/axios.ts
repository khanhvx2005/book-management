import axios from "./axios.customize"

const registerUserApi = (fullName: string, email: string, password: string, phone: string) => {
  const BACKEND_URL = "/api/v1/user/register";

  return axios.post<IBackEndRes<IRegister>>(BACKEND_URL, {
    fullName,
    email,
    password,
    phone
  })
}

const loginUserApi = (username: string, password: string) => {
  const BACKEND_URL = "/api/v1/auth/login";

  return axios.post<IBackEndRes<ILogin>>(BACKEND_URL, { username, password })
}

const fetchAccountApi = () => {
  const BACKEND_URL = "/api/v1/auth/account";

  return axios.get<IBackEndRes<IFetchAccount>>(BACKEND_URL);
}

const logoutApi = () => {
  const BACKEND_URL = "/api/v1/auth/logout";

  return axios.post<IBackEndRes<IRegister>>(BACKEND_URL)
}

const getUsersApi = (current: number, pageSize: number) => {
  const BACKEND_URL = `/api/v1/user?current=${current}&pageSize=${pageSize}`;

  return axios.get<IBackEndRes<IModelPaginate<IUserTable>>>(BACKEND_URL)
}
export { registerUserApi, loginUserApi, fetchAccountApi, logoutApi, getUsersApi }