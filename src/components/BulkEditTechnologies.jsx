import { useState } from 'react';
import './BulkEditTechnologies.css';

function BulkEditTechnologies({ technologies = [], onUpdate }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('');
  const [message, setMessage] = useState('');

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(technologies.map(tech => tech.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const applyChanges = () => {
    if (selectedIds.length === 0) {
      setMessage('✗ Пожалуйста, выберите технологии');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (!newStatus && !newCategory && !newDifficulty) {
      setMessage('✗ Пожалуйста, выберите хотя бы один параметр для изменения');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const updates = {};
    if (newStatus) updates.status = newStatus;
    if (newCategory) updates.category = newCategory;
    if (newDifficulty) updates.difficulty = newDifficulty;

    onUpdate(selectedIds, updates);

    // очистка формы
    setSelectedIds([]);
    setNewStatus('');
    setNewCategory('');
    setNewDifficulty('');
    setMessage(`✓ Обновлено ${selectedIds.length} технологий`);
    setTimeout(() => setMessage(''), 3000);
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  return (
    <div className="bulk-edit-container">
      <h2>📋 Массовое редактирование</h2>

      {message && (
        <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {/* статус выбора */}
      <div className="selection-info" role="status" aria-live="polite">
        {selectedIds.length > 0 ? (
          <span>
            Выбрано: <strong>{selectedIds.length}</strong> из {technologies.length}
          </span>
        ) : (
          <span>Не выбрано ни одной технологии</span>
        )}
      </div>

      {/* список технологий */}
      <div className="technologies-selector">
        <div className="select-all-container">
          <input
            id="select-all"
            type="checkbox"
            checked={selectedIds.length === technologies.length && technologies.length > 0}
            onChange={handleSelectAll}
            aria-label="Выбрать все технологии"
          />
          <label htmlFor="select-all">Выбрать все</label>
        </div>

        <div className="tech-checkboxes">
          {technologies.length === 0 ? (
            <p className="no-items">Нет технологий для редактирования</p>
          ) : (
            technologies.map(tech => (
              <div key={tech.id} className="checkbox-item">
                <input
                  id={`tech-${tech.id}`}
                  type="checkbox"
                  checked={selectedIds.includes(tech.id)}
                  onChange={() => handleSelectItem(tech.id)}
                  aria-label={`Выбрать технологию ${tech.title}`}
                />
                <label htmlFor={`tech-${tech.id}`}>
                  <span className="tech-title">{tech.title}</span>
                  <span className="tech-meta">
                    <span className={`badge status-${tech.status}`}>{tech.status}</span>
                    <span className="badge category">{tech.category}</span>
                    <span className="badge difficulty">{tech.difficulty || '—'}</span>
                  </span>
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* параметры для изменения */}
      {selectedIds.length > 0 && (
        <div className="bulk-options">
          <div className="option-group">
            <label htmlFor="bulk-status">Новый статус (необязательно)</label>
            <select
              id="bulk-status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              aria-label="Выбрать новый статус"
            >
              <option value="">-- Не изменять --</option>
              <option value="not-started">Не начинано</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершено</option>
            </select>
          </div>

          <div className="option-group">
            <label htmlFor="bulk-category">Новая категория (необязательно)</label>
            <select
              id="bulk-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              aria-label="Выбрать новую категорию"
            >
              <option value="">-- Не изменять --</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">База данных</option>
              <option value="devops">DevOps</option>
              <option value="mobile">Мобильные</option>
              <option value="other">Другое</option>
            </select>
          </div>

          <div className="option-group">
            <label htmlFor="bulk-difficulty">
              <span className="label-icon" aria-hidden="true">🎚️</span>
              Новый уровень сложности (необязательно)
            </label>
            <select
              id="bulk-difficulty"
              value={newDifficulty}
              onChange={(e) => setNewDifficulty(e.target.value)}
              aria-label="Выбрать новый уровень сложности"
            >
              <option value="">-- Не изменять --</option>
              <option value="beginner">Начальный</option>
              <option value="intermediate">Средний</option>
              <option value="advanced">Продвинутый</option>
            </select>
          </div>
        </div>
      )}

      {/* кнопки действий */}
      <div className="bulk-actions">
        <button
          onClick={applyChanges}
          disabled={selectedIds.length === 0}
          className="btn-apply"
          aria-label={`Применить изменения к ${selectedIds.length} выбранным технологиям`}
        >
          ✓ Применить изменения
        </button>
        <button
          onClick={clearSelection}
          disabled={selectedIds.length === 0}
          className="btn-clear"
          aria-label="Отменить выбор"
        >
          ✕ Отменить выбор
        </button>
      </div>
    </div>
  );
}

export default BulkEditTechnologies;
