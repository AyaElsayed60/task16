import React, { useState } from 'react';
import './Comment.css';
import undoIcon from '../../assets/image/icon-reply.svg';
import deleteIcon from '../../assets/image/icon-delete.svg';
import editIcon from '../../assets/image/icon-edit.svg';
import useCommentStore from '../../store/commentStore';

const Comment = ({ id, user, timeAgo, comment, initialScore, replies }) => {
  const { editComment, deleteComment, replyToComment, deleteReply } = useCommentStore();
  const [score, setScore] = useState(initialScore);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleUpvote = () => setScore(score + 1);
  const handleDownvote = () => setScore(score - 1);
  const handleEditSubmit = () => {
    editComment(id, editText);
    setIsEditing(false);
  };
  const handleReplySubmit = () => {
    if (replyText.trim()) {
      replyToComment(id, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };
  const handleDeleteReply = (replyId) => deleteReply(id, replyId);

  return (
    <div className="comment">
      <div className="score">
        <button className="upvote" onClick={handleUpvote}>+</button>
        <span>{score}</span>
        <button className="downvote" onClick={handleDownvote}>-</button>
      </div>
      <div className="content">
        <div className="user-info">
          <img src={user.avatar} className="avatar" alt="User Avatar" />
          <span className="username">{user.name}</span>
          {user.name === 'juliusomo' && <span className="you">(you)</span>}
          <span className="time">{timeAgo}</span>
          <div className="actions">
            {user.name !== 'juliusomo' && (
              <button className="reply-button" onClick={() => setIsReplying(!isReplying)}>
                <img src={undoIcon} className="reply-icon" alt="Reply Icon" />Reply
              </button>
            )}
          </div>
          {user.name === 'juliusomo' && (
            <div className="edit-delete-buttons">
              <button className="delete-button" onClick={() => deleteComment(id)}>
                <img src={deleteIcon} className="delete-icon" alt="Delete Icon" />Delete
              </button>
              <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
                <img src={editIcon} className="edit-icon" alt="Edit Icon" />{isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
          )}
        </div>
        {isEditing ? (
          <div className="comment-text">
            <textarea className="textarea" value={editText} onChange={(e) => setEditText(e.target.value)} />
            <button className="save-button" onClick={handleEditSubmit}>Save</button>
          </div>
        ) : (
          <div className="comment-text">{comment}</div>
        )}
        {isReplying && (
          <div className="reply-form">
            <textarea className="textarea" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." />
            <button className="save-button" onClick={handleReplySubmit}>Save</button>
          </div>
        )}
        {replies && replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <div key={reply.id} className="reply">
                <div className="user-info">
                  <img src={reply.user.avatar} className="avatar" alt="User Avatar" />
                  <span className="username">{reply.user.name}</span>
                  <span className="time">{reply.timeAgo}</span>
                  <button className="delete-reply-button" onClick={() => handleDeleteReply(reply.id)}>
                    <img src={deleteIcon} className="delete-icon" alt="Delete Icon" />Delete
                  </button>
                </div>
                <div className="comment-text">{reply.comment}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;