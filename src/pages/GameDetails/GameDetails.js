import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';
import styles from './GameDetails.module.css';

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    API.get(`/games/${id}`).then(res => setGame(res.data));
  }, [id]);

  if (!game) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.gameTitle}>{game.nombre}</h1>
            <p className={styles.gameInfo}>{game.info}</p>
            
            <div className={styles.gameMetadata}>
              <span className={styles.metadataItem}>
                <strong>Plataforma:</strong> {game.plataforma}
              </span>
              <span className={styles.metadataItem}>
                <strong>Versión:</strong> {game.version}
              </span>
              <span className={styles.metadataItem}>
                <strong>Peso:</strong> {game.peso}
              </span>
            </div>

            <div className={styles.actionSection}>
              <a href={game.descargaUrl} className={styles.downloadButton} download>
                Descargar Gratis
              </a>
              <div className={styles.gamePrice}>Gratis</div>
            </div>
          </div>
          
          <div className={styles.heroImage}>
            <img src={game.imagenUrl} alt={game.nombre} className={styles.gameImage} />
          </div>
        </div>
      </div>

      <div className={styles.contentContainer}>
        {/* Ratings Section */}
        <section className={styles.ratingsSection}>
          <h2 className={styles.sectionTitle}>Valoraciones de la Comunidad</h2>
          <div className={styles.ratingsGrid}>
            <div className={styles.ratingCard}>
              <div className={styles.ratingLabel}>Jugabilidad</div>
              <div className={styles.ratingValue}>{game.jugabilidad}/10</div>
              <div className={styles.ratingBar}>
                <div 
                  className={styles.ratingFill} 
                  style={{width: `${(game.jugabilidad / 10) * 100}%`}}
                ></div>
              </div>
            </div>
            
            <div className={styles.ratingCard}>
              <div className={styles.ratingLabel}>Historia</div>
              <div className={styles.ratingValue}>{game.historia}/10</div>
              <div className={styles.ratingBar}>
                <div 
                  className={styles.ratingFill} 
                  style={{width: `${(game.historia / 10) * 100}%`}}
                ></div>
              </div>
            </div>
            
            <div className={styles.ratingCard}>
              <div className={styles.ratingLabel}>Gráficos</div>
              <div className={styles.ratingValue}>{game.graficos}/10</div>
              <div className={styles.ratingBar}>
                <div 
                  className={styles.ratingFill} 
                  style={{width: `${(game.graficos / 10) * 100}%`}}
                ></div>
              </div>
            </div>
            
            <div className={styles.ratingCard}>
              <div className={styles.ratingLabel}>Total de Votos</div>
              <div className={styles.ratingValue}>{game.votos}</div>
            </div>
          </div>
        </section>

        {/* Game Info Section */}
        <section className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Información del Juego</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Fecha de Estreno</span>
              <span className={styles.infoValue}>
                {new Date(game.fechaEstreno).toLocaleDateString()}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Última Actualización</span>
              <span className={styles.infoValue}>
                {new Date(game.fechaActualizacion).toLocaleDateString()}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Idioma</span>
              <span className={styles.infoValue}>{game.idioma}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Audios</span>
              <span className={styles.infoValue}>{game.audios}</span>
            </div>
          </div>
          
          {game.actualizacion && (
            <div className={styles.changelogSection}>
              <h3 className={styles.changelogTitle}>Changelog</h3>
              <p className={styles.changelogText}>{game.actualizacion}</p>
            </div>
          )}
        </section>

        {/* System Requirements */}
        <section className={styles.requirementsSection}>
          <h2 className={styles.sectionTitle}>Requisitos del Sistema</h2>
          <div className={styles.requirementsContainer}>
            <div className={styles.requirementCard}>
              <h3 className={styles.requirementTitle}>Mínimos</h3>
              <div className={styles.requirementsList}>
                <div className={styles.requirementItem}>
                  <span className={styles.reqLabel}>SO:</span>
                  <span className={styles.reqValue}>{game.requisitos.minimo.so}</span>
                </div>
                <div className={styles.requirementItem}>
                  <span className={styles.reqLabel}>Procesador:</span>
                  <span className={styles.reqValue}>{game.requisitos.minimo.procesador}</span>
                </div>
                <div className={styles.requirementItem}>
                  <span className={styles.reqLabel}>Memoria:</span>
                  <span className={styles.reqValue}>{game.requisitos.minimo.memoria}</span>
                </div>
                <div className={styles.requirementItem}>
                  <span className={styles.reqLabel}>Gráficos:</span>
                  <span className={styles.reqValue}>{game.requisitos.minimo.graficos}</span>
                </div>
                <div className={styles.requirementItem}>
                  <span className={styles.reqLabel}>Disco:</span>
                  <span className={styles.reqValue}>{game.requisitos.minimo.disco}</span>
                </div>
              </div>
            </div>

            <div className={styles.requirementCard}>
              <h3 className={styles.requirementTitle}>Recomendados</h3>
              <div className={styles.requirementsList}>
                <div className={styles.requirementItem}>
                  <span className={styles.reqLabel}>SO:</span>
                  <span className={styles.reqValue}>{game.requisitos.recomendado.so}</span>
                </div>
                <div className={styles.requirementItem}>
                  <span className={styles.reqLabel}>Procesador:</span>
                  <span className={styles.reqValue}>{game.requisitos.recomendado.procesador}</span>
                </div>
                <div className={styles.requirementItem}>
                  <span className={styles.reqLabel}>Memoria:</span>
                  <span className={styles.reqValue}>{game.requisitos.recomendado.memoria}</span>
                </div>
                <div className={styles.requirementItem}>
                  <span className={styles.reqLabel}>Gráficos:</span>
                  <span className={styles.reqValue}>{game.requisitos.recomendado.graficos}</span>
                </div>
                <div className={styles.requirementItem}>
                  <span className={styles.reqLabel}>Disco:</span>
                  <span className={styles.reqValue}>{game.requisitos.recomendado.disco}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}