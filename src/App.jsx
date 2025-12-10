import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import './App.css';
import Dashboard from './components/Dashboard';
import SimpleTechCard from './components/SimpleTechCard';
import Notification from './components/Notification';
import { useTheme } from './hooks/useTheme';
import { lightTheme, darkTheme } from './theme/muiTheme';
import ProgressHeader from './components/ProgressHeader';
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
import TechnologyForm from './components/TechnologyForm';
import WorkingAccessibleForm from './components/WorkingAccessibleForm';
import DataImportExport from './components/DataImportExport';
import BulkEditTechnologies from './components/BulkEditTechnologies';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [notification, setNotification] = useState({ open: false, message: '', title: '', type: 'info' });

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
    {
      id: 6,
      title: 'Express.js',
      description: 'Создание RESTful API с Express.js',
      status: 'in-progress',
      category: 'backend',
      notes: ''
    },
    {
      id: 7,
      title: 'MongoDB',
      description: 'Работа с документо-ориентированной базой данных',
      status: 'not-started',
      category: 'database',
      notes: ''
    },
    {
      id: 8,
      title: 'Material-UI',
      description: 'Компонентная библиотека Material Design для React',
      status: 'in-progress',
      category: 'ui-library',
      notes: ''
    }
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
                    : t.status
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
    setNotification({
      open: true,
      message: `Выбранная технология: ${chosen.title || '—'}`,
      title: 'Случайный выбор',
      type: 'info'
    });
  };

  const addTechnologyFromApi = (techData) => {
    const newTech = {
      ...techData,
      id: Date.now(),
      status: 'not-started',
      notes: ''
    };

    setTechnologies(prevTechs => [...prevTechs, newTech]);
    setNotification({
      open: true,
      message: `Технология "${techData.title}" добавлена в трекер!`,
      title: 'Успешно',
      type: 'success'
    });
  };

  const handleBulkUpdate = (selectedIds, updates) => {
    setTechnologies(prevTechs =>
      prevTechs.map(tech =>
        selectedIds.includes(tech.id) ? { ...tech, ...updates } : tech
      )
    );
  };

  const handleSaveTechnology = (formData) => {
    if (formData.id) {
      setTechnologies(prevTechs =>
        prevTechs.map(tech =>
          tech.id === formData.id ? { ...tech, ...formData } : tech
        )
      );
      setNotification({
        open: true,
        message: 'Технология успешно обновлена',
        title: 'Готово',
        type: 'success'
      });
    } else {
      const newTech = {
        ...formData,
        id: Date.now(),
        status: 'not-started',
        notes: ''
      };
      setTechnologies(prevTechs => [...prevTechs, newTech]);
      setNotification({
        open: true,
        message: 'Новая технология добавлена',
        title: 'Готово',
        type: 'success'
      });
    }
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router basename={import.meta.env.BASE_URL || '/'}>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Navigation />

          <Routes>
            <Route
              path="/"
              element={
                <Box sx={{ py: 4 }}>
                  <Container maxWidth="lg">
                    <Dashboard
                      technologies={technologies}
                      onThemeToggle={toggleTheme}
                      isDarkMode={isDarkMode}
                      onNotify={(payload) => setNotification({ open: true, ...payload })}
                    />

                    <Box sx={{ mt: 6 }}>
                      <ProgressHeader technologies={technologies} />
                    </Box>

                    <Box sx={{ mt: 4, mb: 4, display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                      <Box sx={{ flex: 1 }}>
                        <QuickActions
                          onMarkAllCompleted={handleMarkAllCompleted}
                          onResetAll={handleResetAll}
                          onRandomSelect={handleRandomSelect}
                          technologies={technologies}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <FilterButtons
                          activeFilter={activeFilter}
                          onFilterChange={setActiveFilter}
                        />
                      </Box>
                    </Box>

                    <RoadmapImporter />

                    <Box sx={{ my: 4 }}>
                      <input
                        type="text"
                        placeholder="🔍 Поиск технологий..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          borderRadius: '8px',
                          border: `2px solid ${isDarkMode ? '#444' : '#ddd'}`,
                          backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                          color: isDarkMode ? '#fff' : '#000',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gap: 2, mb: 6 }}>
                      {filteredTechnologies.map((tech) => (
                        <Box key={tech.id} id={`tech-${tech.id}`}>
                          <SimpleTechCard
                            technology={tech}
                            onStatusChange={handleStatusChange}
                          />
                          <TechnologyNotes
                            techId={tech.id}
                            title={tech.title}
                            notes={tech.notes}
                            onNotesChange={updateTechnologyNotes}
                          />
                        </Box>
                      ))}
                    </Box>

                    <Box sx={{ mt: 6 }}>
                      <ApiSearch onAddTechnology={addTechnologyFromApi} />
                    </Box>
                  </Container>
                </Box>
              }
            />

            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/add-technology"
              element={
                <Container maxWidth="md" sx={{ py: 4 }}>
                  <TechnologyForm
                    onSave={handleSaveTechnology}
                    onCancel={() => window.history.back()}
                  />
                </Container>
              }
            />
            <Route path="/import-export" element={<DataImportExport />} />
            <Route
              path="/bulk-edit"
              element={
                <Container maxWidth="lg" sx={{ py: 4 }}>
                  <BulkEditTechnologies
                    technologies={technologies}
                    onUpdate={handleBulkUpdate}
                  />
                </Container>
              }
            />
            <Route path="/contact" element={<WorkingAccessibleForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Notification
            open={notification.open}
            onClose={() => setNotification({ ...notification, open: false })}
            message={notification.message}
            title={notification.title}
            type={notification.type}
          />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;