import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TechnologyDetail() {
  const { id } = useParams();
  const [technology, setTechnology] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      const technologies = JSON.parse(saved);
      const tech = technologies.find(t => t.id === parseInt(id));
      setTechnology(tech);
    }
  }, [id]);

  if (!technology) {
    return (
      <div className="page-container">
        <div className="not-found">
          <h1>Технология не найдена</h1>
          <Link to="/technologies" className="btn">
            ← Назад к списку
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/technologies" className="back-btn">
          ← Назад
        </Link>
        <h1>{technology.title}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Статус</h3>
          <span className={`status-badge status-${technology.status}`}>
            {technology.status === 'completed' ? '✅ Завершено' : 
             technology.status === 'in-progress' ? '🔄 В процессе' : 
             '⏳ Не начато'}
          </span>
        </div>

        {technology.notes && (
          <div className="detail-section">
            <h3>Заметки</h3>
            <p>{technology.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologyDetail;