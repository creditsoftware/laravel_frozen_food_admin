import { useRef, useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadImg } from '../utils';

import formats from '../store/formats';

const format1 = [
    {
        h: 759, w: 900, x: 230, y: 735,
        title: "Number", prefix: "No LOTTO:", suffix: '', uisize: 0.25,
        id: "number", size: 471, lineh: 100,
    },
    {
        h: 788, w: 900, x: 230, y: 756,
        title: "Fao", prefix: "ZONA FAO:", suffix: '', uisize: 0.25,
        id: "fao", size: 472, lineh: 100,
    },
    {
        h: 815, w: 900, x: 230, y: 783,
        title: "Origin", prefix: "Origine:", suffix: '', uisize: 0.25,
        id: "origin", size: 472, lineh: 100,
    },
    {
        h: 852, w: 900, x: 230, y: 800,
        title: "latin", prefix: "Nome Latino:", suffix: '', uisize: 0.25,
        id: "latin", size: 472, lineh: 100,
    },
    {
        h: 852, w: 900, x: 230, y: 815,
        title: "method", prefix: "M.Pesca:", suffix: '', uisize: 0.25,
        id: "method", size: 472, lineh: 100,
    },
    {
        h: 880, w: 900, x: 230, y: 845,
        title: "expiration", prefix: "Scadenza:", suffix: '', uisize: 0.25,
        id: "expiration", size: 472, lineh: 100,
    },
    {
        h: 880, w: 900, x: 410, y: 845,
        title: "Packed", prefix: "Congelato Il:", suffix: '', uisize: 0.25,
        id: "packed", size: 472, lineh: 100,
    },
    {
        h: 903, w: 900, x: 410, y: 884,
        title: "price", prefix: "Prezzo €/Kg:", suffix: '', uisize: 0.25,
        id: "price", size: 472, lineh: 100,
    },
    {
        h: 903, w: 900, x: 230, y: 884,
        title: "total_price", prefix: "", suffix: '€', uisize: 0.25,
        id: "total_price", size: 1000, lineh: 100,
    },
    {
        h: 933, w: 900, x: 70, y: 735,
        title: "glazing", prefix: "Glassatura:", suffix: '%', uisize: 0.25,
        id: "glazing", size: 472, lineh: 100,
    },
    {
        h: 933, w: 900, x: 70, y: 785,
        title: "Sizing", prefix: "Pezzatura:", suffix: '', uisize: 0.25,
        id: "sizing", size: 472, lineh: 100,
    },
    {
        h: 933, w: 900, x: 70, y: 835,
        title: "Updated_at", prefix: "", suffix: '', uisize: 0.25,
        id: "updated_at", size: 472, lineh: 100,
    },
];

