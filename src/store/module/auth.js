import api from '../../api/cconversion-frontend'
import router from '../../router'


const state = {
    token: window.localStorage.getItem('e-token'),
    error: "",
    errorStatus: "",
    successStatus: "",
    responseMsg: "",
    test: "",
};

const getters = {
    isLoggedIn: (state) => {
        return !!state.token;
    },
    getMenus: (state) => {
        if(! state.token){
            return [
                {
                    title: 'Authentication', items:[
                        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
                    ]
                }
            ]
        }else{
            return [
                {
                    title: 'Product', items:[
                        {icon:'face', title: 'Product', link: '/currency'},
                    ]
                },
            ]
        }
    },
    getUrl: (state) => {
        return state.url
    },
    getAuthWarning: (state) => {
        if(state.error){
            return state.responseMsg
        }
    },
    getAuthResponse: (state) => {
        if(! state.error){
            return state.responseMsg
        }
    },
    getAuthSigninResponse: (state) => {
        if(state.error){
            return state.responseMsg
        }
    },
};

const actions = {
    async login ({commit}, parameters) {
        const response = await api.login(parameters[0], parameters[1])
        commit('setTest', response)
        if(response.data.error){
            commit('setAuthResponse', response)
            router.push('/signin')
        }else{
            commit('setToken', response)
            window.localStorage.setItem('e-token', response.data.data.users.api_token)
            router.push('/currency')
        }
    },

    setErrorZero({commit}){
        commit('setErrorToZero')
    }
};

const mutations = {
    setToken: (state, response) => {
        if(response == ""){
            state.token = ""
            state.error = 0
            state.successStatus = 200
            state.responseMsg = "You have successfully logged out."
        }else{
            state.token = response.data.data.users.api_token
            // state.url = response.data.data.url
            state.error = response.data.error
            state.successStatus = response.data.statusCode
            state.responseMsg = response.data.message
        }
       
    },
    setTest: (state, response) => {
        state.test = response
    },
    setAuthResponse: (state, response) => {
        state.test = response.data
        state.error = response.data.error
        state.errorStatus = response.data.statusCode
        state.responseMsg = response.data.message
    },
    setErrorToZero: (state) => {
        state.error = 0
        state.responseMsg = ""
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}