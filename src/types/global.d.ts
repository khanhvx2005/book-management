export { };
declare global {
  interface IBackEndRes<T> {
    statusCode: number | string,
    message: string,
    error?: string | string[]
    data?: T
  }

  interface IModelPaginate<T> {
    meta: {
      current: number,
      pageSize: number,
      pages: number,
      total: number
    },
    result: T[]
  }
  interface IRegister {
    _id: string,
    email: string,
    fullName: string
  }

  interface ILogin {
    access_token: string,
    user: {
      email: string,
      phone: string,
      fullName: string,
      role: string,
      avatar: string,
      id: string
    }
  }

  interface IUser {
    id: string,
    email: string,
    phone: string,
    fullName: string,
    role: string,
    avatar: string
  }

  interface IFetchAccount {
    user: {
      id: string,
      email: string,
      phone: string,
      fullName: string,
      role: string,
      avatar: string
    }
  }

  interface IUserTable {
    _id: string,
    fullName: string
    email: string,
    phone: string,
    role: string,
    avatar: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
  }
}