import React from 'react';
import CommentsList from './component/CommentsList/CommentsList';
import CommentForm from './component/CommentForm/CommentForm';
import './App.css';


const App = () => {
  return (
    <div className="app">
      <CommentsList />
      <h1>Comments</h1>
      <CommentForm />
    </div>
  );
};

export default App;
