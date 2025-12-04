import { useState } from 'react';
import './TechnologyNotes.css';

function TechnologyNotes({ notes, onNotesChange, techId, title }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleNotesChange = (e) => {
    if (onNotesChange) {
      onNotesChange(techId, e.target.value);
    }
  };
  
  return (
    <div className="technology-notes" onClick={(e) => e.stopPropagation()}>
      <div className="notes-header">
        <h4>📝 Заметки к "{title}"</h4>
        <button 
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
        >
          {isExpanded ? 'Свернуть' : 'Развернуть'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="notes-content">
          <textarea
            value={notes || ''}
            onChange={handleNotesChange}
            placeholder="Записывайте сюда важные моменты..."
            rows="4"
            className="notes-textarea"
          />
          <div className="notes-info">
            {notes && notes.length > 0 
              ? `Автосохранено (${notes.length} символов)` 
              : 'Начните вводить заметку...'}
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyNotes;