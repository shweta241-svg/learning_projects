import React, { useState } from 'react';

function MovieList({ movies }) {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showCommentInput, setShowCommentInput] = useState({});

  const handleLike = (id) => {
    setLikes({ ...likes, [id]: !likes[id] });
  };

  const handleComment = (id, comment) => {
    setComments({
      ...comments,
      [id]: [...(comments[id] || []), { text: comment, replies: [] }]
    });
  };

  const handleReply = (movieId, commentIndex, reply) => {
    const movieComments = comments[movieId] || [];
    movieComments[commentIndex] = {
      ...movieComments[commentIndex],
      replies: [...movieComments[commentIndex].replies, reply]
    };
    setComments({
      ...comments,
      [movieId]: movieComments
    });
  };

  const toggleCommentInput = (id) => {
    setShowCommentInput({ ...showCommentInput, [id]: !showCommentInput[id] });
  };

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div key={index} className="movie">
          <img src={movie.image} alt={movie.name} />
          <h2>{movie.name}</h2>
          <p>{movie.description}</p>
          <div className="actions">
            <button
              className={`like-btn ${likes[index] ? 'liked' : ''}`}
              onClick={() => handleLike(index)}
            >
              <i className="fas fa-thumbs-up"></i> {likes[index] ? 1 : 0}
            </button>
            <button
              className="comment-btn"
              onClick={() => toggleCommentInput(index)}
            >
              <i className="fas fa-comment"></i> 
            </button>
          </div>
          {showCommentInput[index] && (
            <CommentSection
              movieId={index}
              comments={comments[index] || []}
              onComment={handleComment}
              onReply={handleReply}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function CommentSection({ movieId, comments, onComment, onReply }) {
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (comment.trim()) {
      onComment(movieId, comment);
      setComment('');
    }
  };

  return (
    <div className="comment-section">
      {comments.map((comment, index) => (
        <Comment
          key={index}
          movieId={movieId}
          comment={comment}
          commentIndex={index}
          onReply={onReply}
        />
      ))}
      <div className="comment-input">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>
          Add
        </button>
      </div>
    </div>
  );
}

function Comment({ movieId, comment, commentIndex, onReply }) {
  const [reply, setReply] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleAddReply = () => {
    if (reply.trim()) {
      onReply(movieId, commentIndex, reply);
      setReply('');
      setShowReplyInput(false);
    }
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <button className="reply-btn" onClick={() => setShowReplyInput(!showReplyInput)}>
        Reply
      </button>
      {showReplyInput && (
        <div className="reply-input">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Add a reply"
          />
          <button onClick={handleAddReply}>
            Add
          </button>
        </div>
      )}
      {comment.replies.map((reply, index) => (
        <div key={index} className="reply">
          <p>{reply}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
