const API_URL = 'http://localhost:8080'
// const DEMO = 'https://saruga.herokuapp.com'

const Api2 = {};

 Api2.request = async (method, methodName, args=null, isForData=false) => {
     let tokenLogged = await localStorage.getItem('token');
    const  token =  methodName === '/api/auth/login' ? "login" : tokenLogged;
     const headers = {
         'x-token': token,
         'Accept': 'application/json',
     }
     !isForData && Object.assign(headers, {'Content-Type': 'application/json'})
    const request = {
        method: method,
        headers
    };

     
    if (args){
        request.body = isForData ? args : JSON.stringify(args)
        // if (isForData) {
        //     request.files = args
        // }
    }
   
    return fetch(API_URL + methodName, request).then((res) => {

        switch(res.status){
            case 200: 
                 return res.json();
            case 201: 
                return res.json();
            case 400:
            case 401:
            case 403:
            
              return res.json()
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

Api2.getUsers = async () => {
    return await Api2.request('GET', '/api/usuarios');
}
 
 /**
  * Productos
  */

  Api2.getProducts = async () => {
    return Api2.request('GET', '/api/products')
}



 /**
  * Categorias
  */

Api2.getCategories = async () => {
     return Api2.request('GET', '/api/categories')
 }


  /**
  * Clientes
  */

Api2.getClients = async () => {
    return Api2.request('GET', '/api/clients')
}

Api2.postProduct = async (args) => {
    return Api2.request('POST', '/api/products', args)
}

Api2.deleteProduct = async (id) => {
    return Api2.request('DELETE', `/api/products/${id}`)
}


/**
 * IMAGENES
 * 
 */

Api2.getImage = async (collection, id) => {
    return Api2.request('GET', `/api/uploads/${collection}/${id}`)
}
// CARGA DE IMAGEN
Api2.uploadImage = async (args) => {
    console.log('API file:' , args.get('file'))
    return Api2.request('post', '/api/uploads/', args, true)
}
//Actualizacion
Api2.updateImage = async (collection, id, args) => {
    return Api2.request('PUT', `/api/uploads/${collection}/${id}`, args, true)
}

Api2.deleteImage = async (id) => {
    return Api2.request('DELETE', `/api/uploads/${id}`)
}




/**
 * TRANSACCIONES
 * @param {*} start 
 * @param {*} end 
 * @returns 
 */

Api2.getTransactions = async (start,end) => {
    console.log(start, end)
    return Api2.request('GET',`/api/transaction/?start=${start}&end=${end}`)
}



  export default Api2 