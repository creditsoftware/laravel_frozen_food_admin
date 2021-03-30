import { useSelector, useDispatch } from 'react-redux';
import formats from '../store/formats';


import Input from './Input';
import FileDrop from './FileDrop';
import { useEffect } from 'react';
import './edit.scss'
const Settings = ({ label, update }) => {
    const dispatch = useDispatch();
    const format = useSelector(formats.getById(1));
    const productData = useSelector(({ detail }) => detail);
    let product = productData.getProd && productData.getProd.product
    useEffect(() => {
    }, [product])
    return (
        <div id='settings'>
            {format.map(f => <Input key={f.id} format={f} label={label} update={update} />)}
            {
                product &&
                <Input format={{ id: 'price', title: "Price", uisize: 0.25 }} label={product} update={update} />
            }
            <div className="promotion">
                <div className="promotion-layout">
                    <input type="text" placeholder="promotion Value" />
                    <input type="text" placeholder="promotion Value" />
                    <div className="check-button">
                        <input type="checkbox" id="off" name="off" checked />
                        <label for="scales">Off</label>
                    </div>
                    <button>
                        <img width="20px" height="15px" src={_URL(`/img/arrow-left.png`)} />
                    </button>
                    <input type="text" placeholder="Listino Value" />
                    <input type="text" placeholder="Listino Value" />
                </div>
            </div>
            <Input format={{ id: 'notes', title: 'Note', uisize: 3 }} label={label} update={update} />
            <Input format={{ id: 'webdesc', title: 'Descrizione Web', uisize: 4 }} label={label} update={update} />

            <FileDrop label={label} update={update} />

            {/*<button onClick={() => dispatch({type:'HACK+'})}>+</button>*/}
            {/*<button onClick={() => dispatch({type:'HACK-'})}>-</button>*/}
        </div>
    );
};

export default Settings;
