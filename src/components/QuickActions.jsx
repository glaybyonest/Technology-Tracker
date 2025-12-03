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
    
    // Находим технологии, которые еще не завершены
    const notCompleted = technologies.filter(t => t.status !== 'completed');
    
    if (notCompleted.length === 0) {
      alert('Все технологии уже изучены! 🎉');
      return;
    }
    
    // Выбираем случайную технологию из незавершенных
    const randomIndex = Math.floor(Math.random() * notCompleted.length);
    const randomTech = notCompleted[randomIndex];
    
    // Определяем следующий статус по циклу
    const getNextStatus = (currentStatus) => {
      switch(currentStatus) {
        case 'not-started': return 'in-progress';
        case 'in-progress': return 'completed';
        case 'completed': return 'not-started';
        default: return 'in-progress';
      }
    };
    
    const nextStatus = getNextStatus(randomTech.status);
    
    if (onRandomSelect) {
      onRandomSelect(randomTech.id, nextStatus);
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
    
    alert(`Выбрана технология: "${randomTech.title}".\nСтатус изменен с "${randomTech.status}" на "${nextStatus}"`);
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
          title="Случайным образом изменить статус одной из технологий"
        >
          <span className="action-icon">🎲</span>
          <span className="action-text">Случайный выбор</span>
          <span className="action-badge">
            {technologies.filter(t => t.status !== 'completed').length}
          </span>
        </button>
      </div>
      
      <div className="stats-summary">
        <div className="stats-row">
          <span>Не начато: <strong>{technologies.filter(t => t.status === 'not-started').length}</strong></span>
          <span>В процессе: <strong>{technologies.filter(t => t.status === 'in-progress').length}</strong></span>
          <span>Завершено: <strong>{technologies.filter(t => t.status === 'completed').length}</strong></span>
        </div>
        <p className="hint">
          <strong>Совет:</strong> Нажмите на любую карточку технологии или используйте кнопку "Случайный выбор" для изменения статусов
        </p>
      </div>
    </div>
  );
}

export default QuickActions;