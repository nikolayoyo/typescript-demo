import { LOCALHOST_URL } from './constants'

import axios from 'axios'

const Method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

class ApiCalls {
    static call(method, successCallback, id, data) {
        const url = LOCALHOST_URL + (id ? `/${id}` : '');
        axios({
            method: method,
            url,
            data
        })
        .then(successCallback)
        .catch(this._errorCall);
    }

    static _errorCall(error) {
        console.log('ERROR::', error);
    }
}

export { ApiCalls, Method };