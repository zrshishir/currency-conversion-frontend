import axios from 'axios'

//write your laravel project url like local.cconversion.com or localhost url
const ROOT_URL = 'http://local.cconversion.com/api';


export default{
    
    login(secondUrl, loginCredentials){
        return axios.post(`${ROOT_URL}/${secondUrl}`, loginCredentials,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },

    getReportData(apiUrl){
        return axios.get(`${ROOT_URL}/${apiUrl}`,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    },

    fetchThirdHighest(apiUrl, receiverId){
        return axios.get(`${ROOT_URL}/${apiUrl}/${receiverId}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    storeData(token, secondUrl, storeData){
        return axios.post(`${ROOT_URL}/${secondUrl}`, storeData,{
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },

    logout(token, secondUrl){
        return axios.get(`${ROOT_URL}/${secondUrl}`,{
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },
}