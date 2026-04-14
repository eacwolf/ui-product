import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/ProfileSettings.css';

function ProfileSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: '',
    bio: ''
  });
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Load user data from new structure
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const firstName = userData.name?.split(' ')[0] || '';
    const email = userData.email || '';
    
    setFormData(prev => ({
      ...prev,
      firstName,
      email
    }));

    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColor = localStorage.getItem('primaryColor') || '#3b82f6';
    setTheme(savedTheme);
    setPrimaryColor(savedColor);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Apply background color based on theme
    if (newTheme === 'dark') {
      document.body.style.background = '#0f1419';
      document.body.style.color = '#f3f4f6';
    } else {
      document.body.style.background = '#f9fafb';
      document.body.style.color = '#1f2937';
    }
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('themeChanged'));
    
    setMessage('Theme updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleColorChange = (color) => {
    setPrimaryColor(color);
    localStorage.setItem('primaryColor', color);
    document.documentElement.style.setProperty('--primary', color);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('themeChanged'));
    
    setMessage('Color updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSaveGeneral = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
      localStorage.setItem('userPhone', formData.phone);
      localStorage.setItem('userJobTitle', formData.jobTitle);
      localStorage.setItem('userDepartment', formData.department);
      localStorage.setItem('userBio', formData.bio);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Password changed successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error changing password');
    } finally {
      setIsLoading(false);
    }
  };

  const colorOptions = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Indigo', value: '#6366f1' }
  ];

  return (
    <div className="profile-settings-container">
      <Navigation />

      <div className="profile-content">
        <header className="profile-header">
          <h1>Settings</h1>
          <p>Manage your account preferences, theme, and personal information</p>
        </header>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        <div className="settings-layout">
          {/* Sidebar Navigation */}
          <aside className="settings-sidebar">
            <nav className="settings-nav">
              <button
                className={`settings-nav-item ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                👤 General
              </button>
              <button
                className={`settings-nav-item ${activeTab === 'theme' ? 'active' : ''}`}
                onClick={() => setActiveTab('theme')}
              >
                🎨 Theme & Appearance
              </button>
              <button
                className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                🔐 Security
              </button>
              <button
                className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                🔔 Notifications
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="settings-main">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="settings-section">
                <h2>General Information</h2>
                <p className="section-description">Update your personal information and profile</p>

                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter last name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your@email.com"
                    disabled
                  />
                  <small className="form-hint">Your email cannot be changed</small>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., Hiring Manager"
                  />
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Select Department</option>
                    <option value="HR">Human Resources</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Tell us about yourself..."
                    rows="4"
                  />
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={handleSaveGeneral}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* Theme & Appearance */}
            {activeTab === 'theme' && (
              <div className="settings-section">
                <h2>Theme & Appearance</h2>
                <p className="section-description">Customize the look and feel of your dashboard</p>

                <div className="setting-group">
                  <h3>Theme</h3>
                  <p className="group-description">Choose your preferred theme</p>
                  <div className="theme-options">
                    <div 
                      className={`theme-card ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('light')}
                    >
                      <div className="theme-preview light"></div>
                      <p>Light</p>
                    </div>
                    <div 
                      className={`theme-card ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('dark')}
                    >
                      <div className="theme-preview dark"></div>
                      <p>Dark</p>
                    </div>
                    <div 
                      className={`theme-card ${theme === 'auto' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('auto')}
                    >
                      <div className="theme-preview auto"></div>
                      <p>Auto</p>
                    </div>
                  </div>
                </div>

                <div className="setting-group">
                  <h3>Primary Color</h3>
                  <p className="group-description">Select your preferred accent color</p>
                  <div className="color-options">
                    {colorOptions.map(color => (
                      <div
                        key={color.value}
                        className={`color-option ${primaryColor === color.value ? 'active' : ''}`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorChange(color.value)}
                        title={color.name}
                      >
                        {primaryColor === color.value && <span className="checkmark">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="settings-section">
                <h2>Security Settings</h2>
                <p className="section-description">Manage your account security</p>

                <div className="security-card">
                  <div className="security-item">
                    <div>
                      <h4>Password</h4>
                      <p>Change your password regularly to keep your account secure</p>
                    </div>
                    <button className="btn btn-secondary">Change Password</button>
                  </div>
                </div>

                <div className="security-card">
                  <div className="security-item">
                    <div>
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn btn-secondary">Enable 2FA</button>
                  </div>
                </div>

                <div className="security-card">
                  <div className="security-item">
                    <div>
                      <h4>Active Sessions</h4>
                      <p>Manage devices and sessions connected to your account</p>
                    </div>
                    <button className="btn btn-secondary">View Sessions</button>
                  </div>
                </div>

                <div className="security-card">
                  <div className="security-item">
                    <div>
                      <h4>Login History</h4>
                      <p>Review your recent login activity and suspicious attempts</p>
                    </div>
                    <button className="btn btn-secondary">View History</button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2>Notification Preferences</h2>
                <p className="section-description">Manage how you receive notifications</p>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Email Notifications</h4>
                    <p>Receive updates about candidates and applications</p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle-switch" />
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Push Notifications</h4>
                    <p>Get notified about important actions and milestones</p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle-switch" />
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Weekly Digest</h4>
                    <p>Receive a summary of your recruitment activity</p>
                  </div>
                  <input type="checkbox" className="toggle-switch" />
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Application Updates</h4>
                    <p>Get notified when candidates apply or update their status</p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle-switch" />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
