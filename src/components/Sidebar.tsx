import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  username: string;
  onLogout: () => void;
  onCreatePost: () => void; // Função para abrir o formulário de novo post
}

const Sidebar: React.FC<SidebarProps> = ({ username, onLogout, onCreatePost }) => {
  return (
    <div className="sidebar">
      <p>Usuário: {username}</p>
      {/* Botão para abrir o formulário de criação de post */}
      <button onClick={onCreatePost}>Criar Novo Post</button>
      <button className='sidebar-button-logout'  onClick={onLogout}>Sair</button>
    </div>
  );
};

export default Sidebar;
