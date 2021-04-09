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
    const [label, setLabel] = useState(useSelector(labels.getById(id)));
    const productData = useSelector(({ detail }) => detail);
    const [product, setProduct] = useState({})
    const labelData = useSelector(({ labels }) => labels);
    useEffect(() => {
        if (labelData.length > 0) {
            const filterLabel = labelData.filter(ele => ele.id === id)
            setLabel({ ...filterLabel[0] })
        }
    }, [labelData])
    useEffect(()=>{
        if(productData.getProd) {
            setProduct(productData.getProd.product)
        }
    }, [productData])
    const updLabel = data => {
        setLabel(p => ({ ...p, ...data, id })) & setDirty(true);
        if (data.price) {
            if (data.price.length == 0) {
                let prod = productData.getProd
                prod.product.price = ""
                dispatch(updatePrice(prod))
            } else {
                let prod = productData.getProd
                prod.product.price = data.price
                dispatch(updatePrice(prod))
            }
        }
        if(data.show_retail === 1 || data.show_retail === 0) {
            setProduct({...product, show_retail:data.show_retail})
        }
        if(data.retail_price || data.retail_price === 0) {
            setProduct({...product, retail_price:data.retail_price})
        }
    };

    function exit() {
        if (dirty && !confirm("Uscire senza salvare?")) return;
        dispatch(nav.home());
    }
    function save() {
        dispatch(labels.save({...label, ...product}));
        dispatch(nav.home());
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

