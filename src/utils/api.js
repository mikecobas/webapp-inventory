import moment from 'moment'
const API_URL = 'http://localhost:8080'
// const DEMO = 'https://saruga.herokuapp.com'


const Api2 = {};

Api2.request = async (method, methodName, args = null, isForData = false, file=false, fileName=null) => {
    let tokenLogged = await localStorage.getItem('token');
    const token = methodName === '/api/auth/login' ? "login" : tokenLogged;
    const headers = {
        'x-token': token,
        'Accept': 'application/json',
    }
    !isForData && Object.assign(headers, { 'Content-Type': 'application/json' })
    const request = {
        method: method,
        headers
    };


    if (args) {
        request.body = isForData ? args : JSON.stringify(args)
        // if (isForData) {
        //     request.files = args
        // }
    }
    if (!file) {
        return fetch(API_URL + methodName, request).then((res) => {

            switch (res.status) {
                case 200:
                    return res.json();
                    break;
                case 201:
                    return res.json();
                    break;
                case 400:
                case 401:
                case 403:
    
                    return res.json()
                    break;
                default:
                // console.log(res.status)
            }
        });
    } else {
        return fetch(API_URL + methodName, request,)
            .then((res) => res.blob())
            .then(blob => {
                const filename = 'Reporte de transacciones'
                const file = window.URL.createObjectURL(blob);
                // window.location.assign(file)
                    const link = document.createElement('a');
                    link.href = file;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
            });
    }

  
};

/**
 * Autenticacion
 * @param {*} args 
 */
Api2.auth = async (args) => {
    return await Api2.request('POST', '/api/auth/login', args);
}

Api2.getUsers = async () => {
    return await Api2.request('GET', '/api/usuarios/');
}

Api2.postUser = async (args) => {
    return await Api2.request('POST', '/api/usuarios/', args)
}

Api2.updateUser = async (id,args) => {
    return await Api2.request('PUT', `/api/usuarios/${id}`, args)
}

Api2.deleteUsers = async (id) => {
    return await Api2.request('DELETE', `/api/usuarios/${id}`)
}
/**
 * Productos
 */

Api2.getProducts = async () => {
    return Api2.request('GET', '/api/products')
}

Api2.postProduct = async (args) => {
    return Api2.request('POST', '/api/products', args)
}

Api2.deleteProduct = async (id) => {
    return Api2.request('DELETE', `/api/products/${id}`)
}



/**
 * Categorias
 */

Api2.getCategories = async () => {
    return Api2.request('GET', '/api/categories')
}

Api2.postLocation = async (args) => {
    return Api2.request('POST', `/api/categories`, args)
}

Api2.deleteCategories = async (id) => {
    return Api2.request('DELETE', `/api/categories/${id}`)
}


/**
* Clientes
*/

Api2.getClients = async () => {
    return Api2.request('GET', '/api/clients')
}

Api2.postClient = async (args) => {
    return Api2.request('POST', `/api/clients/`, args)
}

Api2.deleteClient = async (id) => {
    return Api2.request('DELETE', `/api/clients/${id}`)
}

Api2.updateClient = async (id, args) => {
    return Api2.request('PUT', `/api/clients/${id}`, args)
}

Api2.restoreClient= async (id) => {
    return Api2.request('PUT', `/api/clients/restore/${id}`)
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
    console.log('API file:', args.get('file'))
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

Api2.getTransactions = async (from, to) => {
    const newTo = moment(to, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:ss')
    const newFrom = moment(from, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:ss')
    console.log(from, moment(newTo).format())
    return Api2.request('GET', `/api/transaction/?start=${moment(newFrom).toISOString()}&end=${moment(newTo).toISOString()}`)
}

Api2.downLoadExcel = async (from, to) => {
    const newTo = moment(to, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:ss')
    const newFrom = moment(from, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:ss')
    return Api2.request('GET', `/api/excel/transactions?from=${moment(newFrom).toISOString()}&to=${moment(newTo).toISOString()}`, null, false, true )
}


/**
 * SEARCH
 */

Api2.searchByProducts = async (term) => {
    return Api2.request('GET', `/api/search/products/${term}`)
}

Api2.searchByUsers = async (term) => {
    return Api2.request('GET', `/api/search/users/${term}`)
}

Api2.searchByCompany = async (term) => {
    return Api2.request('GET', `/api/search/companies/${term}`)
}

Api2.searchByClient = async (term) => {
    return Api2.request('GET', `/api/search/clients/${term}`)
}

/**
 * 
 * @returns COMPAÑIAS
 */
Api2.getCompanies = async () => {
    return Api2.request('GET',  `/api/companies` )
}

Api2.getCompanyInfo = async (id) => {

    return Api2.request('GET', `/api/companies/${id}`)
}

Api2.postCompany = async (args) => {
    return Api2.request('POST', `/api/companies/`, args)
}

Api2.deleteCompany = async (id) => {
    return Api2.request('DELETE', `/api/companies/${id}`)
}

Api2.updateCompany= async (id, args) => {
    return Api2.request('PUT', `/api/companies/${id}`, args)
}

Api2.activateCompany= async (id) => {
    return Api2.request('PUT', `/api/companies/active/${id}`)
}



export default Api2