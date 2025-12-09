import { useState, useEffect } from 'react';

function Statistics() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    }
  }, []);

  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  const percentage = technologies.length > 0 
    ? Math.round((completed / technologies.length) * 100) 
    : 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📊 Статистика</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Всего технологий</h3>
          <div className="stat-number">{technologies.length}</div>
        </div>
        
        <div className="stat-card">
          <h3>Изучено</h3>
          <div className="stat-number completed">{completed}</div>
        </div>
        
        <div className="stat-card">
          <h3>В процессе</h3>
          <div className="stat-number in-progress">{inProgress}</div>
        </div>
        
        <div className="stat-card">
          <h3>Не начато</h3>
          <div className="stat-number not-started">{notStarted}</div>
        </div>
      </div>

      <div className="progress-section">
        <h3>Общий прогресс: {percentage}%</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          >
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;