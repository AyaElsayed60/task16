import { create } from 'zustand';
import avatar1 from '../assets/image/image-amyrobson.png';
import avatar2 from '../assets/image/image-maxblagun.png';
import avatar3 from '../assets/image/image-ramsesmiron.png';
import avatar4 from '../assets/image/image-juliusomo.png';

const useCommentStore = create((set) => ({
  comments: [
    {
      id: 1,
      user: { name: 'amyrobson', avatar: avatar1 },
      timeAgo: '1 month ago',
      comment: 'Impressive! Though it seems the drag feature could be improved...',
      initialScore: 12,
      replies: [],
    },
    {
      id: 2,
      user: { name: 'maxblagun', avatar: avatar2 },
      timeAgo: '2 weeks ago',
      comment: 'Woah, your project looks awesome! How long have you been coding for?...',
      initialScore: 5,
      replies: [],
    },
    {
      id: 3,
      user: { name: 'ramsesmiron', avatar: avatar3 },
      timeAgo: '1 week ago',
      comment: "@maxblagun If you're still new, I'd recommend focusing on the fundamentals...",
      initialScore: 4,
      replies: [],
    },
    {
      id: 4,
      user: { name: 'juliusomo', avatar: avatar4 },
      timeAgo: '2 days ago',
      comment: "@ramsesmiron I couldn't agree more with this...",
      initialScore: 2,
      replies: [],
    },
  ],

  addComment: (newComment) => set((state) => ({ comments: [...state.comments, newComment] })),

  editComment: (id, newCommentText) => set((state) => ({
    comments: state.comments.map((comment) =>
      comment.id === id ? { ...comment, comment: newCommentText } : comment
    ),
  })),

  deleteComment: (id) => set((state) => ({
    comments: state.comments.filter((comment) => comment.id !== id),
  })),

  replyToComment: (id, replyText) => set((state) => ({
    comments: state.comments.map((comment) =>
      comment.id === id
        ? {
            ...comment,
            replies: [...comment.replies, {
              id: Date.now(),
              user: { name: 'juliusomo', avatar: avatar4 },
              timeAgo: 'just now',
              comment: replyText,
              initialScore: 0,
            }],
          }
        : comment
    ),
  })),

  deleteReply: (commentId, replyId) => set((state) => ({
    comments: state.comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, replies: comment.replies.filter((reply) => reply.id !== replyId) }
        : comment
    ),
  })),
}));

export default useCommentStore;