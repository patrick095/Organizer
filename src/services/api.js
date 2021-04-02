import axios from 'axios';

//const BaseURL ='http://localhost:3001' 
const BaseURL = 'https://api-organizer.herokuapp.com'
const Api = axios.create({ baseURL: BaseURL});

export { Api , BaseURL };