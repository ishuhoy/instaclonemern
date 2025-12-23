const Stories = () => {
  const stories = [
    { id: 1, name: 'your_story', profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60' },
    { id: 2, name: 'john_doe', profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60' },
    { id: 3, name: 'jane_smith', profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60' }
  ];

  return (
    <div className="stories-container">
      {stories.map(story => (
        <div key={story.id} className={`story-item ${story.id === 1 ? 'active' : ''}`}>
          <div className="story-gradient">
            <img src={story.profilePic} alt={story.name} className="story-avatar" />
          </div>
          <span className="story-name">{story.name}</span>
        </div>
      ))}
      <div className="story-add">
        <div className="story-placeholder">+</div>
      </div>
    </div>
  );
};

export default Stories;
