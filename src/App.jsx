import { useState, useEffect } from 'react';
import './App.css';
import ProgressHeader from './components/ProgressHeader';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';

function App() {
  const initialTechnologies = [
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов React и их жизненного цикла', 
      status: 'completed',
      category: 'frontend'
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX и его особенностей', 
      status: 'in-progress',
      category: 'frontend'
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов и управление данными', 
      status: 'not-started',
      category: 'frontend'
    },
    { 
      id: 4, 
      title: 'React Hooks', 
      description: 'Изучение хуков useState, useEffect и создание собственных хуков', 
      status: 'in-progress',
      category: 'frontend'
    },
    { 
      id: 5, 
      title: 'React Router', 
      description: 'Настройка маршрутизации в React приложениях', 
      status: 'not-started',
      category: 'frontend'
    },
  ];

  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredTechnologies, setFilteredTechnologies] = useState(initialTechnologies);

  // Фильтрация технологий при изменении фильтра или технологий
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredTechnologies(technologies);
    } else {
      setFilteredTechnologies(
        technologies.filter(tech => tech.status === activeFilter)
      );
    }
  }, [activeFilter, technologies]);

  // Функция изменения статуса технологии
  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prevTechs => 
      prevTechs.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Быстрые действия
  const handleMarkAllCompleted = () => {
    if (window.confirm('Отметить все технологии как завершенные?')) {
      setTechnologies(prevTechs => 
        prevTechs.map(tech => ({ ...tech, status: 'completed' }))
      );
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Сбросить статусы всех технологий?')) {
      setTechnologies(prevTechs => 
        prevTechs.map(tech => ({ ...tech, status: 'not-started' }))
      );
    }
  };

  const handleRandomSelect = (techId) => {
    // Прокручиваем к выбранной технологии
    const element = document.getElementById(`tech-${techId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Визуальный эффект выделения
      element.classList.add('highlighted');
      setTimeout(() => {
        element.classList.remove('highlighted');
      }, 2000);
    }
    
    alert(`Следующая технология для изучения: ${technologies.find(t => t.id === techId)?.title}`);
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
              <div key={tech.id} id={`tech-${tech.id}`}>
                <TechnologyCard
                  id={tech.id}
                  title={tech.title}
                  description={tech.description}
                  status={tech.status}
                  onStatusChange={handleStatusChange}
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