import React, { useState, useEffect } from "react";
import Badge from "../components/Badge";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(saved);
  }, []);

  const saveGoals = (updated) => {
    setGoals(updated);
    localStorage.setItem("goals", JSON.stringify(updated));
  };

  const addGoal = (e) => {
    e.preventDefault(); // Using proper form handling
    if (!newGoal) return;
    const task = {
      id: Date.now(),
      title: newGoal,
      notes: description,
      completed: false
    };
    saveGoals([...goals, task]);
    setNewGoal("");
    setDescription("");
  };

  const toggleCheck = (id) => {
    const updated = goals.map(g => 
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    saveGoals(updated);
  };

  const deleteGoal = (id) => {
    saveGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="container goals-container">
      <h2>🎯 Study Goals & To-Do</h2>
      
      {/* Using fieldset and legend to explicitly cover the syllabus M5 */}
      <fieldset className="goals-fieldset">
        <legend className="goals-legend">➕ Add New Task</legend>
        <form onSubmit={addGoal} className="goals-form">
          <input 
            type="text" 
            placeholder="Task Title (e.g. Finish Math Homework)" 
            value={newGoal} 
            onChange={e => setNewGoal(e.target.value)}
            className="goal-input"
          />
          
          <br/>
          
          {/* Using textarea to explicitly cover the syllabus M5 */}
          <textarea 
            placeholder="Specific notes or syllabus modules..." 
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="goal-textarea"
            rows="3"
          />
          
          <button type="submit" className="primary-btn">Save Task</button>
        </form>
      </fieldset>

      <div className="goals-list">
        <h3>Current Tasks</h3>
        {goals.map(g => (
          <div key={g.id} className={`goal-item ${g.completed ? 'completed' : ''}`}>
            <label className="checkbox-label">
              {/* Using explicit Checkbox element */}
              <input 
                type="checkbox" 
                checked={g.completed} 
                onChange={() => toggleCheck(g.id)} 
                className="goal-checkbox"
              />
              <span className="goal-title">{g.title}</span>
            </label>
            <p className="goal-notes">{g.notes}</p>
            
            <div className="goal-footer">
               <Badge text={g.completed ? "Done" : "Pending"} type={g.completed ? "success" : "warning"} />
               <button onClick={() => deleteGoal(g.id)} className="delete-btn btn-small">X</button>
            </div>
          </div>
        ))}
        {goals.length === 0 && <p>No specific goals set yet!</p>}
      </div>
    </div>
  );
}

export default Goals;
