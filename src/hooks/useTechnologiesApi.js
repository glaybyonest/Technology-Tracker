import { useState, useEffect } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Проверяем localStorage
      const saved = localStorage.getItem('techTrackerData');
      if (saved) {
        setTechnologies(JSON.parse(saved));
      }
    } catch (err) {
      setError('Ошибка загрузки данных');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies
  };
}

export default useTechnologiesApi;