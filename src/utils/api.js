import moment from 'moment'
// const API_URL = 'http://localhost:8080'
// const DEMO = 'https://saruga.herokuapp.com'


const Api2 = {};

Api2.request = async (method, methodName, args = null, isForData = false, file = false, fileName = null) => {
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
        return fetch(process.env.REACT_APP_API_URL + methodName, request).then((res) => {

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
        return fetch(process.env.REACT_APP_API_URL + methodName, request,)
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

Api2.updateUser = async (id, args) => {
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

Api2.updateProduct = async (id,args) => {
    return Api2.request('PUT', `/api/products/${id}`, args)
}

Api2.restoreProduct = async (id,args) => {
    return Api2.request('PUT', `/api/products/restore/${id}`)
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

Api2.postCategory = async (args) => {
    return Api2.request('POST', `/api/categories`, args)
}

Api2.updateCategory = async (id, args) => {
    return Api2.request('PUT', `/api/categories/${id}`, args)
}

Api2.restoreCategory = async (id) => {
    return Api2.request('PUT', `/api/categories/restore/${id}`)
}

Api2.deleteCategory = async (id) => {
    return Api2.request('DELETE', `/api/categories/${id}`)
}


/**
 * Ubicaciones
 */

Api2.getLocations = async () => {
    return Api2.request('GET', '/api/locations')
}

Api2.postLocation = async (args) => {
    return Api2.request('POST', `/api/locations`, args)
}

Api2.updateLocation = async (id, args) => {
    return Api2.request('PUT', `/api/locations/${id}`, args)
}

Api2.restoreLocation = async (id) => {
    return Api2.request('PUT', `/api/locations/recover/${id}`)
}

Api2.deleteLocation = async (id) => {
    return Api2.request('DELETE', `/api/locations/${id}`)
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

Api2.restoreClient = async (id) => {
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
    const newTo = moment(to, 'DD-MM-YYYY').format('YYYY-MM-DD') + 'T23:59:59.000Z';
    const newFrom = moment(from, 'DD-MM-YYYY').format('YYYY-MM-DD') + 'T00:00:00.000Z';
    return Api2.request('GET', `/api/transaction/?start=${moment(newFrom).toISOString()}&end=${moment(newTo).toISOString()}`)
}

Api2.postTransactions = async (args) => {

    return Api2.request('POST', `/api/transaction`, args)
}

Api2.downLoadExcel = async (from, to) => {
    const newTo = moment(to, 'DD-MM-YYYY').format('YYYY-MM-DD') + 'T23:59:59.000Z';
    const newFrom = moment(from, 'DD-MM-YYYY').format('YYYY-MM-DD') + 'T00:00:00.000Z';
    const args = {
        from: moment(newFrom).toISOString(),
        to: moment(newTo).toISOString(),
        client: '6130eccb46c15743c31c6949'
    }
    return Api2.request('POST', `/api/excel/transactions`, args, false, true)
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
Api2.searchByLocations = async (term) => {
    return Api2.request('GET', `/api/search/locations/${term}`)
}

/**
 * 
 * @returns COMPAÑIAS
 */
Api2.getCompanies = async () => {
    return Api2.request('GET', `/api/companies`)
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

Api2.updateCompany = async (id, args) => {
    return Api2.request('PUT', `/api/companies/${id}`, args)
}

Api2.activateCompany = async (id) => {
    return Api2.request('PUT', `/api/companies/active/${id}`)
}


/**
 * Dashboard
 */

Api2.getDasboard = async () => {
    return Api2.request('GET', '/api/dashboard')
}

Api2.getDashboardTransactions = async () => {
    return Api2.request('GET','/api/dashboard/transactions')
}

Api2.getDashboardProductsByClients= async () => {
    return Api2.request('GET','/api/dashboard/products-by-clients')
}



export default Api2