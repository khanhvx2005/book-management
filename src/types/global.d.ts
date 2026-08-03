export { };
declare global {
  interface IBackEndRes<T> {
    statusCode: number | string,
    message: string,
    error?: string | string[]
    data?: T
  }
  interface IRegister {
    _id: string,
    email: string,
    fullName: string
  }
}