import jwtDecode from 'jwt-decode';

const tokenKey = 'token';

const saveToken = token => window.localStorage.setItem(tokenKey, token);
const getToken = () => window.localStorage.getItem(tokenKey);
const removeToken = () => window.localStorage.removeItem(tokenKey);
const getDecodedToken = () => jwtDecode(getToken());

export {
  saveToken, getToken, removeToken, getDecodedToken,
};
