import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Container
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from '@mui/icons-material';

// компонент для содержимого вкладки
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Dashboard({ technologies, onThemeToggle, isDarkMode, onNotify }) {
  const [tabValue, setTabValue] = React.useState(0);

  // расчет статистики на основе массива technologies
  const stats = {
    total: technologies.length,
    completed: technologies.filter((t) => t.status === 'completed').length,
    inProgress: technologies.filter((t) => t.status === 'in-progress').length,
    notStarted: technologies.filter((t) => t.status === 'not-started').length
  };

  // расчет процента выполнения
  const completionPercentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  // обработчик переключения вкладок
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* шапка приложения */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Панель управления технологиями
          </Typography>

          {/* кнопка переключения темы */}
          <IconButton color="inherit" onClick={onThemeToggle} sx={{ mr: 2 }}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* иконка уведомлений с бейджем */}
          <IconButton
            color="inherit"
            onClick={() => onNotify && onNotify({ message: 'Нет новых уведомлений', title: 'Уведомления', type: 'info' })}
            aria-label="Уведомления"
          >
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* вкладки */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ pt: 1 }}>
            <Tab label="Обзор" />
            <Tab label="Статистика" />
          </Tabs>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* вкладка обзора */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* статистические карточки */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', boxShadow: 2, transition: 'all 0.3s ease', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircleIcon
                      color="success"
                      sx={{ mr: 1, fontSize: 28 }}
                    />
                    <Typography color="text.secondary" variant="body2">
                      Завершено
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.completed}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', boxShadow: 2, transition: 'all 0.3s ease', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ScheduleIcon
                      color="warning"
                      sx={{ mr: 1, fontSize: 28 }}
                    />
                    <Typography color="text.secondary" variant="body2">
                      В процессе
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.inProgress}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', boxShadow: 2, transition: 'all 0.3s ease', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TrendingUpIcon color="info" sx={{ mr: 1, fontSize: 28 }} />
                    <Typography color="text.secondary" variant="body2">
                      Не начато
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.notStarted}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', boxShadow: 2, transition: 'all 0.3s ease', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    Общий прогресс
                  </Typography>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    {completionPercentage}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={completionPercentage}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* недавно добавленные технологии */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Недавно добавленные
                  </Typography>
                  <List>
                    {technologies.length > 0 ? (
                      technologies.slice(0, 5).map((tech) => (
                        <ListItem key={tech.id} sx={{ py: 1.5 }}>
                          <ListItemText
                            primary={tech.title}
                            secondary={tech.category}
                            primaryTypographyProps={{
                              sx: { fontWeight: 500 }
                            }}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <Typography color="text.secondary">
                        Нет добавленных технологий
                      </Typography>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* распределение по категориям */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    По категориям
                  </Typography>
                  <List>
                    {['frontend', 'backend', 'database', 'ui-library', 'other'].map(
                      (category) => {
                        const count = technologies.filter(
                          (t) => t.category === category
                        ).length;
                        return count > 0 ? (
                          <ListItem key={category} sx={{ py: 1.5 }}>
                            <ListItemText
                              primary={category}
                              secondary={`${count} технологий`}
                              primaryTypographyProps={{
                                sx: { fontWeight: 500, textTransform: 'capitalize' }
                              }}
                            />
                          </ListItem>
                        ) : null;
                      }
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* вкладка статистики */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Детальная статистика
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Общая информация
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ mb: 1.5, fontSize: '1.1rem' }}>
                      <strong>Всего технологий:</strong> {stats.total}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: '1.1rem' }}>
                      <strong>Завершено:</strong> {stats.completed}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: '1.1rem' }}>
                      <strong>В процессе:</strong> {stats.inProgress}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: '1.1rem' }}>
                      <strong>Не начато:</strong> {stats.notStarted}
                    </Typography>
                    <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                      <Typography sx={{ fontSize: '1.2rem' }}>
                        <strong>Процент выполнения: {completionPercentage}%</strong>
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={completionPercentage}
                        sx={{ height: 10, borderRadius: 4, mt: 2 }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  );
}

export default Dashboard;
