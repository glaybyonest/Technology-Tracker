import { useState } from 'react';

function RoadmapImporter() {
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    try {
      setImporting(true);
      
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Примерные данные для импорта
      const roadmapData = [
        {
          id: Date.now() + 1,
          title: 'Next.js',
          description: 'React фреймворк для продакшена',
          status: 'not-started',
          category: 'frontend',
          notes: ''
        },
        {
          id: Date.now() + 2,
          title: 'TypeScript',
          description: 'Типизированный JavaScript',
          status: 'not-started',
          category: 'frontend',
          notes: ''
        },
        {
          id: Date.now() + 3,
          title: 'Docker',
          description: 'Контейнеризация приложений',
          status: 'not-started',
          category: 'devops',
          notes: ''
        }
      ];
      
      const saved = localStorage.getItem('techTrackerData');
      const existing = saved ? JSON.parse(saved) : [];
      const updated = [...existing, ...roadmapData];
      localStorage.setItem('techTrackerData', JSON.stringify(updated));
      
      alert(`Успешно импортировано ${roadmapData.length} технологий!`);
      window.location.reload();
    } catch (err) {
      alert('Ошибка импорта');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="roadmap-importer">
      <h4>🌐 Импорт дорожной карты</h4>
      <button 
        onClick={handleImport} 
        disabled={importing}
        className="btn btn-secondary"
      >
        {importing ? 'Импорт...' : 'Импортировать пример'}
      </button>
      <p className="hint">Добавит примерные технологии к вашим существующим</p>
    </div>
  );
}

export default RoadmapImporter;