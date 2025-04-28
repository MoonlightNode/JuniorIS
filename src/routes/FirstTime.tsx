// src/routes/FirstTime.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate }from 'react-router-dom';
import Stepper, { Step } from '../components/Stepper';
import '../components/Stepper.css';
import { useAuth } from '../context/AuthContext';
import './FirstTime.css';

export default function FirstTime() {
  const { completeProfile } = useAuth();
  const navigate            = useNavigate();
  const storageKey          = 'onboardingData';

  // Load any in-flight answers from localStorage
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
  const [answers, setAnswers] = useState({
    name:         saved?.name         || '',
    major:        saved?.major        || '',
    bio:          saved?.bio          || '',
    interests:    saved?.interests    || '',
    goals:        saved?.goals        || '',
    demographics: saved?.demographics || '',
  });

  // Auto-persist after every change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(answers));
  }, [answers]);

  // On “Complete” – clear temp data, save final profile, go home
  const handleFinish = () => {
    localStorage.removeItem(storageKey);
    completeProfile({
      name:               answers.name,
      major:              answers.major,
      bio:                answers.bio,
      academicInterests:  answers.interests.split('\n'),
      careerGoals:        answers.goals.split('\n'),
      demographics:       answers.demographics.split('\n'),
    });
    navigate('/home', { replace: true });
  };

  return (
    <div className="first-time-page">
      <Stepper
        initialStep={1}
        backButtonText="Previous"
        nextButtonText="Next"
        onFinalStepCompleted={handleFinish}
      >
        {/* Step 1 */}
        <Step>
          <h2>What’s your full name?</h2>
          <input
            type="text"
            placeholder="Name"
            value={answers.name}
            onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))}
          />
        </Step>

        {/* Step 2 */}
        <Step>
          <h2>Your Major & Class Year</h2>
          <input
            type="text"
            placeholder="Computer Science, Class of 2025"
            value={answers.major}
            onChange={e => setAnswers(a => ({ ...a, major: e.target.value }))}
          />
        </Step>

        {/* Step 3 */}
        <Step>
          <h2>Write a short bio</h2>
          <textarea
            rows={4}
            placeholder="I’m a senior CS major who loves…"
            value={answers.bio}
            onChange={e => setAnswers(a => ({ ...a, bio: e.target.value }))}
          />
        </Step>

        {/* Step 4 */}
        <Step>
          <h2>Academic Interests</h2>
          <p>(one per line)</p>
          <textarea
            rows={4}
            placeholder="AI & Machine Learning\nUX/UI Design\n…"
            value={answers.interests}
            onChange={e => setAnswers(a => ({ ...a, interests: e.target.value }))}
          />
        </Step>

        {/* Step 5 */}
        <Step>
          <h2>Career Goals & Demographics</h2>
          <p>Goals (one per line):</p>
          <textarea
            rows={3}
            placeholder="Cybersecurity Analyst\nSoftware Dev Internships"
            value={answers.goals}
            onChange={e => setAnswers(a => ({ ...a, goals: e.target.value }))}
          />
          <p>Demographics (one per line):</p>
          <textarea
            rows={2}
            placeholder="First-Gen\nSpeaks English & French"
            value={answers.demographics}
            onChange={e =>
              setAnswers(a => ({ ...a, demographics: e.target.value }))
            }
          />
        </Step>

        {/* Step 6: Review & Complete */}
        <Step>
          <h2>All Set! 🎉</h2>
          <p>Review your answers:</p>
          <ul>
            <li><strong>Name:</strong> {answers.name}</li>
            <li><strong>Major:</strong> {answers.major}</li>
            <li><strong>Bio:</strong> {answers.bio}</li>
            <li>
              <strong>Interests:</strong>
              <ul>
                {answers.interests.split('\n').map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>Goals:</strong>
              <ul>
                {answers.goals.split('\n').map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>Demographics:</strong>
              <ul>
                {answers.demographics.split('\n').map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </li>
          </ul>
        </Step>
      </Stepper>
    </div>
  );
}
