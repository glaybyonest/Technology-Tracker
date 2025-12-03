import { useState } from 'react';
import './TechnologyCard.css';

function TechnologyCard({ 
  id, 
  title, 
  description, 
  status, 
  onStatusChange 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const nextStatus = statusOrder[nextIndex];
    
    if (onStatusChange) {
      onStatusChange(id, nextStatus);
    }
  };

  return (
    <div 
      className={`technology-card status-${status} ${isHovered ? 'hovered' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="status-section">
        <div className="status-indicator">
          <span className="status-label">Статус:</span>
          <span className="status-text">{getStatusText(status)}</span>
        </div>
        <div className="click-hint">
          Нажмите для смены статуса →
        </div>
      </div>
    </div>
  );
}

function getStatusText(status) {
  const statusMap = {
    'not-started': 'Не начато',
    'in-progress': 'В процессе',
    'completed': 'Завершено'
  };
  return statusMap[status] || status;
}

export default TechnologyCard;