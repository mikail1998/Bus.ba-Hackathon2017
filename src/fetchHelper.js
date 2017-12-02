import Notification from './notifications';


async function fetchWrapper(url, method, params, path) {

        url = "http://10.0.0.28:80/" + url;

    let options = {
        method: method,
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
        }    };

    if (options.method === 'GET' && params) {
        url += '?';
        for (let key in params) {
            if (params[key] !== undefined && params[key] !== null)
                url += key + '=' + params[key] + '&';
        }
        if (url.length !== 0)
            url = url.substring(0, url.length - 1);

    } else if ((method === 'POST' || method === 'PUT') && params) {
        options.body = JSON.stringify(params);
    }

    let output;
    try {
        console.log(url);
        const response = await fetch(url, options);
        switch (response.status) {
            case 200:
                output = await response.json();
                break;
            case 401:
                if (response.url.indexOf('/users/profile') === -1)
                    Notification.show({type: 2, title: 'Unauthorized access', message: 'Wrong username or password'}, 401);
                break;
            case 403:
                Notification.show({
                    type: 2,
                    title: 'Access denied',
                    message: 'You are not allowed to access this action.'
                }, 403);
                break;
            case 400:
                const errors = await response.json();
                if (errors.map) {
                    errors.map(x => Notification.show({
                        type: 2,
                        title: 'Bad request',
                        message: (x.message + ' [' + x.code + ']')
                    }, 400));

                } else {
                    Notification.show({
                        type: 2,
                        message: errors.message
                    }, 400);
                }
                break;
            default:
                Notification.show({
                    type: 3,
                    title: 'Error occurs',
                    message: 'Error on the server, please contact system administrator'
                }, 500);
                break;
        }
    } catch (ex) {
        if(!process.env.REACT_APP_TEST)
             console.error(ex);

        Notification.show({
            type: 3,
            title: 'Error occurs',
            message: 'Error on the server, please contact system administrator'
        }, 500);
    } finally {
        // await store.dispatch(hideLoader());
        return output;
    }
}

async function get(url, params, path=true) {
    return fetchWrapper(url, 'GET', params, path);
}

async function post(url, data, path=true) {
    return fetchWrapper(url, 'POST', data, path);
}

async function put(url, params, path=true) {
    return fetchWrapper(url, 'PUT', params, path);
}

let Http = {
    get,
    post,
    put
};


export default Http;