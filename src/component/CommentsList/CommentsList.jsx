import React from 'react';
import Comment from '../Comment/Comment';
import useCommentStore from '../../store/commentStore';
import './CommentsList.css';

const CommentsList = () => {
  const { comments } = useCommentStore();

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          user={comment.user}
          timeAgo={comment.timeAgo}
          comment={comment.comment}
          initialScore={comment.initialScore}
          replies={comment.replies}
        />
      ))}
    </div>
  );
};

export default CommentsList;