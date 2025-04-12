import React, { useState } from 'react';
import './PostForm.css';

interface PostFormProps {
  onAddPost: (imageUrl: string, description: string, username: string) => void; // Passa o username
  isCreating: boolean; // Verifica se deve exibir o formulário ou não
  toggleFormVisibility: () => void; // Função para fechar o formulário
  username: string; // Nome do usuário
}

const PostForm: React.FC<PostFormProps> = ({ onAddPost, isCreating, toggleFormVisibility, username }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  // Função para lidar com a mudança da imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);

      // Lê a imagem como URL base64 e define a URL para exibição
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file); // Lê o arquivo da imagem
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image && description) {
      onAddPost(imageUrl || '', description, username); // Envia a URL da imagem, descrição e o nome do usuário
      setImage(null); // Limpa o estado da imagem
      setImageUrl(null); // Limpa a pré-visualização da imagem
      setDescription(''); // Limpa a descrição
      toggleFormVisibility(); // Fecha o formulário
    }  else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div>
      {isCreating ? (
        <form onSubmit={handleSubmit} className="post-form">
          <label htmlFor="file-input" className="custom-file-button">
            Escolher Imagem
          </label>

          {/* Input de file escondido */}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-file"
          />

          {imageUrl && <img src={imageUrl} alt="Preview" className="image-preview" />}

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
          />

          <button type="submit" className="post-form-button">
            Adicionar Post
          </button>

          {/* Botão de cancelar para voltar ao feed */}
          <button type="button" onClick={toggleFormVisibility} className="cancel-post-button">
            Cancelar
          </button>
        </form>
      ) : (
        <button onClick={toggleFormVisibility} className="create-post-button">
          Criar Novo Post
        </button>
      )}
    </div>
  );
};

export default PostForm;
