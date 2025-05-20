//frontend/src/pages/Login/Login.js

import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const handle = e => {
    e.preventDefault();
    if (user==='user' && pass==='123') return onLogin();
    setErr('Credenciales inválidas');
  };

  return (
    <form className={styles.form} onSubmit={handle}>
      <h2>Iniciar Sesión</h2>
      {err && <p className={styles.error}>{err}</p>}
      <input placeholder="Usuario"   value={user} onChange={e=>setUser(e.target.value)}/>
      <input type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)}/>
      <button type="submit">Entrar</button>
    </form>
  );
}
