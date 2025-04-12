import React, { useState } from 'react';
import './Login.css';

interface RegisterProps {
  onRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user: { username: string }) => user.username === username);

    if (existingUser) {
      setError('Usuário já existe');
      return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    onRegister();
  };

  const isFormValid = username && password && confirmPassword && password === confirmPassword;

  return (
    <div className="register">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /> <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> <br />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        /> <br />
        {error && <p className="error">{error}</p>}
        <button className='registrar' type="submit" disabled={!isFormValid}>Registrar</button>
      </form>
      <button onClick={onRegister} className="back-link">Voltar</button>
    </div>
  );
};

export default Register;