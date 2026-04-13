import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: 'User', company: 'Company' });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const userName = localStorage.getItem('userName') || 'User';
    const userCompany = localStorage.getItem('userCompany') || 'Company';
    setUserData({ name: userName, company: userCompany });
  }, [navigate]);

  const metrics = [
    { value: 4, label: 'REQUISITIONS', color: '#2563EB' },
    { value: 6, label: 'SOURCED', color: '#3B82F6' },
    { value: 0, label: 'SHORTLISTED', color: '#10B981' },
    { value: 0, label: 'CONTACTED', color: '#F59E0B' },
    { value: 0, label: 'SCREENED', color: '#8B5CF6' },
    { value: 0, label: 'QUALIFIED (70%+)', color: '#06B6D4' },
  ];

  return (
    <div className="dashboard-container">
      <Navigation />
      
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p className="header-subtitle">Welcome back! Here's your recruitment overview.</p>
        </header>

        <div className="dashboard-main">
          <section className="hiring-funnel-section">
            <div className="section-header">
              <h2>Hiring Funnel Overview</h2>
              <p className="section-description">Track your recruitment progress across all stages</p>
            </div>
            
            <div className="metrics-grid">
              {metrics.map((metric, index) => (
                <div key={index} className="metric-card">
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                  <div 
                    className="metric-bar"
                    style={{ backgroundColor: metric.color }}
                  ></div>
                </div>
              ))}
            </div>
          </section>

          <div className="dashboard-actions">
            <div className="action-card" onClick={() => navigate('/ai-sourcing')}>
              <h3>Start Sourcing</h3>
              <p>Chat with AI agent to analyze JD and find matching candidates</p>
              <div className="action-arrow">→</div>
            </div>

            <div className="action-card" onClick={() => navigate('/candidates')}>
              <h3>View Candidates</h3>
              <p>Review shortlisted candidates and manage outreach</p>
              <div className="action-arrow">→</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
