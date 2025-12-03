import './FilterButtons.css';

function FilterButtons({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Все', icon: '📋', count: null },
    { id: 'not-started', label: 'Не начатые', icon: '⏳', count: null },
    { id: 'in-progress', label: 'В процессе', icon: '🔄', count: null },
    { id: 'completed', label: 'Завершенные', icon: '✅', count: null }
  ];

  return (
    <div className="filter-buttons">
      <h3>🎯 Фильтр по статусу</h3>
      
      <div className="filter-grid">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
            title={`Показать ${filter.label.toLowerCase()}`}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
            {filter.count !== null && (
              <span className="filter-count">{filter.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterButtons;