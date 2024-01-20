// import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';


const request = async (path: string, init?: RequestInit, baseUrl = `localhost:3006/api/auth/`) => {
    const url = baseUrl + path;
    const token = Cookies.get('access_token');
    let authHeader = {};
  
    if (token) {
      authHeader = {
        Authorization: `Bearer ${token}`,
      };
    }
  
    let config: RequestInit = {
      headers: authHeader,
    };
  
    if (init) {
      config = {
        ...init,
        headers: {
          ...init.headers,
          ...authHeader,
        },
      };
    }
  
    const res = await fetch(url, config);
  
    if (res.status >= 500) {
      throw new Error('Server Error!');
    }
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message);
    }
  
    return data;
};
  
export default request;