//frontend/src/pages/Admin/Admin.js

import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import styles from './Admin.module.css';

export default function Admin() {
  const [games, setGames] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentGameId, setCurrentGameId] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    imagenUrl: '',
    descargaUrl: '',
    jugabilidad: 0,
    historia: 0,
    graficos: 0,
    votos: 0,
    info: '',
    fechaEstreno: '',
    fechaActualizacion: '',
    actualizacion: '',
    plataforma: 'PC',
    idioma: '',
    audios: '',
    peso: '',
    version: '',
    requisitos: {
      minimo: { so: '', procesador: '', memoria: '', graficos: '', disco: '' },
      recomendado: { so: '', procesador: '', memoria: '', graficos: '', disco: '' },
    },
  });

  useEffect(() => { loadGames(); }, []);
  const loadGames = () =>
    API.get('/games').then(res => setGames(res.data));

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.startsWith('requisitos.')) {
      const [, group, key] = name.split('.');
      setForm(f => ({
        ...f,
        requisitos: {
          ...f.requisitos,
          [group]: {
            ...f.requisitos[group],
            [key]: value
          }
        }
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    API.post('/games', form).then(() => {
      resetForm();
      loadGames();
    });
  };

  const handleDelete = id =>
    API.delete(`/games/${id}`).then(() => loadGames());

  const handleEdit = game => {
    setForm({
      ...game,
      fechaEstreno: game.fechaEstreno?.split('T')[0] || '',
      fechaActualizacion: game.fechaActualizacion?.split('T')[0] || '',
    });
    setEditMode(true);
    setCurrentGameId(game._id);
  };

  const handleUpdate = e => {
    e.preventDefault();
    API.put(`/games/${currentGameId}`, form)
      .then(() => {
        resetForm();
        loadGames();
      })
      .catch(error => {
        console.error('Error al actualizar el juego:', error);
      });
  };

  const resetForm = () => {
    setForm({
      nombre: '', 
      imagenUrl: '', 
      descargaUrl: '',
      jugabilidad: 0, 
      historia: 0, 
      graficos: 0, 
      votos: 0,
      info: '', 
      fechaEstreno: '', 
      fechaActualizacion: '',
      actualizacion: '', 
      plataforma: 'PC', 
      idioma: '',
      audios: '', 
      peso: '', 
      version: '',
      requisitos: {
        minimo: { so: '', procesador: '', memoria: '', graficos: '', disco: '' },
        recomendado: { so: '', procesador: '', memoria: '', graficos: '', disco: '' },
      },
    });
    setEditMode(false);
    setCurrentGameId(null);
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className={styles.container}>
      <h2>Panel de Administración</h2>

      <form className={styles.form} onSubmit={editMode ? handleUpdate : handleSubmit}>
        {/* Datos básicos */}
        <input name="nombre" onChange={handleChange} placeholder="Nombre" value={form.nombre} />
        <input name="imagenUrl" onChange={handleChange} placeholder="URL imagen" value={form.imagenUrl} />
        <input name="descargaUrl" onChange={handleChange} placeholder="URL descarga" value={form.descargaUrl} />
        <input name="jugabilidad" type="number" onChange={handleChange} placeholder="Jugabilidad" value={form.jugabilidad} />
        <input name="historia" type="number" onChange={handleChange} placeholder="Historia" value={form.historia} />
        <input name="graficos" type="number" onChange={handleChange} placeholder="Gráficos" value={form.graficos} />
        <input name="votos" type="number" onChange={handleChange} placeholder="N° Votos" value={form.votos} />
        <textarea name="info" onChange={handleChange} placeholder="Información del juego" value={form.info} />

        {/* Fechas & versión */}
        <input name="fechaEstreno" type="date" onChange={handleChange} placeholder="Fecha de estreno" value={form.fechaEstreno} />
        <input name="fechaActualizacion" type="date" onChange={handleChange} placeholder="Fecha de actualización" value={form.fechaActualizacion} />
        <input name="actualizacion" onChange={handleChange} placeholder="Descripción actualización" value={form.actualizacion} />
        <input name="plataforma" onChange={handleChange} placeholder="Plataforma" value={form.plataforma} />
        <input name="idioma" onChange={handleChange} placeholder="Idioma" value={form.idioma} />
        <input name="audios" onChange={handleChange} placeholder="Audios" value={form.audios} />
        <input name="peso" onChange={handleChange} placeholder="Peso" value={form.peso} />
        <input name="version" onChange={handleChange} placeholder="Versión" value={form.version} />

        {/* Requisitos MÍNIMOS */}
        <h4>Requisitos MÍNIMOS</h4>
        <input name="requisitos.minimo.so" onChange={handleChange} placeholder="SO mínimo" value={form.requisitos.minimo.so} />
        <input name="requisitos.minimo.procesador" onChange={handleChange} placeholder="Procesador mínimo" value={form.requisitos.minimo.procesador} />
        <input name="requisitos.minimo.memoria" onChange={handleChange} placeholder="Memoria mínima" value={form.requisitos.minimo.memoria} />
        <input name="requisitos.minimo.graficos" onChange={handleChange} placeholder="Gráficos mínimos" value={form.requisitos.minimo.graficos} />
        <input name="requisitos.minimo.disco" onChange={handleChange} placeholder="Disco mínimo" value={form.requisitos.minimo.disco} />

        {/* Requisitos RECOMENDADOS */}
        <h4>Requisitos RECOMENDADOS</h4>
        <input name="requisitos.recomendado.so" onChange={handleChange} placeholder="SO recomendado" value={form.requisitos.recomendado.so} />
        <input name="requisitos.recomendado.procesador" onChange={handleChange} placeholder="Procesador recomendado" value={form.requisitos.recomendado.procesador} />
        <input name="requisitos.recomendado.memoria" onChange={handleChange} placeholder="Memoria recomendada" value={form.requisitos.recomendado.memoria} />
        <input name="requisitos.recomendado.graficos" onChange={handleChange} placeholder="Gráficos recomendados" value={form.requisitos.recomendado.graficos} />
        <input name="requisitos.recomendado.disco" onChange={handleChange} placeholder="Disco recomendado" value={form.requisitos.recomendado.disco} />

        <div className={styles.formButtons}>
          {editMode ? (
            <>
              <button type="submit" className={styles.updateButton}>Actualizar Juego</button>
              <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancelar</button>
            </>
          ) : (
            <button type="submit">Guardar Juego</button>
          )}
        </div>
      </form>

      <ul className={styles.list}>
        {games.map(g => (
          <li key={g._id}>
            {g.nombre}
            <div>
              <button onClick={() => handleEdit(g)}>✏️</button>
              <button onClick={() => handleDelete(g._id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}