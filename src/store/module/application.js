import api from '../../api/cconversion-frontend'
import router from "../../router";
// import router from '../../router';

const state = {
    error: '',
    statusCode:'',
    errorMsg: '',
    indexData: [],
    thirdHighet: '',
    test: ''
}

const getters = {
    error: (state) =>{
        return state.error
    },
    statusCode: (state) => {
        return state.statusCode
    },
    errorMsg: (state) => {
        return state.errorMsg
    },

    thirdHighet: (state) => {
        return state.thirdHighet
    },
    indexData: (state) => {
        return state.indexData
    },
}

const actions = {

    async setReportData({commit}, parameters) {
        const response = await api.getReportData(parameters[0])
        commit("setResponse", response)
    },

    async setThirdHighest({commit}, parameters){
        const response = await api.fetchThirdHighest(parameters[0], parameters[1])
        commit('setThirdHighestResponse', response)
    },

    async logout({rootState, commit }){
        const{ token } = rootState.auth
        commit('setToken', "")
        window.localStorage.removeItem('e-token')
        window.localStorage.removeItem('url')
        await api.logout(token,'logout')
        router.push('/')
    },

    async setIndexData({rootState, commit}, parameters){
        const{ token } = rootState.auth
        const response = await api.fetchData(token, parameters[0])
        commit('setResponse', response)
    },

    async store({rootState, commit},parameters){
        const { token } = rootState.auth
        const response = await api.storeData(token, parameters[0], parameters[1])
        commit('setResponse', response)
        // router.push('/currency')
    },
    
    setErrorZero({commit}){
        commit('setErrorToZero')
    }
    
}

const mutations = {
    setResponse: (state, responseData) => {
        if(responseData.data.error){
            state.statusCode = responseData.data.statusCode
            state.error = responseData.data.error
            state.errorMsg = responseData.data.message
        }else{
            state.error = responseData.data.error
            state.statusCode = responseData.data.statusCode
            state.errorMsg = responseData.data.message
            state.indexData = responseData.data.data
        }
    },

    setThirdHighestResponse: (state, responseData) => {
        if(responseData.data.error){
            state.thirdHighet = ""
        }else{
            state.thirdHighet = responseData.data.data.third_highest_amount_for_receiver
        }
    },

    setErrorToZero: (state) => {
        state.error = 0
        state.responseMsg = ""
    },
    setTest: (state, credentials) => {
        state.test = credentials
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}