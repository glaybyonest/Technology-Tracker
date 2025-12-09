import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './TechnologyDetail.css';

function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const [technology, setTechnology] = useState(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      try {
        const technologies = JSON.parse(saved);
        const tech = technologies.find(t => t.id === parseInt(techId));
        if (tech) {
          setTechnology(tech);
          setNotes(tech.notes || '');
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    }
    setLoading(false);
  }, [techId]);

  const updateStatus = (newStatus) => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      try {
        const technologies = JSON.parse(saved);
        const updated = technologies.map(tech =>
          tech.id === parseInt(techId) ? { ...tech, status: newStatus } : tech
        );
        localStorage.setItem('techTrackerData', JSON.stringify(updated));
        setTechnology({ ...technology, status: newStatus });
        alert(`Статус обновлен на: ${getStatusText(newStatus)}`);
      } catch (error) {
        console.error('Ошибка обновления статуса:', error);
      }
    }
  };

  const updateNotes = () => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved && technology) {
      try {
        const technologies = JSON.parse(saved);
        const updated = technologies.map(tech =>
          tech.id === parseInt(techId) ? { ...tech, notes } : tech
        );
        localStorage.setItem('techTrackerData', JSON.stringify(updated));
        alert('Заметки сохранены!');
      } catch (error) {
        console.error('Ошибка сохранения заметок:', error);
      }
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'not-started': 'Не начато',
      'in-progress': 'В процессе',
      'completed': 'Завершено'
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div className="technology-detail-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!technology) {
    return (
      <div className="technology-detail-page">
        <div className="not-found">
          <h1>Технология не найдена</h1>
          <p>Технология с ID {techId} не существует.</p>
          <Link to="/technologies" className="btn btn-primary">
            ← Назад к списку
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="technology-detail-page">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Назад
        </button>
        <h1>{technology.title}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            <button
              onClick={() => updateStatus('not-started')}
              className={`status-btn ${technology.status === 'not-started' ? 'active' : ''}`}
            >
              ⏳ Не начато
            </button>
            <button
              onClick={() => updateStatus('in-progress')}
              className={`status-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
            >
              🔄 В процессе
            </button>
            <button
              onClick={() => updateStatus('completed')}
              className={`status-btn ${technology.status === 'completed' ? 'active' : ''}`}
            >
              ✅ Завершено
            </button>
          </div>
          <p className="current-status">
            Текущий статус: <strong>{getStatusText(technology.status)}</strong>
          </p>
        </div>

        <div className="detail-section">
          <h3>Заметки</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={updateNotes}
            placeholder="Записывайте сюда важные моменты..."
            rows="6"
            className="notes-textarea"
          />
          <div className="notes-info">
            {notes.length > 0 
              ? `Автосохранение (${notes.length} символов)` 
              : 'Начните вводить заметку...'}
          </div>
        </div>

        <div className="detail-section">
          <h3>Информация</h3>
          <div className="tech-meta">
            <div className="meta-item">
              <span className="meta-label">ID:</span>
              <span className="meta-value">{technology.id}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Категория:</span>
              <span className="meta-value">{technology.category || 'Не указана'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Дата добавления:</span>
              <span className="meta-value">
                {new Date(technology.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <Link to="/technologies" className="btn btn-secondary">
            ← Все технологии
          </Link>
          <Link to="/" className="btn btn-primary">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;