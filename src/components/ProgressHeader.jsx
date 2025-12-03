import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
    const total = technologies.length;
    const completed = technologies.filter(t => t.status == 'completed').length;
    const inProgress = technologies.filter(t => t.status == 'in-progress').length;
    const nonStarted = technologies.filter(t => t.status == 'not-started').length;

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return ( 
    <div className="progress-header">
      <h2>Дорожная карта изучения технологий</h2>
      
      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Всего технологий:</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Изучено:</span>
          <span className="stat-value">{completed}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">В процессе:</span>
          <span className="stat-value">{inProgress}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Не начато:</span>
          <span className="stat-value">{nonStarted}</span>
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-label">
          <span>Прогресс изучения: {percentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;