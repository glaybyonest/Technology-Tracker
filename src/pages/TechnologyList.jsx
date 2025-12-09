import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TechnologyList() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📋 Все технологии</h1>
        <Link to="/" className="btn btn-primary">
          ← На главную
        </Link>
      </div>

      <div className="technologies-list">
        {technologies.map(tech => (
          <div key={tech.id} className="list-item">
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <div className="list-meta">
              <span className={`status status-${tech.status}`}>
                {tech.status === 'completed' ? '✅ Завершено' : 
                 tech.status === 'in-progress' ? '🔄 В процессе' : 
                 '⏳ Не начато'}
              </span>
              <Link to={`/technology/${tech.id}`} className="btn-link">
                Подробнее →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnologyList;