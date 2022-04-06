import axios from "axios";
const url= {
    baseUrl:'restfulapi.dnd-group.net/api',
    url:'/login'
}
const instance=axios.create({
    baseUrl:url.baseUrl,
    headers: {
        "Content-Type":"application/json",
        Accept:"application/json"
    }
});
const api ={
    url:url,
    instance:instance,
    get:instance.get,
    post:instance.post,
    put:instance.put,
    delete:instance.delete,
    patch:instance.patch,
}
export default api;