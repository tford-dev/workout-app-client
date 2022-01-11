import {api} from './reducer';

//GET request to retrieve user data
export const getUser = async(emailAddress, password) => {
    const response = await api(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 401) {
        return response.json().then(data => {
            console.log(response);
            console.log(data.message)
            //return data.message;
            throw new Error("Sign-in was unsuccessful, please enter valid data.");
        })
    } else if (response.status === 200) {
        console.log(response);
        return response.json().then(data => data)
    } else {
        throw new Error();
    }
}

//POST request to create user
const createUser = async(user) => {
    const response = await api('/users', 'POST', user);
    if (response.status === 201) {
        return [];
    }
    else if (response.status === 400) {
        return response.json().then(data => {
            return data.message;
        });
    }
    else {
        throw new Error();
    }
}

export const UserRequests = {
    getUser, createUser
}