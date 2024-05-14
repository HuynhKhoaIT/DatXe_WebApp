import axios from 'axios';

const axiosInstance = axios.create();

const sendRequest = async (options:any, payload:any, token:any) => {
    const { params = {}, pathParams = {}, data = {} } = payload;
    let { method, baseURL, headers, ignoreAuth } = options;
    if (!ignoreAuth && token) {
        headers.Authorization = `Bearer ${token}`;
    }
    // update path params
    for (let key of Object.keys(pathParams)) {
        const keyCompare = `:${key}`;
        if (baseURL.indexOf(keyCompare) !== -1) {
            baseURL = baseURL.replace(keyCompare, pathParams[key]);
        }
    }

    // handle multipart
    if (options.headers['Content-Type'] === 'multipart/form-data') {
        let formData = new FormData();
        Object.keys(data).map((item) => {
            formData.append(item, data[item]);
        });

        return axios
            .post(options.baseURL, formData, {
                headers: {
                    Authorization: headers.Authorization,
                    'Content-type': 'multipart/form-data',
                },
            })
            .then((res) => {

                console.log(res);
                return { data: res.data };
            })
            .catch((err) => {
                
                console.log(err);
            });
    }
    // ...
    return axiosInstance.request({
        method,
        baseURL,
        headers,
        params,
        data,
    });
};

export { sendRequest };
