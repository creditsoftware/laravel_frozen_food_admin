import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import IconBtn from '../UI/IconBtn';
import Toolbar from '../UI/Toolbar';

import Settings from "./Settings";
import Canvas from "./Canvas";

import product from '../store/products'

import { updatePrice } from '../store/detail';
import nav from '../store/nav';
import labels from '../store/labels';
import './edit.scss';


export default ({ id }) => {
    const dispatch = useDispatch();
    const [dirty, setDirty] = useState(false);
    const [label, setLabel] = useState(id |> labels.getById |> useSelector);
    const productData = useSelector(({ detail }) => detail);
    const labelData = useSelector(({ labels }) => labels);
    const [getProdData, setGetProdData] = useState([]);
    useEffect(() => {
        if (labelData.length > 0) {
            const filterLabel = labelData.filter(ele => ele.id === id)
            setLabel({ ...filterLabel[0] })
        }
    }, [labelData])
    const updLabel = data => {
        setLabel(p => ({ ...p, ...data, id })) & setDirty(true);
        if (data.price.length == 0) {
            let prod = productData.getProd
            prod.product.price = ""
            dispatch(updatePrice(prod))
        } else {
            let prod = productData.getProd
            prod.product.price = data.price
            dispatch(updatePrice(prod))
        }
    };

    function exit() {
        if (dirty && !confirm("Uscire senza salvare?")) return;
        nav.home() |> dispatch;
    }
    function save() {
        label |> labels.save |> dispatch;
        nav.home() |> dispatch;
    }
    return <div id='main-edit'>
        <Toolbar>
            <div>
                <h1>{label.name}</h1>
                <div className='buttons'>
                    <IconBtn icon='back' text='indietro' onClick={exit} />
                    <IconBtn icon='save' text='salva' onClick={save} />
                </div>
            </div>
        </Toolbar>


        <div id='editor'>
            <Settings label={label} update={updLabel} />
            <Canvas label={label} />
        </div>
    </div>;

}

