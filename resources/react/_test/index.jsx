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
        console.log('ondrop 1', ...d.files)
        console.log('ondrop 2', ...d.items)
        console.log('ondrop 3', d.types);

        if(d.items.length > 1) return console.error('too many files');

        const i = d.items[0];
        console.log(i.kind, i.type);
        const f = i.getAsFile();
        const a = await f.arrayBuffer();
        console.log(f.size);

    }


    const onDragEnter = e => {
        e.preventDefault();
        e.persist();
        const d = e.dataTransfer;
        console.log('ondragenter', d.files, d.items, d.types);
        if(d.items.length) {
            console.log(d.items[0]);
        }
    }

    const onDragLeave = e => {
        e.preventDefault();
        e.persist();
        const d = e.dataTransfer;
        console.log('ondragleave', d.files, d.items, d.types);
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