const faos = {
    '18': 'Mare Artico',
    '21': 'Oceano Atlantico\n Nord-Occidentale',
    '27': 'Oceano Atlantico\n Nord-Orientale',
    '31': 'Oceano Atlantico\n Centro-Occidentale',
    '34': 'Oceano Atlantico\n Centro-Orientale',
    '37': 'Mar Mediterraneo\n e Mar Nero',
    '41': 'Oceano Atlantico\n Sud-Occidentale',
    '47': 'Oceano Atlantico\n Sud-Orientale',
    '48': 'Oceano Atlantico\n-Antartico',
    '51': 'Oceano Indiano\n Occidentale',
    '57': 'Oceano Indiano\n Orientale',
    '58': 'Oceano Indiano\n Antartico',
    '61': 'Oceano Pacifico\n Nord-Occidentale',
    '67': 'Oceano Pacifico\n Nord-Orientale',
    '71': 'Oceano Pacifico\n Centro-Occidentale',
    '77': 'Oceano Pacifico\n centro-Orientale',
    '81': 'Oceano Pacifico\n Sud-occidentale',
    '87': 'Oceano Pacifico\n Sud-Orientale',
    '88': 'Oceano Pacifico\n Antartico',
    '7': 'Allevato nello\n Stabilmento',
    '8': 'Pescato nelle\n acque del lago',
    '9': 'Pescato nelle\n acque del fiume',
    '1': 'Verdure coltivate\n e raccolto',
    '2': 'Carne Allevata e \nMacella',
    '3': 'Prodotto elaborato\n mello stabilimento',
    '13': 'Vedi etichetta\n descrittiba',
    '3711': 'Baleari',
    '3712': 'Golfo del Leone',
    '3713': 'Mar di Sardegna',
    '3721': 'Mar Adriatico',
    '3722': 'Mar Ionio',
    '3731': 'Mar Egeo',
    '3732': 'Levante',
    '3741': 'Mar di Marmara',
    '3742': 'Mar Nero',
    '3743': 'Mar di Azov',
    '271': 'Mare di Barents',
    '272': 'Mar di Norvegia',
    '273': 'Mar Baltico',
    '274': 'Mare del Nord',
    '275': 'Fondali Islanda',
    '276': 'Rockall-Costa nord\n-occ Scozia',
    '277': 'Mar d\'Irlanda',
    '278': 'Golfo di Biscaglia',
    '279': 'Acque Portoghesi',
    '2710': 'Fondali delle \nAzzorre',
    '2712': 'Fondali a Nord delle\n Azzorre',
    '2714': 'Fondali ad est della\n Groenlandia'
}

const methods = {
    '100': 'Sciabiche',
    '101': 'Redi da Traino',
    '102': 'Reti da Imbrocco e\n Analoghe',
    '103': 'Reti da Circuizione \ne Raccolta',
    '104': 'Ami e Palangai',
    '105': 'Draghe',
    '106': 'Nasse e Trappole',
    '107': 'Pesca Estrattiva',
    '108': 'Vedi Etichetta \nDescrittiva',
    '109': 'Allevato'
}

const lbls = Promise.all([0].map(i => loadImg(_URL(`/lbl/${i}.jpg`))));

