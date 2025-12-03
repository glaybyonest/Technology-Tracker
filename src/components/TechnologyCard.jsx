import './TechnologyCard.css';

function TechnologyCard({ title, description, status}) {
    return (
        <div className={`technology-card status-${status}`}>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className='status-indicator'>
                Статус: <span className='status-text'>{status}</span>
            </div>
        </div>
    );
}

export default TechnologyCard;