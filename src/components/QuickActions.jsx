import './QuickActions.css';

function QuickActions({ 
  onMarkAllCompleted, 
  onResetAll, 
  onRandomSelect,
  technologies 
}) {
  
  const handleRandomSelect = () => {
    if (!technologies || technologies.length === 0) return;
    
    const notCompleted = technologies.filter(t => t.status !== 'completed');
    
    if (notCompleted.length === 0) {
      alert('Все технологии уже изучены! 🎉');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * notCompleted.length);
    const randomTech = notCompleted[randomIndex];
    
    if (onRandomSelect) {
      onRandomSelect(randomTech.id);
    }
  };

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
          <span className="action-text">Отметить все завершенными</span>
        </button>
        
        <button 
          className="action-btn reset-all"
          onClick={onResetAll}
          title="Сбросить статусы всех технологий"
        >
          <span className="action-icon">🔄</span>
          <span className="action-text">Сбросить все статусы</span>
        </button>
        
        <button 
          className="action-btn random-select"
          onClick={handleRandomSelect}
          title="Выбрать случайную технологию для изучения"
        >
          <span className="action-icon">🎲</span>
          <span className="action-text">Случайный выбор</span>
        </button>
      </div>
      
      <div className="stats-summary">
        <p>
          <strong>Совет:</strong> Нажмите на любую карточку технологии, чтобы изменить её статус
        </p>
      </div>
    </div>
  );
}

export default QuickActions;