import React from 'react';
import { FaAngellist} from 'react-icons/fa';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
           
      <h1 className="logo"> <FaAngellist/> Interactive</h1>
      </div>
    </header>
  );
};

export default Header;