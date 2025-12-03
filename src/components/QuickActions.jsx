import './QuickActions.css';

function QuickActions({ 
  onMarkAllCompleted, 
  onResetAll, 
  onRandomSelect,
  technologies 
}) {
  
  const handleRandomSelect = () => {
    if (!technologies || technologies.length === 0) {
      alert('Нет технологий для выбора!');
      return;
    }
    
    // 1. Ищем технологии со статусом 'not-started'
    const notStartedTechs = technologies.filter(t => t.status === 'not-started');
    
    if (notStartedTechs.length > 0) {
      // Выбираем случайную технологию из не начатых
      const randomIndex = Math.floor(Math.random() * notStartedTechs.length);
      const randomTech = notStartedTechs[randomIndex];
      
      // Меняем статус с 'not-started' на 'in-progress'
      if (onRandomSelect) {
        onRandomSelect(randomTech.id, 'in-progress');
      }
      
      // Прокручиваем к выбранной технологии
      setTimeout(() => {
        const element = document.getElementById(`tech-${randomTech.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Визуальный эффект выделения
          element.classList.add('highlighted');
          setTimeout(() => {
            element.classList.remove('highlighted');
          }, 2000);
        }
      }, 100);
      
      alert(`Технология "${randomTech.title}" переведена в статус "В процессе"!`);
      
    } else {
      // 2. Если все технологии уже начаты (нет 'not-started')
      // Проверяем, есть ли вообще технологии
      const inProgressTechs = technologies.filter(t => t.status === 'in-progress');
      const completedTechs = technologies.filter(t => t.status === 'completed');
      
      if (inProgressTechs.length > 0 || completedTechs.length > 0) {
        alert('🎯 Все технологии для изучения уже начаты!\n\n' +
              `В процессе: ${inProgressTechs.length}\n` +
              `Завершено: ${completedTechs.length}\n\n` +
              'Можете продолжить изучение или отметить некоторые как завершенные.');
      } else {
        alert('Не найдено технологий с подходящим статусом');
      }
    }
  };

  // Подсчитываем статистику для отображения
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
      </div>
  );
}

export default QuickActions;