import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';

// компонент карточки технологии с использованием Material-UI
function SimpleTechCard({ technology, onStatusChange }) {
  // helper to compute next status in cycle
  const getNextStatus = (status) => {
    if (status === 'not-started') return 'in-progress';
    if (status === 'in-progress') return 'completed';
    return 'not-started';
  };
  // функция определения цвета чипа в зависимости от статуса
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  // функция получения текста статуса на русском языке
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Завершено';
      case 'in-progress':
        return 'В процессе';
      default:
        return 'Не начато';
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        boxShadow: 3,
        transition: 'all 0.3s ease',
        '&:hover': { boxShadow: 6, transform: 'translateY(-4px)' },
        cursor: 'pointer'
      }}
      onClick={() => onStatusChange(technology.id, getNextStatus(technology.status))}
    >
      <CardContent>
        {/* заголовок карточки */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {technology.title}
        </Typography>

        {/* описание технологии */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {technology.description}
        </Typography>

        {/* чипы с категорией и статусом */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={technology.category}
            variant="outlined"
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
          <Chip
            label={getStatusText(technology.status)}
            color={getStatusColor(technology.status)}
            size="small"
            variant={technology.status === 'completed' ? 'filled' : 'outlined'}
          />
        </Box>
      </CardContent>

      {/* кнопки действий */}
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box>
          {technology.status !== 'completed' && (
            <Button
              size="small"
              variant="contained"
              onClick={(e) => { e.stopPropagation(); onStatusChange(technology.id, 'completed'); }}
              sx={{ mr: 1 }}
            >
              Завершить
            </Button>
          )}

          <Button
            size="small"
            variant="outlined"
            onClick={(e) => { e.stopPropagation(); onStatusChange(technology.id, technology.status === 'in-progress' ? 'not-started' : 'in-progress'); }}
          >
            {technology.status === 'in-progress' ? 'Приостановить' : 'Начать'}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

export default SimpleTechCard;
