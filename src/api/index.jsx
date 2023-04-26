import ajax from './ajax'
export const reqLogin = (username, password) => ajax('/api1/login',{username,password},"POST")
export const reqAddUser = (user) => ajax('/api1/manage/user/add', user, "POST")

