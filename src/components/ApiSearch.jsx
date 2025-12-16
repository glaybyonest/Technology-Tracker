import { useState, useEffect, useRef } from 'react';
import useDebounce from '../hooks/useDebounce';
import './ApiSearch.css';
import { normalizeUrlList } from '../utils/url';

function ApiSearch({ onAddTechnology }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchTechnologies = async (query) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 800));

      // Мок данные API
      const mockResults = [
        {
          id: `api-${Date.now()}-1`,
          title: 'React Native',
          description: 'Создание мобильных приложений на React',
          category: 'mobile',
          difficulty: 'intermediate',
          resources: ['https://reactnative.dev']
        },
        {
          id: `api-${Date.now()}-2`,
          title: 'Webpack',
          description: 'Сборщик модулей для JavaScript',
          category: 'tools',
          difficulty: 'advanced',
          resources: ['https://webpack.js.org']
        },
        {
          id: `api-${Date.now()}-3`,
          title: 'Next.js',
          description: 'React фреймворк для продакшена',
          category: 'frontend',
          difficulty: 'intermediate',
          resources: ['https://nextjs.org']
        },
        {
          id: `api-${Date.now()}-4`,
          title: 'TypeScript',
          description: 'Типизированный JavaScript',
          category: 'language',
          difficulty: 'intermediate',
          resources: ['https://www.typescriptlang.org']
        },
        {
          id: `api-${Date.now()}-5`,
          title: 'Docker',
          description: 'Контейнеризация приложений',
          category: 'devops',
          difficulty: 'intermediate',
          resources: ['https://www.docker.com']
        }
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

      setResults(mockResults);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Ошибка поиска');
        console.error('Ошибка:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchTechnologies(debouncedSearchTerm);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedSearchTerm]);

  const handleAdd = (tech) => {
    const normalizedResources = normalizeUrlList(tech.resources || []);
    const techToAdd = {
      ...tech,
      resources: normalizedResources,
      id: Date.now(),
      status: 'not-started',
      notes: ''
    };

    if (onAddTechnology) {
      onAddTechnology(techToAdd);
    }

    // Удаляем из результатов поиска
    setResults(results.filter(r => r.id !== tech.id));
    setSearchTerm('');

    alert(`Технология "${tech.title}" добавлена в ваш трекер!`);
  };

  return (
    <div className="api-search">
      <h3>🔍 Поиск технологий в базе</h3>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Введите название технологии..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {loading && <span className="search-loading">⏳</span>}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="search-results">
        {results.length > 0 ? (
          <>
            <h4>Найдено: {results.length}</h4>
            <div className="results-grid">
              {results.map(tech => (
                <div key={tech.id} className="result-card">
                  <div className="result-content">
                    <h5>{tech.title}</h5>
                    <p>{tech.description}</p>
                    <div className="result-meta">
                      <span className="result-category">{tech.category}</span>
                      <span className="result-difficulty">{tech.difficulty}</span>
                    </div>
                    <div className="result-resources">
                      <small>Ресурсы: {normalizeUrlList(tech.resources || []).join(', ') || 'нет'}</small>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAdd(tech)}
                    className="add-btn"
                  >
                    + Добавить
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          searchTerm.trim() && !loading && (
            <p className="no-results">Ничего не найдено</p>
          )
        )}
      </div>

      <div className="search-info">
        <p>Поиск имитирует работу с внешним API. Результаты загружаются с задержкой.</p>
      </div>
    </div>
  );
}

export default ApiSearch;