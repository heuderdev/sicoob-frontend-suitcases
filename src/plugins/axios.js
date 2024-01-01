import axios from "axios"
import { useCookies } from '@vueuse/integrations/useCookies';
const cookies = useCookies(['token']);
const token = cookies.get('token')

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    return Promise.reject(error)
})
axios.defaults.baseURL = "http://localhost:3001/v1"