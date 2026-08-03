import axios from "./axios.customize"

const registerUserApi = (fullName: string, email: string, password: string, phone: string) => {
  const BACKEND_URL = "/api/v1/user/register";
  const data = {
    fullName,
    email,
    password,
    phone
  }
  return axios.post<IBackEndRes<IRegister>>(BACKEND_URL, data)
}
export { registerUserApi }