export default ({ label }) => {
    const [[w, h], setWh] = useState([window.innerWidth, window.innerHeight]);
    const productData = useSelector(({ detail }) => detail);
    useEffect(() => {
        const onResize = () => {
            const [w, h] = [window.innerWidth, window.innerHeight];
            setWh([w - 950, h - 110]);
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
    const cfg = { label: 0 }; //useSelector(s => s.cfg);
    useLayoutEffect(() => { canvasPaint(refCanvas.current, label, format, cfg, product) }, [label, format, cfg, w, h, product]);
    return <canvas id="canvas" ref={refCanvas} width={w} height={h} product={product} />;
}


async function canvasPaint(can, label, format, cfg, product) {


    const ctx = can.getContext('2d');
    const [w, h] = [can.width, can.height];
    const car = w / h;

    const img = (await lbls)[cfg.label];
    const [iw, ih, iar] = [img.width, img.height, img.width / img.height];
    const s = (iar < car) ? h / ih : w / iw;

    const [Ix, Iy, Iw, Ih] = [(w - iw * s) / 2, (h - ih * s) / 2, iw * s, ih * s]; 4

    ctx.clearRect(0, 0, w, h);

    ctx.drawImage(img, Ix, Iy, Iw, Ih);


    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    if (product) {
        for (const { id, x, y, w, h, size, lineh, prefix, suffix } of format1) {
            const a = Ix + Iw * (x / 1e3);
            const b = Iy + Ih * (y / 1e3);
            const c = Ix + Iw * (w / 1e3);
            const d = Iy + Ih * (h / 1e3);
            if (cfg.bordi) ctx.rect(a, b, c - a, d - b);

            let text = product[id] || '';
            if (id === 'total_price') {
                let size = product['sizing'] && product['sizing'].split('-')[0] && product['sizing'].split('-')[0].split('gr')[0] * 1
                if (product['sizing'] && product['sizing'].split('-').length > 1) {
                    size = product['sizing'] && product['sizing'].split('-')[1] && product['sizing'].split('-')[1].split('gr')[0] * 1
                }
                let price = product['price'].replace(',', '') * 1
                if (product['price'].includes(',')) {
                    price = (price / 1000).toFixed(2)
                }
                text = (size * price / 1000).toFixed(2)
            } else if (id === 'fao') {
                if (text)
                    text = faos[text]
            } else if (id === 'method') {
                if (text)
                    text = methods[text]
            } else if (id === 'price') {
                
                let price = product['price'].replace(',', '') * 1
                if (product['price'].includes(',')) {
                    price = (price / 1000).toFixed(2)
                }
                text = price.toString()
            }

            if (id === 'packed' || id === 'expiration' || id === 'sizing') {
                drawText(ctx, [a, b, c - a, d - b], prefix, size * s, lineh, id, '', '');
                drawText(ctx, [a, b + 15, c - a, d - b], text, size * s, lineh, id, suffix, '');
            } else if (id === 'price' || id === 'glazing') {
                drawText(ctx, [a, b, c - a, d - b], prefix, size * s, lineh, id, '', '');
                drawText(ctx, [a, b + 15, c - a, d - b], text, size * s, lineh, id, suffix, '');
            } else if (id === 'updated_at') {
                drawText(ctx, [a, b, c - a, d - b], prefix, size * s, lineh, id, '', '');
                drawText(ctx, [a, b + 15, c - a, d - b], text && text.split(' ')[0], size * s, lineh, id, suffix, '');
                drawText(ctx, [a, b + 30, c - a, d - b], text && text.split(' ')[1], size * s, lineh, id, suffix, '');
            } else if (id === 'fao' || id === 'method') {
                var lineheight = 10;
                var lines = text && text.split('\n');
                for (var i = 0; i < lines.length; i++) {
                    if (i === 0) {
                        drawText(ctx, [a, b + i * lineheight, c - a, d - b], prefix + ' ' + lines[i], size * s, lineh, id, '', '');
                    } else {
                        drawText(ctx, [a, b + i * lineheight, c - a, d - b], lines[i], size * s, lineh, id, '', '');
                    }
                }
            } else {
                drawText(ctx, [a, b, c - a, d - b], text, size * s, lineh, id, suffix, prefix);
            }
        }
    }
    for (const { id, x, y, w, h, size, lineh, suffix } of format) {

        if (id === 'recipes') continue;

        const a = Ix + Iw * (x / 1e3);
        const b = Iy + Ih * (y / 1e3);
        const c = Ix + Iw * (w / 1e3);
        const d = Iy + Ih * (h / 1e3);
        if (cfg.bordi) ctx.rect(a, b, c - a, d - b);
        let text = ''
        text = label[id] || '';
        if (id === 'ingredients')
            text += " " + (label['recipes'] || '');

        drawText(ctx, [a, b, c - a, d - b], text, size * s, lineh, id, suffix, '');
    }
    ctx.stroke();
}


function drawText(ctx, [x, y, w, h], text, size, lineh, id, suffix, prefix) {
    size = size / 10;
    y += size;
    if (suffix) text += ` ${suffix}`;
    if (prefix !== '') text = `${prefix} ${text}`;
    ctx.font = `${size}px Open Sans`;
    ctx.fillStyle = 'black';
    const splitted = splitText(t => ctx.measureText(t).width, text, w);


    if (id === 'ingredients') {
        if (splitted.length > 14) {
            splitted.length = 14;
            ctx.fillStyle = 'red';
        }
    }
    else if (id === 'name') {
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
    let words = []
    if (text.length > 0) {
        words = text && text.toString().split(' ');
    }

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
        if (spins > 1000) return ['testo troppo lungo'];
    }
    rows.push(words.join(' '));
    return rows;
}
