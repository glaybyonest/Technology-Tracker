import { useState } from 'react';
import './RoadmapImporter.css';

function RoadmapImporter() {
  const [importing, setImporting] = useState(false);

  const handleImportRoadmap = async () => {
    try {
      setImporting(true);
      
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Пример данных для импорта
      const roadmapData = [
        {
          id: Date.now() + 1,
          title: 'GraphQL',
          description: 'Язык запросов для API',
          status: 'not-started',
          category: 'backend',
          notes: ''
        },
        {
          id: Date.now() + 2,
          title: 'Kubernetes',
          description: 'Оркестрация контейнеров',
          status: 'not-started',
          category: 'devops',
          notes: ''
        },
        {
          id: Date.now() + 3,
          title: 'WebSocket',
          description: 'Протокол для двусторонней связи',
          status: 'not-started',
          category: 'backend',
          notes: ''
        }
      ];
      
      const saved = localStorage.getItem('techTrackerData');
      const existing = saved ? JSON.parse(saved) : [];
      const updated = [...existing, ...roadmapData];
      localStorage.setItem('techTrackerData', JSON.stringify(updated));
      
      alert(`✅ Успешно импортировано ${roadmapData.length} технологий!`);
      window.location.reload();
    } catch (err) {
      alert(`❌ Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="roadmap-importer">
      <h3>🌐 Импорт дорожной карты</h3>
      
      <div className="import-content">
        <p>Импортируйте готовый набор технологий для изучения. Это добавит новые технологии к вашим существующим.</p>
        
        <button
          onClick={handleImportRoadmap}
          disabled={importing}
          className="import-btn"
        >
          {importing ? '⏳ Импорт...' : '📥 Импортировать пример'}
        </button>
        
        <div className="import-details">
          <h4>Что будет импортировано:</h4>
          <ul>
            <li>GraphQL - Язык запросов для API</li>
            <li>Kubernetes - Оркестрация контейнеров</li>
            <li>WebSocket - Протокол для двусторонней связи</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RoadmapImporter;