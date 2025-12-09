import { useState } from 'react';

function Settings() {
  const [fileName, setFileName] = useState('технологии.json');

  const handleExport = () => {
    const data = localStorage.getItem('techTrackerData');
    if (!data) {
      alert('Нет данных для экспорта');
      return;
    }
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Данные успешно экспортированы!');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        localStorage.setItem('techTrackerData', JSON.stringify(data));
        alert('Данные успешно загружены из файла!');
        window.location.reload();
      } catch (error) {
        alert('Ошибка: файл должен содержать валидный JSON');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Вы уверены? Это удалит все ваши технологии и заметки.')) {
      localStorage.removeItem('techTrackerData');
      alert('Данные сброшены. Страница будет перезагружена.');
      window.location.reload();
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>⚙️ Настройки</h1>
      </div>

      <div className="settings-section">
        <h3>Экспорт данных</h3>
        <div className="export-options">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Имя файла"
          />
          <button onClick={handleExport} className="btn btn-primary">
            📤 Экспортировать в JSON
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Импорт данных</h3>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="file-input"
        />
        <p className="hint">Выберите JSON файл для импорта данных</p>
      </div>

      <div className="settings-section danger-zone">
        <h3>⚠️ Опасная зона</h3>
        <p>Это действие нельзя отменить. Все ваши технологии и заметки будут удалены.</p>
        <button onClick={handleReset} className="btn btn-danger">
          🗑️ Сбросить все данные
        </button>
      </div>
    </div>
  );
}

export default Settings;