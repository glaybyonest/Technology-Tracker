import useLocalStorage from './useLocalStorage';

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

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', initialTechnologies);

  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };


  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  const markAllCompleted = () => {
    setTechnologies(prevTechs => 
      prevTechs.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAll = () => {
    setTechnologies(prevTechs => 
      prevTechs.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    progress: calculateProgress()
  };
}

export default useTechnologies;