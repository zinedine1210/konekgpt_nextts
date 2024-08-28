import { setCookies } from "@@/app/actions";
import axios from "axios"
let protocol = '';
let host = '';
let port = '';
let finalHostname = '';
let finalBaseDomainAPI = ''

if (typeof window === 'object') {
    // Jika dijalankan di lingkungan browser
    protocol = window.location.protocol;
    port = window.location.port
    host = window.location.hostname;
    finalHostname = `${protocol}//${host}:${port}`
    finalBaseDomainAPI = `${finalHostname}/api`
} else {
    port = process.env.PORT ?? ''
    protocol = process.env.PROTOCOL ?? ''
    host = process.env.HOST ?? ''
    finalHostname = `${protocol}://${host}:${port}`
    finalBaseDomainAPI = `${finalHostname}/api`
}
const baseURL = process.env.BASE_API_URL ?? finalBaseDomainAPI;

export const tryLogin = async (payload: any) => {
    const result = await axios.post(`${baseURL}/auth/login`, payload)
    const responseData = result.data
    console.log(result)
    if(responseData.success){
        if(responseData.data.access_token){
            setCookies('auth_token', responseData.data.access_token)
        }
        const clientMenus = await axios.get(`http://localhost:3000/client_menus.json`)
        localStorage.setItem('client_menus', JSON.stringify(clientMenus.data))
    }
    return responseData
}

export const tryLogout = async () => {
    const result = await axios.post(`${baseURL}/auth/logout`, {})
    const responseData = result.data
    return responseData
}

export const getOrg = async () => {
    const result = await axios.get(`${baseURL}/root/org`)
    const responseData = result.data
    return responseData
}

export const getTraining = async () => {
    const result = await axios.get(`${baseURL}/data/knowledge/training`)
    const responseData = result.data
    return responseData
}