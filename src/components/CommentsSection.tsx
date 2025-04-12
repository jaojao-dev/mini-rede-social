import React, { useState } from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import './CommentsSection.css';

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
}

interface CommentsSectionProps {
  postId: number;
  currentUser: string;
  onClose: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  currentUser,
  onClose
}) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const savedComments = localStorage.getItem(`comments-${postId}`);
      return savedComments ? JSON.parse(savedComments) : [];
    } catch (error) {
      console.error('Error loading comments:', error);
      return [];
    }
  });

  const updateComments = (newComments: Comment[]) => {
    try {
      setComments(newComments);
      localStorage.setItem(`comments-${postId}`, JSON.stringify(newComments));
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        text: commentText,
        author: currentUser,
        timestamp: new Date()
      };
      updateComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
      updateComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="comments-sidebar">
      <div className="comments-header">
        <h3>Comentários ({comments.length})</h3>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <form className="comments-form" onSubmit={handleAddComment}>
        <input
        className='escreva'
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Escreva um comentário..."
          required
        />
        <button type="submit">Enviar</button>
      </form>

      <div className="comments-list">
        {comments.map((comment) => (
          <div className="comment-item" key={comment.id}>
            <div className="comment-header">
              <div className='autor'>
                <span>Enviado por </span>
                <strong> {comment.author} :  </strong>
                <span className="comment-time">
                  {formatDate(comment.timestamp)}
                </span>
              </div>
              <div className='comment-body'>

                <p className="comment-text">{comment.text}</p>

                {comment.author === currentUser && (
                  <FaTrashAlt size={12} className="delete-comment-btn"
                    onClick={() => handleDeleteComment(comment.id)}
                    title="Excluir comentário" />

                )}


              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;