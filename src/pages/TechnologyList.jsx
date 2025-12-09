import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './TechnologyList.css';

function TechnologyList() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      try {
        setTechnologies(JSON.parse(saved));
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    }
    setLoading(false);
  }, []);

  const getStatusText = (status) => {
    const statusMap = {
      'not-started': 'Не начато',
      'in-progress': 'В процессе',
      'completed': 'Завершено'
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div className="technology-list-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Загрузка технологий...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="technology-list-page">
      <div className="page-header">
        <h1>📋 Все технологии</h1>
        <div className="header-actions">
          <span className="tech-count">Всего: {technologies.length}</span>
          <Link to="/" className="btn btn-secondary">
            ← На главную
          </Link>
        </div>
      </div>

      <div className="technologies-grid">
        {technologies.map(tech => (
          <div key={tech.id} className="technology-item">
            <div className="tech-header">
              <h3>{tech.title}</h3>
              <span className={`status status-${tech.status}`}>
                {getStatusText(tech.status)}
              </span>
            </div>
            <p className="tech-description">{tech.description}</p>
            <div className="tech-meta">
              <span className="tech-category">
                {tech.category || 'Без категории'}
              </span>
              <div className="tech-actions">
                <Link to={`/technology/${tech.id}`} className="btn-link">
                  Подробнее →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {technologies.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h4>Технологий пока нет</h4>
          <p>Добавьте первую технологию на главной странице</p>
          <Link to="/" className="btn btn-primary">
            Перейти на главную
          </Link>
        </div>
      )}
    </div>
  );
}

export default TechnologyList;