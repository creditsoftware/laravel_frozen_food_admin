import { useSelector } from "react-redux";
const api = async (endpoint, payload) => {
    const res = await fetch(_URL(endpoint), {
        method: payload ? 'POST' : 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '5R3412K7ZKX1GFCXHQV7'
        },
        body: payload ? JSON.stringify(payload) : undefined,
    });
    const ret = await res.json();
    return ret;
};
const wordpress_api = async (payload) => {
    let body_data = 'action=label_ajax_request';
    for (let i in payload) {
        body_data += `&${i}=${payload[i]}`
    }
    const res = await fetch('https://picchionisurgelati.it//wp-admin/admin-ajax.php', {
        // const res = await fetch('http://localhost/wordpress/wp-admin/admin-ajax.php',{
        method: payload ? 'POST' : 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: body_data,
    });
    const ret = res.json();
    return ret;
}
const ajax = (endpoint, payload) => api(`ajax/${endpoint}`, payload);
const ajax_save = (endpoint, payload) => {
    return api(`ajax/${endpoint}`, payload);
    // wordpress_api(payload)
}

export const login = (name, password) => api('login', { name, password });
export const dupe = id => ajax(`dupe/${id}`);
export const getProd = code => api(`api/product?code=${code}`);
export const delLabel = id => ajax(`delLabel/${id}`);
export const delProduct = id => ajax(`delProduct/${id}`);
export const active = id => ajax(`active/${id}`);
export const save = label => ajax_save('save', label);
// export const send_data = label => ajax('save', label);
export const updCod = (oldCod, newCod) => ajax('updCod', { oldCod, newCod });
export const wp_save = (label) => wordpress_api(label);
export const getLabelImage = async fname => {
    const res = await fetch(_URL(`uploads/label/${fname}`));
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}

export const upLabelImage = (id, blob, progress) => uploadFile(`ajax/upimg/${id}`, blob, progress);

function uploadFile(url, blob, progress) {
    return new Promise((res, rej) => {
        const req = new XMLHttpRequest();
        req.open('post', url);
        req.upload.addEventListener('progress', e => (e.loaded * 100 / e.total) |> progress);
        req.addEventListener('load', e => {
            if (req.status !== 200) return rej(`HTTP Error: ${req.status}`);
            res(req.response);
        });
        req.send(blob);
    });
}
