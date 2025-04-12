import React, { useState, useEffect } from 'react';
import Post from './Post';
import './Feed.css';

interface PostType {
  id: number;
  imageUrl: string;
  description: string;
  username: string;
  // Removemos currentUser daqui (não deve estar no PostType)
}

interface FeedProps {
  posts: PostType[];
  currentUser: string;  // Adicionamos currentUser como prop do Feed
  isAdmin?: boolean;    // Adicionamos isAdmin como prop opcional
}

const Feed: React.FC<FeedProps> = ({ posts, currentUser = false }) => {
  const [localPosts, setLocalPosts] = useState<PostType[]>(() => {
    try {
      const savedPosts = localStorage.getItem('posts');
      return savedPosts ? JSON.parse(savedPosts) : posts;
    } catch (error) {
      console.error('Error loading posts:', error);
      return posts;
    }
  });

  // Atualiza o localStorage quando os posts mudam
  useEffect(() => {
    try {
      localStorage.setItem('posts', JSON.stringify(localPosts));
    } catch (error) {
      console.error('Error saving posts:', error);
    }
  }, [localPosts]);

  const handleDeletePost = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      setLocalPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    }
  };

  return (
    <div className="feed">
      {localPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          imageUrl={post.imageUrl}
          description={post.description}
          username={post.username}
          currentUser={currentUser}  // Passamos o currentUser do Feed para o Post
          onDeletePost={handleDeletePost}
        />
      ))}
    </div>
  );
};

export default Feed;