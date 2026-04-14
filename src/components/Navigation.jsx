import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Parse userData from localStorage
  const userData = JSON.parse(localStorage.getItem('currentUser') || '{"name": "User", "email": "user@example.com"}');
  const userName = userData.name || 'User';
  const userEmail = userData.email || 'user@example.com';

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('companyData');
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/sourcing-hub', label: 'Sourcing Hub' },
    { path: '/ai-sourcing', label: 'AI Sourcing' },
    { path: '/candidates', label: 'Candidates' },
    { path: '/resumes', label: 'Resumes' },
    { path: '/engagement', label: 'Engagement' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <Link to="/dashboard">
            <span className="logo-icon">AI</span>
            <span className="logo-text">Sourcing</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="nav-items">
          <div className="nav-tabs">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item.path)}`}
                title={item.label}
              >
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* User Menu */}
        <div className="nav-user">
          <div className="user-info">
            <div className="user-avatar"></div>
            <div className="user-details">
              <p className="user-name">{userName.split(' ')[0]}</p>
              <p className="user-role">RECRUITER</p>
            </div>
          </div>

          {/* Notification */}
          <button className="notification-btn" title="Notifications">
          </button>

          {/* Dropdown Menu */}
          <div className="user-menu">
            <button
              className="user-menu-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="Menu"
            >
              ≡
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/profile-settings');
                    setDropdownOpen(false);
                  }}
                >
                  Profile Settings
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/company-settings');
                    setDropdownOpen(false);
                  }}
                >
                  Company Settings
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/billing');
                    setDropdownOpen(false);
                  }}
                >
                  Billing
                </button>
                <hr />
                <button className="dropdown-item logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
