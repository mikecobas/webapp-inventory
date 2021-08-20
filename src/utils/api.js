const API_URL = 'http://localhost:8080'
const DEMO = 'https://saruga.herokuapp.com'

const Api2 = {};

 Api2.request = async (method,methodName, args=null) => {
     let tokenLogged = await localStorage.getItem('token');
    // let dealer = await localStorage.getItem('dealer_access');
    const  token =  methodName === 'authentication' ? "login" : tokenLogged;

    const request = {
        method : method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': token,
            // 'current-dealer': dealer
        }
    };
    if (args){
        request.body = JSON.stringify(args)
    }
   
    return fetch(DEMO + methodName, request).then((res) => {

        switch(res.status){
            case 200: 
                 return res.json();
            case 201: 
                return res.json();
            case 400:
            case 401:
            case 403:
              console.log('No autorizado');
                break;
            default: 
               // console.log(res.status)
        }
    });
};

/**
 * Autenticacion
 * @param {*} args 
 */
 Api2.auth = async (args) => {
    return await Api2.request('POST','/api/auth/login', args);
 }

Api2.getUsers = async (args) => {
    return await Api2.request('GET', '/api/usuarios', args);
}
 
 /**
  * Productos
  */

  Api2.getProducts = async (args) => {
    return Api2.request('GET', '/api/products')
}



 /**
  * Categorias
  */

Api2.getCategories = async (args) => {
     return Api2.request('GET', '/api/categories')
 }


  /**
  * Clientes
  */

Api2.getClients = async (args) => {
    return Api2.request('GET', '/api/clients')
}


Api2.getTransactions = async (start,end) => {
    console.log(start, end)
    return Api2.request('GET',`/api/transaction/?start=${start}&end=${end}`)
}
  export default Api2 