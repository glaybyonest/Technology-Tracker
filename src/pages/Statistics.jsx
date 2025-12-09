import { useState, useEffect } from 'react';
import './Statistics.css';

function Statistics() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      try {
        setTechnologies(JSON.parse(saved));
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    }
  }, []);

  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getCategoryStats = () => {
    const categories = {};
    technologies.forEach(tech => {
      const category = tech.category || 'other';
      categories[category] = (categories[category] || 0) + 1;
    });
    
    return Object.entries(categories)
      .map(([name, count]) => ({
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getRecentTechnologies = () => {
    return technologies
      .slice()
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.id || 0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.id || 0);
        return dateB - dateA;
      })
      .slice(0, 5);
  };

  return (
    <div className="statistics-page">
      <div className="page-header">
        <h1>📊 Статистика</h1>
        <div className="header-info">
          <span className="total-count">Всего: {total}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <span className="stat-label">Всего технологий</span>
            <span className="stat-value">{total}</span>
          </div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-label">Изучено</span>
            <span className="stat-value">{completed}</span>
          </div>
        </div>
        
        <div className="stat-card in-progress">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <span className="stat-label">В процессе</span>
            <span className="stat-value">{inProgress}</span>
          </div>
        </div>
        
        <div className="stat-card not-started">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <span className="stat-label">Осталось</span>
            <span className="stat-value">{notStarted}</span>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <h3>Общий прогресс: {percentage}%</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          >
            <span className="progress-text">{percentage}%</span>
          </div>
        </div>
        <div className="progress-markers">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {getCategoryStats().length > 0 && (
        <div className="category-stats">
          <h3>📈 Распределение по категориям</h3>
          <div className="categories-list">
            {getCategoryStats().map(category => (
              <div key={category.name} className="category-item">
                <div className="category-header">
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">
                    {category.count} ({category.percentage}%)
                  </span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-fill"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="recent-activity">
        <h3>🕐 Последние добавленные</h3>
        <div className="activity-list">
          {getRecentTechnologies().map(tech => (
            <div key={tech.id} className="activity-item">
              <div className="activity-tech">{tech.title}</div>
              <div className={`activity-status status-${tech.status}`}>
                {tech.status === 'completed' ? '✅ Завершено' : 
                 tech.status === 'in-progress' ? '🔄 В процессе' : 
                 '⏳ Не начато'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Statistics;