import { useState, useEffect } from 'react';
import './App.css';
import ProgressHeader from './components/ProgressHeader';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';
import TechnologyNotes from './components/TechnologyNotes';
import useTechnologies from './hooks/useTechnologies';

function App() {
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    markAllCompleted, 
    resetAll 
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredTechnologies, setFilteredTechnologies] = useState(technologies);
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация технологий
  useEffect(() => {
    let result = technologies;

    if (activeFilter !== 'all') {
      result = result.filter(tech => tech.status === activeFilter);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(tech =>
        tech.title.toLowerCase().includes(query) ||
        tech.description.toLowerCase().includes(query) ||
        (tech.notes && tech.notes.toLowerCase().includes(query))
      );
    }

    setFilteredTechnologies(result);
  }, [activeFilter, technologies, searchQuery]);

  // Быстрые действия
  const handleMarkAllCompleted = () => {
    if (window.confirm('Отметить все технологии как завершенные?')) {
      markAllCompleted();
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Сбросить статусы всех технологий?')) {
      resetAll();
    }
  };

  const handleRandomSelect = (techId) => {
    updateStatus(techId, 'in-progress');
    
    setTimeout(() => {
      const element = document.getElementById(`tech-${techId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlighted');
        setTimeout(() => {
          element.classList.remove('highlighted');
        }, 2000);
      }
    }, 100);

    const chosen = technologies.find(t => t.id === techId) || {};
    alert(`Выбранная технология: ${chosen.title || '—'}`);
  };

  return (
    <div className="App">
      <ProgressHeader technologies={technologies} />
      
      <div className="controls-section">
        <QuickActions 
          onMarkAllCompleted={handleMarkAllCompleted}
          onResetAll={handleResetAll}
          onRandomSelect={handleRandomSelect}
          technologies={technologies}
        />
        
        <FilterButtons 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
      
      <div className="search-container">
        <div className="search-box">
          <input 
            type="text"
            placeholder="🔍 Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-count">Найдено: {filteredTechnologies.length}</span>
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Очистить поиск"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="technologies-container">
        <h3>
          📚 Технологии для изучения 
          <span className="filter-indicator">
            ({filteredTechnologies.length} из {technologies.length})
          </span>
        </h3>
        
        {filteredTechnologies.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h4>Нет технологий с выбранным статусом</h4>
            <p>Попробуйте выбрать другой фильтр или измените статусы технологий</p>
            <button 
              className="reset-filter-btn"
              onClick={() => setActiveFilter('all')}
            >
              Показать все технологии
            </button>
          </div>
        ) : (
          <div className="technologies-grid">
            {filteredTechnologies.map(tech => (
              <div key={tech.id} className="tech-item">
                <div id={`tech-${tech.id}`}>
                  <TechnologyCard
                    id={tech.id}
                    title={tech.title}
                    description={tech.description}
                    status={tech.status}
                    onStatusChange={updateStatus}
                  />
                </div>

                <TechnologyNotes
                  techId={tech.id}
                  title={tech.title}
                  notes={tech.notes}
                  onNotesChange={updateNotes}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <footer className="app-footer">
        <p>Трекер изучения технологий {technologies.filter(t => t.status === 'completed').length}/{technologies.length}</p>
      </footer>
    </div>
  );
}

export default App;