import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from 'react';


const {strstri} = require('../utils');

import Toolbar from '../UI/Toolbar';
import IconBtn from "../UI/IconBtn";

import list from '../store/list';
import products from '../store/products'

import './list.scss';


import ProductRow from "./ProductRow";



export default function List() {
    const dispatch = useDispatch();
    const search = useSelector(list.getSearch);
    const allProds = useSelector(products.getAll);

    const prods = useMemo( () => allProds.filter(p => strstri(p.name, search) || strstri(p.code, search)), [allProds, search]);

    return <div id='main-list'>
        <Toolbar>
            <div>
                <input type='text' placeholder='Ricerca Prodotto' value={search} onChange={e => e.target.value |> list.search |> dispatch}/>
                <IconBtn text='logout' icon='logout' onClick={() => window.location.href = _URL('/logout')}/>
            </div>
        </Toolbar>

        <div id='products'>
            <div className='header'>
                <div>Codice</div>
                <div>Articolo</div>
                <div>Descrizione</div>
                <div>Note</div>
                <div>Modificato</div>
                <div>Azioni</div>
            </div>
            {prods.map(p => <ProductRow key={p.id}{...p} />)}

        </div>
    </div>;


};
