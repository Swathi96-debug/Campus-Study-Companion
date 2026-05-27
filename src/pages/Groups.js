import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";///

function Groups() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [modeToggle, setModeToggle] = useState("FIND"); // "FIND" or "POST"
  const [currentUser, setCurrentUser] = useState(null);

  // Filters state
  const [filter, setFilter] = useState({ subject: "", year: "", timings: "", mode: "" });
  
  // New Post state
  const [newPost, setNewPost] = useState({ subject: "", timings: "", mode: "Online" });

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  const handlePost = () => {
    if (!currentUser) {
      alert("Please login first to post a request.");
      navigate("/login");
      return;
    }
    if (!newPost.subject || !newPost.timings || !newPost.mode) {
      alert("All fields are mandatory to make a post.");
      return;
    }

    const postObj = {
      id: Date.now(),
      author: currentUser.name,
      year: currentUser.year,
      gender: currentUser.gender,
      subject: newPost.subject,
      timings: newPost.timings,
      mode: newPost.mode
    };

    const updatedPosts = [postObj, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setModeToggle("FIND");
    setNewPost({ subject: "", timings: "", mode: "Online" });
  };

  const handleDelete = (id) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const handleChat = (authorName) => {
    // Jump to chat page, technically we could pass state but just routing is fine for now
    navigate("/chat", { state: { userToChat: authorName } });
  };

  const filteredPosts = posts.filter(p => {
    return (
      (filter.subject === "" || p.subject.toLowerCase().includes(filter.subject.toLowerCase())) &&
      (filter.year === "" || p.year.toString() === filter.year.toString()) &&
      (filter.timings === "" || p.timings.toLowerCase().includes(filter.timings.toLowerCase())) &&
      (filter.mode === "" || p.mode === filter.mode)
    );
  });

  return (
    <div className="container">
      <h2>📚 Study Partner Groups</h2>
      
      <div className="toggle-container">
        <button className={modeToggle === "FIND" ? "toggle-btn active" : "toggle-btn"} onClick={() => setModeToggle("FIND")}>🔍 Find Partner</button>
        <button className={modeToggle === "POST" ? "toggle-btn active" : "toggle-btn"} onClick={() => setModeToggle("POST")}>✍️ Post Request</button>
      </div>

      {modeToggle === "POST" && (
        <div className="form-card">
          <h3>Create a Request</h3>
          <p className="notice">Your gender ({currentUser?.gender || 'N/A'}) and year ({currentUser?.year || 'N/A'}) will be automatically attached from your profile.</p>
          
          <input type="text" placeholder="Subject (e.g. Data Structures)" value={newPost.subject} onChange={e => setNewPost({...newPost, subject: e.target.value})} />
          <input type="text" placeholder="Timings (e.g. Evening 6PM-8PM)" value={newPost.timings} onChange={e => setNewPost({...newPost, timings: e.target.value})} />
          
          <select value={newPost.mode} onChange={e => setNewPost({...newPost, mode: e.target.value})}>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          
          <button className="primary-btn" onClick={handlePost}>Publish Post</button>
        </div>
      )}

      {modeToggle === "FIND" && (
        <>
          <div className="filter-card">
            <h3>Filter Posts</h3>
            <div className="filter-grid">
              <input type="text" placeholder="Search Subject..." value={filter.subject} onChange={e => setFilter({...filter, subject: e.target.value})} />
              
              <select value={filter.year} onChange={e => setFilter({...filter, year: e.target.value})}>
                <option value="">All Years</option>
                {[1,2,3,4,5].map(y => <option key={y} value={y}>Year {y}</option>)}
              </select>

              <input type="text" placeholder="Search Timing..." value={filter.timings} onChange={e => setFilter({...filter, timings: e.target.value})} />
              
              <select value={filter.mode} onChange={e => setFilter({...filter, mode: e.target.value})}>
                <option value="">Any Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="posts-container">
            {filteredPosts.length === 0 ? (
              <p className="no-posts">No posts available matching your criteria.</p>
            ) : (
              filteredPosts.map(post => (
                <div key={post.id} className="flashcard3d">
                  <div className="fc-header">
                    <h4>{post.subject}</h4>
                    <span className="fc-badge">{post.mode}</span>
                  </div>
                  <div className="fc-body">
                    <p>🕒 {post.timings}</p>
                    <p>🧑‍🎓 <b>{post.author}</b> (Year {post.year}, {post.gender})</p>
                  </div>
                  <div className="fc-footer">
                    <button className="chat-btn" onClick={() => handleChat(post.author)}>💬 Chat</button>
                    {currentUser && currentUser.name === post.author && (
                      <button className="delete-btn" onClick={() => handleDelete(post.id)} style={{ marginLeft: "10px" }}>🗑️ Delete</button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Groups;