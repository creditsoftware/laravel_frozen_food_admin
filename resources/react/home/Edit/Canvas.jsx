import { useRef, useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadImg } from '../utils';

import formats from '../store/formats';

const format1 = [
    {
        h: 759, w: 900, x: 230, y: 735,
        title: "Number", prefix: "Numero del Lotto:", suffix: '', uisize: 0.25,
        id: "number", size: 471, lineh: 100,
    },
    {
        h: 788, w: 900, x: 230, y: 760,
        title: "Fao", prefix: "Zona fao:", suffix: '', uisize: 0.25,
        id: "fao", size: 472, lineh: 100,
    },
    {
        h: 815, w: 900, x: 230, y: 778,
        title: "Origin", prefix: "Origine:", suffix: '', uisize: 0.25,
        id: "origin", size: 472, lineh: 100,
    },
    {
        h: 852, w: 900, x: 230, y: 796,
        title: "latin", prefix: "Nome Latino:", suffix: '', uisize: 0.25,
        id: "latin", size: 472, lineh: 100,
    },
    {
        h: 852, w: 900, x: 230, y: 810,
        title: "method", prefix: "M.Pesca:", suffix: '', uisize: 0.25,
        id: "method", size: 472, lineh: 100,
    },
    {
        h: 880, w: 900, x: 230, y: 825,
        title: "expiration", prefix: "Scadenza:", suffix: '', uisize: 0.25,
        id: "expiration", size: 472, lineh: 100,
    },
    {
        h: 880, w: 900, x: 410, y: 825,
        title: "Packed", prefix: "Congelato Il:", suffix: '', uisize: 0.25,
        id: "packed", size: 472, lineh: 100,
    },
    {
        h: 903, w: 900, x: 410, y: 879,
        title: "price", prefix: "Prezzo €/Kg:", suffix: '', uisize: 0.25,
        id: "price", size: 472, lineh: 100,
    },
    {
        h: 933, w: 900, x: 70, y: 735,
        title: "Sizing", prefix: "Pezzatura:", suffix: '', uisize: 0.25,
        id: "sizing", size: 472, lineh: 100,
    },
];

const lbls = Promise.all([0].map(i => loadImg(_URL(`/lbl/${i}.jpg`))));

export default ({label}) => {
    const [[w, h], setWh] = useState([window.innerWidth, window.innerHeight]);
    const productData = useSelector(({detail})=>detail);
    useEffect(() => {
        const onResize = () => {
            const [w, h] = [window.innerWidth, window.innerHeight];
            setWh([w-950, h - 110]);
        };
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return <div><Canvas w={w} h={h} label={label} product={productData.getProd && productData.getProd.product} /></div>;
 };

function Canvas({ w, h, label, product }) {
    const refCanvas = useRef(null);

    const format = useSelector(formats.getById(1));
    const cfg = {label: 0}; //useSelector(s => s.cfg);

    useLayoutEffect(() => { canvasPaint(refCanvas.current, label, format, cfg, product)}, [label, format, cfg, w, h, product]);
    return <canvas id="canvas" ref={refCanvas} width={w} height={h} product={product} />;
}


async function canvasPaint(can, label, format, cfg, product) {


    const ctx = can.getContext('2d');
    const [w, h] = [can.width, can.height];
    const car = w / h;

    const img = (await lbls)[cfg.label];
    const [iw, ih, iar] = [img.width, img.height, img.width / img.height];
    const s = (iar < car) ? h / ih : w / iw;

    const [Ix, Iy, Iw, Ih] = [(w - iw * s) / 2, (h - ih * s) / 2, iw * s, ih * s];4

    ctx.clearRect(0, 0, w, h);
   // console.log('clear');

    ctx.drawImage(img, Ix, Iy, Iw, Ih);


    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    // console.log(product)
    if(product) {
        for (const { id, x, y, w, h, size, lineh, prefix, suffix } of format1) {
            const a = Ix + Iw * (x / 1e3);
            const b = Iy + Ih * (y / 1e3);
            const c = Ix + Iw * (w / 1e3);
            const d = Iy + Ih * (h / 1e3);
            if (cfg.bordi) ctx.rect(a, b, c - a, d - b);
    
            let text = product[id] || '';
            if(id === 'packed' || id === 'expiration' || id === 'sizing' || id === 'price') {
                drawText(ctx, [a, b, c - a, d - b], prefix, size * s, lineh, id, suffix, '');
                drawText(ctx, [a, b + 25, c - a, d - b], text, size * s, lineh, id, suffix, '');
            } else {
                drawText(ctx, [a, b, c - a, d - b], text, size * s, lineh, id, suffix, prefix);
            }
        }
    }
    for (const { id, x, y, w, h, size, lineh, suffix } of format) {

        if(id === 'recipes') continue;

        const a = Ix + Iw * (x / 1e3);
        const b = Iy + Ih * (y / 1e3);
        const c = Ix + Iw * (w / 1e3);
        const d = Iy + Ih * (h / 1e3);
        if (cfg.bordi) ctx.rect(a, b, c - a, d - b);

        let text = label[id] || '';
        if(id === 'ingredients')
            text += " " + (label['recipes'] || '');

        drawText(ctx, [a, b, c - a, d - b], text, size * s, lineh, id, suffix, '');
    }
    ctx.stroke();
}


function drawText(ctx, [x, y, w, h], text, size, lineh, id, suffix, prefix) {
    size = size / 10;
    y += size;
    if(suffix) text += ` ${suffix}`;
    if(prefix !== '') text = `${prefix} ${text}`;
    ctx.font = `${size}px Open Sans`;
    ctx.fillStyle = 'black';

    const splitted = splitText(t => ctx.measureText(t).width, text, w);


    if(id==='ingredients') {
        if(splitted.length > 14) {
             splitted.length = 14;
            ctx.fillStyle = 'red';
        }
    }
    else if(id==='name') {
        if (splitted.length > 2) {
            splitted.length = 2;
            ctx.fillStyle = 'red';
        }
    }
    else if (splitted.length > 1) {
        splitted.length = 1;
        splitted.push('testo troppo lungo');
    }

    for (const s of splitted) {
        ctx.fillText(s, x, y);
        y += size * (lineh / 100);
    }
}


function splitText(measure, text, w) {
    const rows = [];
    let spins = 0;

    let words = text.split(' ');

    let n = 0;
    while (words.length > 0 && n < words.length) {
        const ws = words.slice(0, n + 1);
        const str = ' ' |> ws.join;

        if (measure(str) > w) {
            rows.push(words.slice(0, n).join(' '));
            words = words.slice(n);
            n = 0;
        }
        else
            n++;
        spins++;
        if(spins > 1000) return ['testo troppo lungo'];
    }
    rows.push(words.join(' '));
    return rows;
}
