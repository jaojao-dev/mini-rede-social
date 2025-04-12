import React, { useState } from 'react';
import './Login.css';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: { username: string, password: string }) =>
      user.username === username && user.password === password
    );

    if (user) {
      onLogin(username);
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        {error && <p className="error">{error}</p>}
        <button className='entra' type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;