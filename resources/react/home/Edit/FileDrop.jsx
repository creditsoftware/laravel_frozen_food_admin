import {useState, useEffect} from "react";
import {getLabelImage, upLabelImage} from '../../api';
import {ProgressBar, Spinner} from '../UI';
import {produce} from 'immer';


function useImmerState(init) {
    const [value, setValue] = useState(init);
    return [value, fn => setValue(v => produce(v, d =>{fn(d)} ))]
}


function findFree(data) {
    if(data.image1 === null) return '1';
    if(data.image2 === null) return '2';
    if(data.image3 === null) return '3';
    if(data.image4 === null) return '4';
    return null;
}


const FileDrop = ({label, update}) => {

    const [data, setData] = useImmerState({image1:null, image2:null, image3:null, image4:null});
    const [perc, setPerc] = useImmerState({image1:null, image2:null, image3:null, image4:null});

    useEffect(() => {
        const {image1, image2, image3, image4} = label;

        if(image1) getLabelImage(image1).then(data => setData(p => p.image1 = data));
        if(image2) getLabelImage(image2).then(data => setData(p => p.image2 = data));
        if(image3) getLabelImage(image3).then(data => setData(p => p.image3 = data));
        if(image4) getLabelImage(image4).then(data => setData(p => p.image4 = data));
    }, []);


    /** @param {DragEvent} e */
    async function ondrop(e) {
        e.preventDefault();
        const items = e.dataTransfer.items;

        if (items.length !== 1)
            return alert('Carica i files uno ad uno');
        if (!['image/jpg', 'image/jpeg'].includes(items[0].type))
            return alert('Formato immagine non valido. Prova con JPG');


        const id = findFree(data);
        if(id === null)
            return alert('Limite 4 immagini raggiunto. Cancellare una vecchia immagine.');

        const k = `image${id}`;

        const file = items[0].getAsFile();
        const bytes = URL.createObjectURL(file);

        setData(p => p[k] = bytes);
        setPerc(p => p[k] = 0);

        try {

            const fname = await upLabelImage(`${label.id}_${id}`, file, n => setPerc(p=>p[k]=n));
            update({[k]: fname});
        }
        catch(ex) {
            alert(ex);
        }
        setPerc(p => p[k] = null);
    }

    useEffect(() => {
        const body = document.querySelector('body');
        const ondragover = e => e.preventDefault();

        body.addEventListener('dragover', ondragover);
        body.addEventListener('drop', ondrop);
        return () => {
            body.removeEventListener('dragover', ondragover);
            body.removeEventListener('drop', ondrop);
        }
    }, [data]);

    const delImg = (id) => {
        if(!confirm(`Cancellare l'immagine n° ${id}?`)) return;
        const k = 'image'+id;
        update({ [k]: null});
        setData(p => p[k] = null);
    }

    return (
        <div className='label' style={{width: '100%'}}>
            <h3>Immagini</h3>

            {!data.image1 && !data.image2 && !data.image3 && !data.image4 && <p>Nessuna immagine caricata</p>}

            <div className='filedrop'>
                <Pic data={data.image1} perc={perc.image1} onDel={()=>delImg(1)}/>
                <Pic data={data.image2} perc={perc.image2} onDel={()=>delImg(2)}/>
                <Pic data={data.image3} perc={perc.image3} onDel={()=>delImg(3)}/>
                <Pic data={data.image4} perc={perc.image4} onDel={()=>delImg(4)}/>
            </div>
        </div>
    );
}

export default FileDrop;

function Pic({data, perc, onDel}) {

    return (
        <div className="pic">
            {data && <div className='delimg' onClick={onDel}>X</div>}
            {data && <img src={data} />}
            {perc !== null && <ProgressBar value={perc}/>}
        </div>
    );
}
