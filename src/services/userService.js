import api from './api';
const login=(username,password) => {
const data={username:username,password:password}
//console.log(api.url.login);
return api.post(api.url.login,data,result => result.data);
}
const userService= {
    login
}
export default userService;