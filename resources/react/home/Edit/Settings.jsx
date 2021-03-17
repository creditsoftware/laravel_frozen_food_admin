import { useSelector, useDispatch } from 'react-redux';
import formats from '../store/formats';


import Input from './Input';
import FileDrop from './FileDrop';

const Settings = ({label, update}) => {
    const dispatch = useDispatch();
    const format = useSelector(formats.getById(1));




    return (
        <div id='settings'>
            {format.map(f => <Input key={f.id} format={f} label={label} update={update} />)}
            <Input format={{id:'price', title:"Price", uisize:1}} label={label} update={update} />
            <Input format={{id:'notes', title:'Note', uisize:3}} label={label} update={update} />
            <Input format={{id:'webdesc', title:'Descrizione Web', uisize:4}} label={label} update={update} />
            
            <FileDrop label={label} update={update}  />

            {/*<button onClick={() => dispatch({type:'HACK+'})}>+</button>*/}
            {/*<button onClick={() => dispatch({type:'HACK-'})}>-</button>*/}
        </div>
    );
};

export default Settings;
