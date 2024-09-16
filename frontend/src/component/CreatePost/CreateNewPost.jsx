import React, { useState } from 'react';
import './CreateNewPost.css';
import EmojiPicker from 'emoji-picker-react';

const CreatePostPage = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEmojiClick = (event, emojiObject) => {
    console.log(emojiObject); 

    const emoji = emojiObject?.emoji || emojiObject?.native; 
    setContent((prevContent) => prevContent + emoji);

    setShowEmojiPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create-post-container">
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="textarea-container">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="What's on your mind?"
            rows="4"
            cols="50"
          />
          <button
            type="button"
            className="emoji-button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            😊
          </button>
          {showEmojiPicker && (
            <div className="emoji-picker">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-input"
        />
        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Preview" />
          </div>
        )}
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
