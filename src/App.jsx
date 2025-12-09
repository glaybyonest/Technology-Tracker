import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import ProgressHeader from './components/ProgressHeader';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';
import TechnologyNotes from './components/TechnologyNotes';
import Navigation from './components/Navigation';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import RoadmapImporter from './components/RoadmapImporter';
import ApiSearch from './components/ApiSearch';

function App() {
  const initialTechnologies = [
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов React и их жизненного цикла', 
      status: 'completed',
      category: 'frontend',
      notes: ''
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX и его особенностей', 
      status: 'in-progress',
      category: 'frontend',
      notes: ''
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов и управление данными', 
      status: 'not-started',
      category: 'frontend',
      notes: ''
    },
    { 
      id: 4, 
      title: 'React Hooks', 
      description: 'Изучение хуков useState, useEffect и создание собственных хуков', 
      status: 'in-progress',
      category: 'frontend',
      notes: ''
    },
    { 
      id: 5, 
      title: 'React Router', 
      description: 'Настройка маршрутизации в React приложениях', 
      status: 'not-started',
      category: 'frontend',
      notes: ''
    },
  ];

  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem('techTrackerData');
    return saved ? JSON.parse(saved) : initialTechnologies;
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredTechnologies, setFilteredTechnologies] = useState(technologies);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
  }, [technologies]);

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

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTechs =>
      prevTechs.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prevTechs => 
      prevTechs.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

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
    setTechnologies(prevTechs =>
      prevTechs.map(t =>
        t.id === techId
          ? {
              ...t,
              status:
                t.status === 'not-started'
                  ? 'in-progress'
                  : t.status === 'in-progress'
                  ? 'completed'
                  : t.status,
            }
          : t
      )
    );

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

  const addTechnologyFromApi = (techData) => {
    const newTech = {
      ...techData,
      id: Date.now(),
      status: 'not-started',
      notes: ''
    };
    
    setTechnologies(prevTechs => [...prevTechs, newTech]);
    alert(`Технология "${techData.title}" добавлена в трекер!`);
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        
        <Routes>
          <Route path="/" element={
            <>
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
              
              <RoadmapImporter />
              
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
                            onStatusChange={handleStatusChange}
                          />
                        </div>

                        <TechnologyNotes
                          techId={tech.id}
                          title={tech.title}
                          notes={tech.notes}
                          onNotesChange={updateTechnologyNotes}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <ApiSearch onAddTechnology={addTechnologyFromApi} />
              
              <footer className="app-footer">
                <p>Трекер изучения технологий {technologies.filter(t => t.status === 'completed').length}/{technologies.length}</p>
              </footer>
            </>
          } />
          
          <Route path="/technologies" element={<TechnologyList />} />
          <Route path="/technology/:techId" element={<TechnologyDetail />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;