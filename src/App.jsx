import './App.css';
import ProgressHeader from './components/ProgressHeader';
import TechnologyCard from './components/TechnologyCard';

function App() {
  const technologies = [
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов React и их жизненного цикла', 
      status: 'completed' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX', 
      status: 'in-progress' 
    },
    { 
      id: 3, 
      title: 'React Router', 
      description: 'Работа с состоянием компонентов', 
      status: 'not-started' 
    }
  ];

  return (
    <div className='App'>
      <ProgressHeader technologies={technologies} />
      <div className='technologies-container'>
        <h3>Изучение технологий для изучения</h3>
        <div className='technologies-grid'>
          {technologies.map(tech =>(
           <TechnologyCard
              key={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;