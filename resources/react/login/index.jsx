import {hot} from 'react-hot-loader/root';
import boot from '../boot';
import { login } from '../api';
import React, { useState } from 'react';
import './style.scss';


(() => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState();

    const doLogin = async () => {
        setError(null);
        if(!name) return setError('Username mancante');
        if(!password) return setError('Password mancante');
        const {err, ok} = await login(name, password);
        if(err) return setError(err);
        if(ok) return location.reload();
        setError('Errore sconosciuto');
    }


    return <div id='spabox'>
            <div id='logo'><img src={_URL('/img/logo.jpg')} /></div>

            <div id='title'><h1>Software Creazione <b>Etichette</b></h1></div>

            <div id='loginbox' onKeyDown={e => e.key === 'Enter' && doLogin()}>
                <h2>Login</h2>
                <input type='text' placeholder='Username' value={name} onChange={e => e.target.value |> setName}/>
                <input type='password' placeholder='Password' value={password} onChange={e => e.target.value |> setPassword} />
                <button onClick={doLogin}>Entra >>></button>
            </div>

            {error && <div id='error'>{error}</div>}

            <div id='version'>ver. {window.version}</div>
    </div>;


}) |>hot |> boot;
