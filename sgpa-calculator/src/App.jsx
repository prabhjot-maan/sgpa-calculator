import { useState } from 'react';
import './App.css';

function App() {
  const [subjects, setSubjects] = useState([{ id: 1, credits: 1, grade: 'A' }]);
  const [sgpa, setSgpa] = useState(0);

  // Grade to points mapping
  const gradePoints = {
    'A+': 10,
    'A': 9,
    'B+': 8,
    'B': 7,
    'C': 6,
    'D': 5,
    'E': 4,
    'F': 0
  };

  // Add new subject row
  const addSubject = () => {
    setSubjects([...subjects, { 
      id: subjects.length + 1, 
      credits: 1, 
      grade: 'A' 
    }]);
  };

  // Remove subject row
  const removeSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  // Calculate SGPA
  const calculateSgpa = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach(subject => {
      totalCredits += parseInt(subject.credits);
      totalPoints += parseInt(subject.credits) * gradePoints[subject.grade];
    });

    setSgpa((totalPoints / totalCredits).toFixed(2));
  };

  return (
    <div className="app">
      <h1>📚 SGPA Calculator</h1>
      
      <div className="subject-list">
        {subjects.map((subject) => (
          <div key={subject.id} className="subject-row">
            <select 
              value={subject.credits}
              onChange={(e) => {
                const updatedSubjects = subjects.map(s => 
                  s.id === subject.id ? {...s, credits: e.target.value} : s
                );
                setSubjects(updatedSubjects);
              }}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} Credit</option>
              ))}
            </select>

            <select 
              value={subject.grade}
              onChange={(e) => {
                const updatedSubjects = subjects.map(s => 
                  s.id === subject.id ? {...s, grade: e.target.value} : s
                );
                setSubjects(updatedSubjects);
              }}
            >
              {Object.keys(gradePoints).map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>

            {subjects.length > 1 && (
              <button 
                className="remove-btn"
                onClick={() => removeSubject(subject.id)}
              >
                ❌ Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button onClick={addSubject}>➕ Add Subject</button>
        <button onClick={calculateSgpa}>🎯 Calculate SGPA</button>
      </div>

      {sgpa > 0 && (
        <div className="result">
          <h2>Your SGPA: {sgpa} 🎉</h2>
          <p>{sgpa >= 8 ? "Outstanding! 🌟" : "Keep Improving! 💪"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
