import { LOCALHOST_URL } from '../constants';
import axios from 'axios';

const Method: any = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

/**
 * 
 */
class ApiCalls {
    static call(method: string | undefined, successCallback: () => any , id?: number, data?: any) {
        const url = LOCALHOST_URL + (id ? `/${id}` : '');
        axios({
            method: method,
            url,
            data
        })
        .then(successCallback)
        .catch(this._errorCall);
    }

    static _errorCall(error: Error) {
        console.log('ERROR::', error);
    }
}

export { ApiCalls, Method };