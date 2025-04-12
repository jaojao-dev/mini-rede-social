import React, { useState, useEffect } from 'react';
import './styles/index.css';
import Header from './components/Header';
import Feed from './components/Feed';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import PostForm from './components/PostForm';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [posts, setPosts] = useState<Array<{ id: number; imageUrl: string; description: string; username: string }>>([]);
  

  useEffect(() => {
    // Verifica autenticação no localStorage mas não autentica automaticamente
    const authStatus = localStorage.getItem('isAuthenticated');
    const savedUsername = localStorage.getItem('username');
  
    if (authStatus === 'true' && savedUsername) {
      // Se estiver autenticado, mantém o estado
      setIsAuthenticated(true);
      setUsername(savedUsername);
    } else {
      // Se não, limpa qualquer estado residual
      setIsAuthenticated(false);
      setUsername('');
    }
  
    // Carrega posts do localStorage
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    // Remova a verificação do localStorage aqui
    // Sempre comece com usuário não autenticado
    setIsAuthenticated(false);
    setUsername('');
  }, []);

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleLogin = (user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };

  const handleRegister = () => {
    setIsRegistering(false);
  };

  const handleAddPost = (imageUrl: string, description: string) => {
    const newPost = {
      id: Date.now(),
      imageUrl,
      description,
      username,
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setIsCreatingPost(false);
  };

  const handleCreatePost = () => {
    setIsCreatingPost(true);
  };

  const handleDeletePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };


return (


    <div>
      <Header />
      <div className="app-container">
        {isAuthenticated && <Sidebar 
      username={username} onLogout={handleLogout} onCreatePost={handleCreatePost} />}
        <div className="main-content">
          {!isAuthenticated ? (
            !isRegistering ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Register onRegister={handleRegister} />
            )
          ) : isCreatingPost ? (
            <PostForm 
              onAddPost= {handleAddPost} 
              isCreating={true}  
              toggleFormVisibility={() => setIsCreatingPost(false)} 
            />
          ) : (
            <div>
              <Feed posts={posts} currentUser={username} onDeletePost={handleDeletePost} />
            </div>
          )}
          
          {!isAuthenticated && !isRegistering && (
            <div className="auth-footer"> 
              <p>Não tem conta?</p>
              <button onClick={() => setIsRegistering(true)}>Criar uma Conta</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;