import { useState } from 'react';
import './Settings.css';

function Settings() {
  const [fileName, setFileName] = useState('технологии.json');
  const [importData, setImportData] = useState('');
  const [showExportData, setShowExportData] = useState(false);
  const [exportData, setExportData] = useState('');

  const handleExport = () => {
    const data = localStorage.getItem('techTrackerData');
    if (!data) {
      alert('Нет данных для экспорта');
      return;
    }
    
    try {
      const parsed = JSON.parse(data);
      setExportData(JSON.stringify(parsed, null, 2));
      setShowExportData(true);
      
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('✅ Данные успешно экспортированы!');
    } catch (error) {
      alert('❌ Ошибка при экспорте данных');
      console.error(error);
    }
  };

  const handleImport = () => {
    if (!importData.trim()) {
      alert('Введите данные для импорта');
      return;
    }

    try {
      const parsed = JSON.parse(importData);
      
      if (!Array.isArray(parsed)) {
        throw new Error('Данные должны быть массивом');
      }
      
      localStorage.setItem('techTrackerData', importData);
      alert('✅ Данные успешно импортированы!');
      setImportData('');
      window.location.reload();
    } catch (error) {
      alert(`❌ Ошибка импорта: ${error.message}`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        localStorage.setItem('techTrackerData', JSON.stringify(data));
        alert('✅ Данные успешно загружены из файла!');
        window.location.reload();
      } catch (error) {
        alert('❌ Ошибка: файл должен содержать валидный JSON');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('⚠️ Вы уверены? Это удалит все ваши технологии и заметки. Действие нельзя отменить.')) {
      localStorage.removeItem('techTrackerData');
      alert('✅ Данные сброшены. Страница будет перезагружена.');
      window.location.reload();
    }
  };

  const handleClearLocalStorage = () => {
    if (window.confirm('⚠️ Очистить все данные в localStorage? Это удалит все сохраненные технологии.')) {
      localStorage.clear();
      alert('✅ localStorage очищен. Страница будет перезагружена.');
      window.location.reload();
    }
  };

  const getLocalStorageInfo = () => {
    const data = localStorage.getItem('techTrackerData');
    if (!data) return { size: 0, count: 0 };
    
    try {
      const parsed = JSON.parse(data);
      return {
        size: Math.round((data.length * 2) / 1024), // в КБ
        count: Array.isArray(parsed) ? parsed.length : 0
      };
    } catch {
      return { size: 0, count: 0 };
    }
  };

  const storageInfo = getLocalStorageInfo();

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>⚙️ Настройки</h1>
        <div className="storage-info">
          <span className="storage-size">{storageInfo.size} КБ</span>
          <span className="tech-count">{storageInfo.count} технологий</span>
        </div>
      </div>

      <div className="settings-section">
        <h3>📤 Экспорт данных</h3>
        <div className="export-options">
          <div className="form-group">
            <label htmlFor="filename">Имя файла</label>
            <input
              type="text"
              id="filename"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="технологии.json"
            />
          </div>
          <button onClick={handleExport} className="btn btn-primary">
            📥 Экспортировать в JSON
          </button>
        </div>
        
        <div className="export-actions">
          <button 
            onClick={() => setShowExportData(!showExportData)} 
            className="btn btn-secondary"
          >
            {showExportData ? 'Скрыть данные' : 'Показать данные'}
          </button>
        </div>
        
        {showExportData && exportData && (
          <div className="export-preview">
            <h4>Данные для экспорта:</h4>
            <pre>{exportData}</pre>
          </div>
        )}
      </div>

      <div className="settings-section">
        <h3>📥 Импорт данных</h3>
        <div className="import-options">
          <div className="import-method">
            <h4>Загрузить из файла</h4>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="file-input"
            />
            <p className="hint">Выберите JSON файл с данными технологий</p>
          </div>
          
          <div className="import-method">
            <h4>Или вставьте JSON</h4>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder='[{ "id": 1, "title": "Пример", ... }]'
              rows="8"
              className="import-textarea"
            />
            <button 
              onClick={handleImport} 
              className="btn btn-primary"
              disabled={!importData.trim()}
            >
              Импортировать
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h3>⚠️ Опасная зона</h3>
        <div className="danger-actions">
          <div className="danger-action">
            <h4>Сбросить все данные</h4>
            <p>Удалить все технологии и заметки из приложения</p>
            <button onClick={handleReset} className="btn btn-danger">
              🗑️ Сбросить данные
            </button>
          </div>
          
          <div className="danger-action">
            <h4>Очистить localStorage</h4>
            <p>Полностью очистить все данные в браузере</p>
            <button onClick={handleClearLocalStorage} className="btn btn-danger">
              🧹 Очистить хранилище
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>ℹ️ Информация о приложении</h3>
        <div className="app-info">
          <div className="info-item">
            <span className="info-label">Версия приложения:</span>
            <span className="info-value">1.2.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Технологий в хранилище:</span>
            <span className="info-value">{storageInfo.count}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Размер данных:</span>
            <span className="info-value">{storageInfo.size} КБ</span>
          </div>
          <div className="info-item">
            <span className="info-label">Тип хранилища:</span>
            <span className="info-value">localStorage</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;