// src/routes/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate }                 from 'react-router-dom';
import Navbar                          from '../components/Navbar/Navbar';
import DropdownMenu                    from '../components/DropdownMenu/DropdownMenu';
import { useAuth }                     from '../context/AuthContext';
import './Profile.css';

interface ProfileData {
  profileImage?: string;
  name: string;
  major: string;
  followers: number;
  bio: string;
  academicInterests: string; // newline-separated
  careerGoals: string;       // newline-separated
  demographics: string;      // newline-separated
}

export default function Profile() {
  const { completeProfile, signOut } = useAuth();
  const navigate                      = useNavigate();
  const [editMode, setEditMode]      = useState(false);
  const [data, setData]              = useState<ProfileData>({
    profileImage:      '',
    name:              '',
    major:             '',
    followers:         0,
    bio:               '',
    academicInterests: '',
    careerGoals:       '',
    demographics:      '',
  });

  // Load from storage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setData({
      profileImage:      stored.profileImage || '',
      name:              stored.name         || 'Jane Doe',
      major:             stored.major        || 'Computer Science, Class of 2025',
      followers:         stored.followers ?? 0,
      bio:               stored.bio         || 'Hello! I’m Jane…',
      academicInterests: (stored.academicInterests || []).join('\n'),
      careerGoals:       (stored.careerGoals       || []).join('\n'),
      demographics:      (stored.demographics      || []).join('\n'),
    });
  }, []);

  // Save edits
  const handleSave = () => {
    localStorage.setItem(
      'userProfile',
      JSON.stringify({
        ...data,
        academicInterests: data.academicInterests.split('\n'),
        careerGoals:       data.careerGoals.split('\n'),
        demographics:      data.demographics.split('\n'),
      })
    );
    completeProfile(data);
    setEditMode(false);
  };

  // Cancel edits
  const handleCancel = () => {
    // reload last saved
    const stored = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setData({
      ...data,
      profileImage:      stored.profileImage || '',
      name:              stored.name         || data.name,
      major:             stored.major        || data.major,
      bio:               stored.bio          || data.bio,
      academicInterests: (stored.academicInterests || []).join('\n'),
      careerGoals:       (stored.careerGoals       || []).join('\n'),
      demographics:      (stored.demographics      || []).join('\n'),
    });
    setEditMode(false);
  };

  // Sign out
  const handleSignOut = () => {
    signOut();
    navigate('/signin', { replace: true });
  };

  return (
    <div className="profile-page">
      <Navbar />

      {/* Top bar with dropdown, edit/save/cancel, sign out */}
      <div className="profile-topbar">
        <DropdownMenu />
        {editMode ? (
          <>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button
            className="edit-profile-button"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <div className="profile-grid">
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <section className="profile-header">
            <div className="avatar">
              {editMode ? (
                <input
                  type="text"
                  placeholder="Image URL"
                  value={data.profileImage}
                  onChange={e =>
                    setData(d => ({ ...d, profileImage: e.target.value }))
                  }
                />
              ) : (
                <img
                  src={data.profileImage || '/default-avatar.png'}
                  alt="Avatar"
                />
              )}
            </div>

            <div className="profile-info">
              {editMode ? (
                <>
                  <input
                    type="text"
                    value={data.name}
                    onChange={e =>
                      setData(d => ({ ...d, name: e.target.value }))
                    }
                  />
                  <input
                    type="text"
                    value={data.major}
                    onChange={e =>
                      setData(d => ({ ...d, major: e.target.value }))
                    }
                  />
                </>
              ) : (
                <>
                  <h2>{data.name}</h2>
                  <p>{data.major}</p>
                </>
              )}
              <p className="followers">{data.followers} Followers</p>
            </div>
          </section>

          <section className="profile-interests">
            <h3>Academic Interests</h3>
            {editMode ? (
              <textarea
                rows={4}
                value={data.academicInterests}
                onChange={e =>
                  setData(d => ({ ...d, academicInterests: e.target.value }))
                }
              />
            ) : (
              <ul>
                {data.academicInterests.split('\n').map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            )}

            <h3>Career Goals</h3>
            {editMode ? (
              <textarea
                rows={3}
                value={data.careerGoals}
                onChange={e =>
                  setData(d => ({ ...d, careerGoals: e.target.value }))
                }
              />
            ) : (
              <ul>
                {data.careerGoals.split('\n').map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
            )}

            <h3>Demographics</h3>
            {editMode ? (
              <textarea
                rows={2}
                value={data.demographics}
                onChange={e =>
                  setData(d => ({ ...d, demographics: e.target.value }))
                }
              />
            ) : (
              <ul>
                {data.demographics.split('\n').map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            )}
          </section>
        </aside>

        {/* MAIN */}
        <main className="profile-main">
          {/* Bio Card */}
          <section className="profile-bio">
            <h3>Bio</h3>
            {editMode ? (
              <textarea
                rows={4}
                value={data.bio}
                onChange={e =>
                  setData(d => ({ ...d, bio: e.target.value }))
                }
              />
            ) : (
              <p>{data.bio}</p>
            )}
          </section>

          {/* Projects Pill */}
          <section className="profile-projects">
            <h3>Projects</h3>
            <button className="add-btn" onClick={() => navigate('/projects')}>
              ＋
            </button>
          </section>

          {/* Notes Pill WITH navigation */}
          <section className="profile-notes">
            <h3>Notes</h3>
            <button className="add-btn" onClick={() => navigate('/notes')}>
              ＋
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
