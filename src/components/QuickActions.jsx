import { useState } from 'react';
import Modal from './Modal';
import './QuickActions.css';

function QuickActions({ 
  onMarkAllCompleted, 
  onResetAll, 
  onRandomSelect,
  technologies 
}) {
  const [showExportModal, setShowExportModal] = useState(false);
  
  const handleRandomSelect = () => {
    if (!technologies || technologies.length === 0) {
      alert('Нет технологий для выбора!');
      return;
    }
    
    // 1. Ищем технологии со статусом 'not-started'
    const notStartedTechs = technologies.filter(t => t.status === 'not-started');
    
    if (notStartedTechs.length > 0) {
      const randomIndex = Math.floor(Math.random() * notStartedTechs.length);
      const randomTech = notStartedTechs[randomIndex];
      
      if (onRandomSelect) {
        onRandomSelect(randomTech.id);
      }
      
      setTimeout(() => {
        const element = document.getElementById(`tech-${randomTech.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlighted');
          setTimeout(() => {
            element.classList.remove('highlighted');
          }, 2000);
        }
      }, 100);
      
      alert(`Технология "${randomTech.title}" переведена в статус "В процессе"!`);
    } else {
      alert('🎯 Все технологии для изучения уже начаты!');
    }
  };

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    };
    const dataStr = JSON.stringify(data, null, 2);
    
    // Создание и скачивание файла
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `технологии_экспорт_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportModal(true);
  };

  const notStartedCount = technologies.filter(t => t.status === 'not-started').length;
  const inProgressCount = technologies.filter(t => t.status === 'in-progress').length;
  const completedCount = technologies.filter(t => t.status === 'completed').length;

  return (
    <div className="quick-actions">
      <h3>⚡ Быстрые действия</h3>
      
      <div className="actions-grid">
        <button 
          className="action-btn mark-all"
          onClick={onMarkAllCompleted}
          title="Отметить все технологии как изученные"
        >
          <span className="action-icon">✅</span>
          <span className="action-text">Все завершены</span>
        </button>
        
        <button 
          className="action-btn reset-all"
          onClick={onResetAll}
          title="Сбросить статусы всех технологий"
        >
          <span className="action-icon">🔄</span>
          <span className="action-text">Сбросить все</span>
        </button>
        
        <button 
          className="action-btn random-select"
          onClick={handleRandomSelect}
          title="Начать изучение случайной технологии"
          disabled={notStartedCount === 0}
        >
          <span className="action-icon">🎲</span>
          <span className="action-text">Случайный выбор</span>
          <span className="action-badge">{notStartedCount}</span>
        </button>
        
        <button 
          className="action-btn export-data"
          onClick={handleExport}
          title="Экспорт данных в JSON"
        >
          <span className="action-icon">📤</span>
          <span className="action-text">Экспорт данных</span>
        </button>
      </div>
      
      <div className="stats-summary">
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-label">Не начато:</span>
            <span className="stat-value not-started">{notStartedCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">В процессе:</span>
            <span className="stat-value in-progress">{inProgressCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Завершено:</span>
            <span className="stat-value completed">{completedCount}</span>
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <p>Данные успешно экспортированы!</p>
        <p>Файл был скачан на ваш компьютер.</p>
        <div className="modal-actions">
          <button 
            className="modal-btn"
            onClick={() => setShowExportModal(false)}
          >
            Закрыть
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default QuickActions;