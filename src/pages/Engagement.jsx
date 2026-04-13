import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/Engagement.css';

function Engagement() {
  const navigate = useNavigate();
  const [engagements, setEngagements] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Sample engagement data
    setEngagements([
      {
        id: 1,
        candidateName: 'John Smith',
        position: 'Senior Full Stack Developer',
        action: 'Email invitation sent',
        timestamp: '2024-01-15 10:30 AM',
        status: 'pending',
        responseRate: '-'
      },
      {
        id: 2,
        candidateName: 'Sarah Johnson',
        position: 'Full Stack Developer',
        action: 'Call scheduled',
        timestamp: '2024-01-14 2:15 PM',
        status: 'engaged',
        responseRate: 'Awaiting response'
      },
      {
        id: 3,
        candidateName: 'Mike Chen',
        position: 'Senior Backend Engineer',
        action: 'Interview completed',
        timestamp: '2024-01-13 11:00 AM',
        status: 'completed',
        responseRate: 'Positive'
      },
      {
        id: 4,
        candidateName: 'Emma Davis',
        position: 'Full Stack Developer',
        action: 'Initial outreach',
        timestamp: '2024-01-12 3:45 PM',
        status: 'pending',
        responseRate: '-'
      },
      {
        id: 5,
        candidateName: 'James Wilson',
        position: 'Senior Full Stack Developer',
        action: 'Email invitation sent',
        timestamp: '2024-01-11 9:00 AM',
        status: 'engaged',
        responseRate: 'Interested'
      }
    ]);
  }, [navigate]);

  const filteredEngagements = activeTab === 'all'
    ? engagements
    : engagements.filter(e => e.status === activeTab);

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#F59E0B',
      'engaged': '#3B82F6',
      'completed': '#10B981'
    };
    return colors[status] || '#6B7280';
  };

  return (
    <div className="engagement-container">
      <Navigation />

      <div className="engagement-content">
        <header className="engagement-header">
          <h1>Engagement</h1>
          <p>Track and manage all candidate interactions and communication history</p>
        </header>

        <div className="engagement-main">
          {/* Tabs */}
          <div className="engagement-tabs">
            <button
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All ({engagements.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending ({engagements.filter(e => e.status === 'pending').length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'engaged' ? 'active' : ''}`}
              onClick={() => setActiveTab('engaged')}
            >
              Engaged ({engagements.filter(e => e.status === 'engaged').length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed ({engagements.filter(e => e.status === 'completed').length})
            </button>
          </div>

          {/* Engagement List */}
          <div className="engagement-list">
            {filteredEngagements.length > 0 ? (
              filteredEngagements.map(engagement => (
                <div key={engagement.id} className="engagement-card">
                  <div className="engagement-main-info">
                    <div className="candidate-info">
                      <h3>{engagement.candidateName}</h3>
                      <p className="position">{engagement.position}</p>
                    </div>
                    <div className="engagement-action">
                      <p className="action">{engagement.action}</p>
                      <p className="timestamp">{engagement.timestamp}</p>
                    </div>
                  </div>

                  <div className="engagement-meta">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(engagement.status) }}
                    >
                      {engagement.status.charAt(0).toUpperCase() + engagement.status.slice(1)}
                    </span>
                    <span className="response-rate">{engagement.responseRate}</span>
                  </div>

                  <div className="engagement-actions">
                    <button className="action-btn">Send Follow-up</button>
                    <button className="action-btn">Schedule Call</button>
                    <button className="action-btn">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No engagements found.</p>
              </div>
            )}
          </div>

          {/* Engagement Stats */}
          <div className="engagement-stats">
            <div className="stat-card">
              <div className="stat-value">{engagements.filter(e => e.status === 'pending').length}</div>
              <div className="stat-label">Pending Outreach</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{engagements.filter(e => e.status === 'engaged').length}</div>
              <div className="stat-label">Active Conversations</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{engagements.filter(e => e.status === 'completed').length}</div>
              <div className="stat-label">Completed Interviews</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {engagements.filter(e => e.responseRate === 'Interested').length}/{engagements.length}
              </div>
              <div className="stat-label">Positive Responses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Engagement;
