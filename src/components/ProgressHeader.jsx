import { useState, useEffect } from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    percentage: 0
  });

  useEffect(() => {
    const total = technologies.length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const notStarted = technologies.filter(t => t.status === 'not-started').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    setStats({ total, completed, inProgress, notStarted, percentage });
  }, [technologies]);

  const getPopularCategory = () => {
    const categories = [
      { name: 'Frontend', count: technologies.filter(t => t.category === 'frontend').length },
      { name: 'Backend', count: technologies.filter(t => t.category === 'backend').length },
      { name: 'Tools', count: technologies.filter(t => t.category === 'tools').length }
    ];
    
    const maxCategory = categories.reduce((max, cat) => 
      cat.count > max.count ? cat : max, 
      { name: 'Не задано', count: 0 }
    );
    
    return maxCategory.name;
  };

  return (
    <div className="progress-header">
      <h2>📚 Дорожная карта изучения технологий</h2>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <span className="stat-label">Всего технологий</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-label">Изучено</span>
            <span className="stat-value">{stats.completed}</span>
          </div>
        </div>
        
        <div className="stat-card in-progress">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <span className="stat-label">В процессе</span>
            <span className="stat-value">{stats.inProgress}</span>
          </div>
        </div>
        
        <div className="stat-card not-started">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <span className="stat-label">Осталось</span>
            <span className="stat-value">{stats.notStarted}</span>
          </div>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-info">
          <span className="progress-label">
            Общий прогресс: <strong>{stats.percentage}%</strong>
          </span>
          <span className="progress-category">
            Самая популярная категория: <strong>{getPopularCategory()}</strong>
          </span>
        </div>
        
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${stats.percentage}%` }}
            />
            <span className="progress-text">{stats.percentage}%</span>
          </div>
          <div className="progress-markers">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;