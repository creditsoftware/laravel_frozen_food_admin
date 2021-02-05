import {hot} from 'react-hot-loader/root';
import boot from "../boot";
import { useSelector } from 'react-redux';

import nav from './store/nav';
import list from './store/list';
import products from './store/products';
import labels from './store/labels';
import formats from './store/formats';


import List from './List';
import Edit from './Edit';



export default (() => {
    const edit = useSelector(nav.getEditId);
    return edit ? <Edit id={edit}/> : <List/>;
}) |> hot |> boot(#, {nav, list, products, labels, formats});

