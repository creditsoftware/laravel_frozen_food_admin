import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import IconBtn from '../UI/IconBtn';
import Toolbar from '../UI/Toolbar';

import Settings from "./Settings";
import Canvas from "./Canvas";

import nav from '../store/nav';
import labels from '../store/labels';

import './edit.scss';


export default ({id}) => {
    const dispatch = useDispatch();
    const [dirty, setDirty] = useState(false);
    const [label, setLabel] = useState(id |> labels.getById |> useSelector);
    const labelData = useSelector(({labels})=>labels)
    useEffect(()=>{
        if(labelData.length>0){
            const filterLabel=labelData.filter(ele=>ele.id===id)
            setLabel({...filterLabel[0]})
        }
    },[labelData])
    const updLabel = data => {setLabel(p => ({...p, ...data, id})) & setDirty(true)};

    function exit() {
        if(dirty && !confirm("Uscire senza salvare?")) return;
        nav.home() |> dispatch;
    }
    function save() {
        label |> labels.save |> dispatch;
        nav.home() |> dispatch;
    }
    console.log(label)
    return <div id='main-edit'>
        <Toolbar>
            <div>
                <h1>{label.name}</h1>
                <div className='buttons'>
                    <IconBtn icon='back' text='indietro' onClick={exit}/>
                    <IconBtn icon='save' text='salva' onClick={save}/>
                </div>
            </div>
        </Toolbar>


        <div id='editor'>
            <Settings label={label} update={updLabel}/>
            <Canvas label={label} />
        </div>
    </div>;

}
