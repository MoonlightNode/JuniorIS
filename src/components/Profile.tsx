import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile: React.FC = () => {
  // Get user data from localStorage
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  // Define the questions (these can be hardcoded or fetched from an API)
  const questions = [
    { id: 1, question: 'What is your Major?' },
    { id: 2, question: 'Current Independent Study Idea?' },
    { id: 3, question: 'Plans to share progress?' },
  ];

  // State to store answers, edit mode for each question, and initial values
  const [answers, setAnswers] = useState<any>({});
  const [editable, setEditable] = useState<any>({});

  // Load the answers from localStorage on component mount
  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('answers') || '{}');
    setAnswers(savedAnswers);

    // Set each question as not editable initially
    const initialEditableState = questions.reduce((acc: any, q: any) => {
      acc[q.id] = false; // Default all to non-editable
      return acc;
    }, {});
    setEditable(initialEditableState);
  }, []);

  // Handle answer change
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prevAnswers: any) => {
      const updatedAnswers = { ...prevAnswers, [questionId]: value };
      // Save the answers to localStorage
      localStorage.setItem('answers', JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  };

  // Toggle edit mode
  const handleEditToggle = (questionId: number) => {
    setEditable((prevEditable: any) => ({
      ...prevEditable,
      [questionId]: !prevEditable[questionId],
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>

        {/* Profile details */}
        <div className="profile-info">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Password:</strong> {password}</p>
        </div>

        {/* Display questions and user answers */}
        <div className="questions-section">
          {questions.map((q) => (
            <div key={q.id} className="form-group">
              <label>{q.question}</label>
              {editable[q.id] ? (
                <textarea
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  rows={4}
                  placeholder="Type your answer here..."
                />
              ) : (
                <p className="answer-text">{answers[q.id] || 'No answer yet'}</p>
              )}
              <div className="buttons">
                {!editable[q.id] ? (
                  <button
                    className="edit-button"
                    onClick={() => handleEditToggle(q.id)}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="save-button"
                    onClick={() => handleEditToggle(q.id)}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
