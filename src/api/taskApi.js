import axios from 'axios';

export const fetchToDo = () => {
    return axios.get('https://60ee57a1eb4c0a0017bf43bf.mockapi.io/tasks');
}