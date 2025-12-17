import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Простой пример авторизации
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);

      // Обновляем состояние авторизации в App
      if (onLogin) {
        onLogin(username);
      }

      navigate('/');
    } else {
      alert('Неверные данные для входа');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Вход в трекер</h1>
        <p className="login-subtitle">Авторизация не обязательна, но так вы можете протестировать сценарий входа.</p>

        <div className="login-hint">
          <strong>Подсказка для входа (demo):</strong>
          <div>Имя пользователя: <code>admin</code></div>
          <div>Пароль: <code>password</code></div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-username">Имя пользователя</label>
            <input
              id="login-username"
              type="text"
              placeholder="Например, admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Пароль</label>
            <input
              id="login-password"
              type="password"
              placeholder="Например, password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Войти</button>
          <p className="login-note">Вы всегда можете пользоваться приложением и без авторизации.</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
