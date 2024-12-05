import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useUser } from '../context/UserContext';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState(new Set());

  const fetchExchangeRate = async (exchangeRateId, token) => {
    if (!exchangeRateId) {
      console.error('No exchangeRateId provided');
      return null;
    }

    try {
      const timestamp = new Date().getTime();
      console.log(`Iniciando petición para exchangeRateId: ${exchangeRateId} con timestamp: ${timestamp}`);
      
      const response = await api.get(
        `/forex/exchange-rate/${exchangeRateId}?_t=${timestamp}`,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          } 
        }
      );
      
      const responseData = {
        ...response.data,
        timestamp: response.data.timestamp || new Date().toISOString()
      };
      
      console.log(`Respuesta recibida para ${exchangeRateId}:`, responseData);
      return responseData;
    } catch (error) {
      console.error(`Error fetching exchange rate details for ID ${exchangeRateId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(
          '/favorites',
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        
        const favoritesWithDetails = await Promise.all(
          response.data.map(async (favorite) => {
            const exchangeRate = await fetchExchangeRate(favorite.exchangeRateId, user.token);
            return {
              ...favorite,
              exchangeRate,
              exchangeRateId: favorite.exchangeRateId
            };
          })
        );
        
        console.log('Favoritos iniciales cargados:', favoritesWithDetails);
        setFavorites(favoritesWithDetails);
      } catch (error) {
        console.error('Error al obtener los favoritos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [user.token]);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await api.delete(
        `/favorites/${favoriteId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav._id !== favoriteId));
    } catch (error) {
      console.error('Error al eliminar el favorito:', error);
    }
  };

  const handleUpdateRate = async (favoriteId, exchangeRateId) => {
    if (!favoriteId || !exchangeRateId) {
      console.error('Missing IDs:', { favoriteId, exchangeRateId });
      return;
    }

    console.log('Iniciando actualización para:', { favoriteId, exchangeRateId });
    
    try {
      setUpdatingIds(prev => new Set([...prev, favoriteId]));

      const updatedRate = await fetchExchangeRate(exchangeRateId, user.token);
      
      if (!updatedRate) {
        console.error('No se pudo obtener la tasa actualizada');
        return;
      }

      setFavorites(prevFavorites => {
        return prevFavorites.map(fav => {
          if (fav._id === favoriteId) {
            console.log(`Actualizando favorito ${favoriteId} con nueva tasa:`, updatedRate);
            return {
              ...fav,
              exchangeRate: {
                ...updatedRate,
                timestamp: new Date().toISOString()
              }
            };
          }
          return fav;
        });
      });
    } catch (error) {
      console.error('Error en la actualización:', error);
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(favoriteId);
        return newSet;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  const formatTimestamp = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Fecha no disponible';
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mis Favoritos</h2>
      {favorites.length === 0 && (
        <div className="alert alert-info">No tienes favoritos guardados.</div>
      )}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {favorites.map(favorite => {
          const favoriteId = favorite._id;
          const exchangeRateId = favorite.exchangeRateId;
          
          console.log('Renderizando favorito:', { 
            favoriteId, 
            exchangeRateId,
            timestamp: favorite.exchangeRate?.timestamp,
            isUpdating: updatingIds.has(favoriteId)
          });

          return (
            <div key={favoriteId} className="col">
              <div className="card">
                <div className="card-body">
                  {favorite.exchangeRate ? (
                    <>
                      <h5 className="card-title">
                        {favorite.exchangeRate.from_currency} → {favorite.exchangeRate.to_currency}
                      </h5>
                      <p className="card-text">
                        <strong>Tipo de cambio:</strong> {favorite.exchangeRate.rate}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Última actualización: {formatTimestamp(favorite.exchangeRate.timestamp)}
                        </small>
                      </p>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleUpdateRate(favoriteId, exchangeRateId)}
                          disabled={updatingIds.has(favoriteId)}
                        >
                          {updatingIds.has(favoriteId) ? 'Actualizando...' : 'Actualizar'}
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleRemoveFavorite(favoriteId)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="alert alert-warning">
                      Error al cargar los detalles del tipo de cambio
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;