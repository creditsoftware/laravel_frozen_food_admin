import { hot } from "react-hot-loader/root";
import boot from '../boot';

import { useState } from 'react';
import './style.scss';



const Test = (() => {

    /** @param {DragEvent} e */
    const onDrop = async e => {
        e.persist();
        e.preventDefault();
        const d = e.dataTransfer;
        if(d.items.length > 1) return console.error('too many files');

        const i = d.items[0];
        const f = i.getAsFile();
        const a = await f.arrayBuffer();
    }


    const onDragEnter = e => {
        e.preventDefault();
        e.persist();
        const d = e.dataTransfer;
        if(d.items.length) {
        }
    }

    const onDragLeave = e => {
        e.preventDefault();
        e.persist();
        const d = e.dataTransfer;
    }

    const onDragOver = e => {
        e.preventDefault();
    }



    return <div id='spabox'>

        <div className='dropzone' onDrop={onDrop} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver}>

            dropzone here!

        </div>



    </div>;


}) |> hot |> boot;
