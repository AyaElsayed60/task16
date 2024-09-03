import React, { useState } from 'react';
import './CommentForm.css';
import Avatar3 from '../../assets/image/image-juliusomo.png';
import useCommentStore from '../../store/commentStore';

const CommentForm = () => {
  const { addComment } = useCommentStore();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        user: { name: 'juliusomo', avatar: Avatar3 },
        timeAgo: 'just now',
        comment: commentText,
        initialScore: 0,
        replies: [],
      };
      addComment(newComment);
      setCommentText('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <img src={Avatar3} className="avatar" alt="User Avatar" />
      <textarea
        className="textarea"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit" className="submit-button">Send</button>
    </form>
  );
};

export default CommentForm;