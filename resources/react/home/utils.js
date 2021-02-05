import {inflateRaw} from 'pako/lib/inflate'

export const init = field => window[field] |> atob |> inflateRaw(#, {to: 'string'}) |> JSON.parse;

export const idx = (arr, field) => {
    const ret = {};
    for(const a of arr)
        ret[a[field]] = a;
    return ret;
}


export const strstri = (a,b) => a.toLowerCase().includes(b.toLowerCase());


//Polifyll for Safari
if (!('createImageBitmap' in window))
    window.createImageBitmap = blob => new Promise(res => {
        const img = document.createElement('img');
        img.addEventListener('load', () => res(img));
        img.src = URL.createObjectURL(blob);
    });


export const loadImg = async url => {
    const resp = await fetch(url);
    if (resp.status !== 200) throw `HTTP status code ${resp.status}`;
    const data = await resp.blob();
    return createImageBitmap(data);
};

export const throttle = (fn, wait) => {
    let ctx; let args; let timeout; let
        result;
    let last = 0;

    const call = () => {
        last = +new Date();
        result = fn.apply(ctx, args);
        timeout = null;
    };

    return function throttled(...a) {
        ctx = this;
        args = a;

        const delta = +new Date() - last;

        if (!timeout)
            if (delta >= wait) call();
            else timeout = setTimeout(call, wait - delta);
        return result;
    };
};
