import React, { useState } from 'react';
import { FaHeart, FaComment, FaTrashAlt } from 'react-icons/fa';
import CommentsSection from './CommentsSection'; // Importe o novo componente
import './Post.css';

interface PostProps {
  id: number;
  imageUrl: string;
  description: string;
  username: string;
  currentUser: string; // Adicione esta prop
  onDeletePost: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ id, imageUrl, description, username,currentUser, onDeletePost }) => {
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem(`likes-${id}`);
    return savedLikes ? parseInt(savedLikes, 10) : 0;
  });

  const [showComments, setShowComments] = useState(false);

  const updateLikes = (newLikes: number) => {
    setLikes(newLikes);
    localStorage.setItem(`likes-${id}`, newLikes.toString());
  };

  const handleLike = () => {
    updateLikes(likes + 1);
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleDeleteClick = () => {
    onDeletePost(id);
  };

  return (
    <div className="post">
      <div className="post-header">
        <strong> Criador: {username}</strong>
      </div>
      <img className="post-image" src={imageUrl} alt="Post" />
      <p className="post-description">{description}</p>
      <div className="post-actions">
        <div className="like-button" onClick={handleLike}>
          <FaHeart />
          <span>{likes} Likes</span>
        </div>
        <FaComment className="comment-button" onClick={handleCommentToggle} />
        <button className="delete-button" onClick={handleDeleteClick}>
          <FaTrashAlt />
        </button>
      </div>
      
      {showComments && (
        <CommentsSection 
          postId={id} 
          currentUser={currentUser} // Passe o usuário atual
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  );
};

export default Post;