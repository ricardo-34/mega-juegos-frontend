import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/games')
      .then(res => {
        setGames(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Cargando juegos...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Hero Header */}
      
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>Mega Juegos PC</h1>

        </div>
      </div>

      {/* Games Section */}
      <div className={styles.gamesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Todos los Juegos</h2>
          <div className={styles.gameCount}>
            {games.length} juego{games.length !== 1 ? 's' : ''} disponible{games.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className={styles.gamesGrid}>
          {games.map(game => (
            <Link key={game._id} to={`/game/${game._id}`} className={styles.gameCard}>
              <div className={styles.imageContainer}>
                <img 
                  src={game.imagenUrl} 
                  alt={game.nombre}
                  className={styles.gameImage}
                />
                <div className={styles.overlay}>
                  <div className={styles.playButton}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className={styles.gameInfo}>
                <h3 className={styles.gameTitle}>{game.nombre}</h3>
                <div className={styles.gameDetails}>
                  {game.plataforma && (
                    <span className={styles.platform}>{game.plataforma}</span>
                  )}
                  <span className={styles.price}>GRATIS</span>
                </div>
                
                {/* Ratings Preview */}
                {(game.jugabilidad || game.historia || game.graficos) && (
                  <div className={styles.ratingsPreview}>
                    {game.jugabilidad && (
                      <div className={styles.ratingItem}>
                        <span className={styles.ratingLabel}>Jugabilidad</span>
                        <span className={styles.ratingValue}>{game.jugabilidad}/10</span>
                      </div>
                    )}
                    {game.votos && (
                      <div className={styles.voteCount}>
                        {game.votos} votos
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {games.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎮</div>
            <h3>No hay juegos disponibles</h3>
            <p>Parece que no hay juegos en la biblioteca actualmente.</p>
          </div>
        )}
      </div>
    </div>
  );
}