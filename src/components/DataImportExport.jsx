import { useState, useEffect } from 'react';
import './DataImportExport.css';

function DataImportExport() {
  // состояние для списка технологий
  const [technologies, setTechnologies] = useState([]);

  // состояние для сообщений о статусе операций
  const [status, setStatus] = useState('');

  // состояние для перетаскивания файла
  const [isDragging, setIsDragging] = useState(false);

  // загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // функция загрузки данных из localStorage
  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('techTrackerData');
      if (saved) {
        const parsed = JSON.parse(saved);
        setTechnologies(parsed);
        setStatus('✓ Данные загружены из localStorage');
        setTimeout(() => setStatus(''), 3000);
        // Не перезагружаем страницу — просто устанавливаем локальное состояние
      }
    } catch (error) {
      setStatus('✗ Ошибка загрузки данных из localStorage');
      console.error('Ошибка загрузки:', error);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  // функция сохранения данных в localStorage
  // функция сохранения данных в localStorage (реализована ниже)

  // экспорт данных в JSON-файл
  const exportToJSON = () => {
    try {
      // преобразуем данные в JSON-строку с форматированием
      const dataStr = JSON.stringify(technologies, null, 2);

      // создаем Blob объект из строки
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      // создаем временную ссылку для скачивания
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;

      // программно кликаем по ссылке для начала скачивания
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // освобождаем память
      URL.revokeObjectURL(url);

      setStatus(`✓ Экспортировано ${technologies.length} технологий`);
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('✗ Ошибка экспорта данных');
      console.error('Ошибка экспорта:', error);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  // импорт данных из JSON-файла
  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // обработчик завершения чтения файла
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);

        // проверка что импортированные данные - это массив
        if (!Array.isArray(imported)) {
          throw new Error('Неверный формат данных');
        }

        setTechnologies(imported);
        setStatus(`✓ Импортировано ${imported.length} технологий`);
        setTimeout(() => setStatus(''), 3000);

        // сохраняем в localStorage сразу после импорта
        localStorage.setItem('techTrackerData', JSON.stringify(imported));
      } catch (error) {
        setStatus('✗ Ошибка импорта: неверный формат файла');
        console.error('Ошибка импорта:', error);
        setTimeout(() => setStatus(''), 3000);
      }
    };

    // запускаем асинхронное чтение файла как текста
    reader.readAsText(file);

    // сбрасываем значение input для возможности повторного импорта того же файла
    event.target.value = '';
  };

  // обработчики drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
            if (file && file.type === 'application/json') {
      // используем ту же логику чтения что и в importFromJSON
      const reader = new FileReader();
            reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            setTechnologies(imported);
            setStatus(`✓ Импортировано ${imported.length} технологий`);
            setTimeout(() => setStatus(''), 3000);
                  localStorage.setItem('techTrackerData', JSON.stringify(imported));
          }
        } catch (error) {
          setStatus('✗ Ошибка импорта: неверный формат файла');
          setTimeout(() => setStatus(''), 3000);
        }
      };
      reader.readAsText(file);
    } else {
      setStatus('✗ Пожалуйста, выберите JSON файл');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  // Сохранение в localStorage (без перезагрузки страницы)
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('techTrackerData', JSON.stringify(technologies));
      setStatus('✓ Данные сохранены в localStorage');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('✗ Ошибка сохранения данных');
      console.error('Ошибка сохранения:', error);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="data-import-export">
      <h1>📁 Импорт и экспорт данных</h1>

      {/* статусное сообщение */}
      {status && (
        <div className={`status-message ${status.includes('✓') ? 'success' : 'error'}`}>
          {status}
        </div>
      )}

      {/* кнопки управления */}
      <div className="controls">
        <button 
          onClick={exportToJSON} 
          disabled={technologies.length === 0}
          className="btn-control btn-export"
          title="Скачать данные в JSON файл"
        >
          ⬇️ Экспорт в JSON
        </button>

        <label className="file-input-label">
          ⬆️ Импорт из JSON
          <input
            type="file"
            accept=".json"
            onChange={importFromJSON}
            aria-label="Загрузить JSON файл"
          />
        </label>

        <button 
          onClick={saveToLocalStorage} 
          disabled={technologies.length === 0}
          className="btn-control btn-save"
          title="Сохранить в локальное хранилище браузера"
        >
          💾 Сохранить в localStorage
        </button>

        <button 
          onClick={loadFromLocalStorage}
          className="btn-control btn-load"
          title="Загрузить из локального хранилища браузера"
        >
          📂 Загрузить из localStorage
        </button>
      </div>

      {/* область drag-and-drop */}
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label="Область для перетаскивания файлов"
      >
        <div className="drop-icon">📥</div>
        <div className="drop-text">
          Перетащите JSON-файл сюда<br/>
          <span className="drop-hint">или используйте кнопку выше</span>
        </div>
      </div>

      {/* список импортированных технологий */}
      {technologies.length > 0 && (
        <div className="technologies-list">
          <h2>Загруженные технологии ({technologies.length})</h2>
          <ul className="tech-list">
            {technologies.map((tech, index) => (
              <li key={index} className="tech-item">
                <div className="tech-header">
                  <strong>{tech.title || 'Без названия'}</strong>
                  <span className="tech-category">{tech.category || 'unknown'}</span>
                </div>
                {tech.description && (
                  <p className="tech-description">{tech.description}</p>
                )}
                {tech.status && (
                  <span className={`tech-status status-${tech.status}`}>
                    {tech.status}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* пусто */}
      {technologies.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>Нет данных для отображения</h3>
          <p>Импортируйте JSON файл или загрузите данные из localStorage</p>
        </div>
      )}
    </div>
  );
}

export default DataImportExport;
