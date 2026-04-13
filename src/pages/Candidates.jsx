import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/Candidates.css';

function Candidates() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Sample candidates data
    setCandidates([
      {
        id: 1,
        name: 'John Smith',
        position: 'Senior Full Stack Developer',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
        experience: '6 years',
        matchScore: 92,
        status: 'shortlisted',
        source: 'LinkedIn'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        position: 'Full Stack Developer',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 234-5678',
        skills: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
        experience: '4 years',
        matchScore: 85,
        status: 'contacted',
        source: 'Naukri'
      },
      {
        id: 3,
        name: 'Mike Chen',
        position: 'Senior Backend Engineer',
        email: 'mike.chen@email.com',
        phone: '+1 (555) 345-6789',
        skills: ['Node.js', 'Kubernetes', 'Microservices', 'gRPC'],
        experience: '7 years',
        matchScore: 88,
        status: 'screened',
        source: 'GitHub'
      },
      {
        id: 4,
        name: 'Emma Davis',
        position: 'Full Stack Developer',
        email: 'emma.davis@email.com',
        phone: '+1 (555) 456-7890',
        skills: ['React', 'Express.js', 'MongoDB', 'Firebase'],
        experience: '3 years',
        matchScore: 78,
        status: 'sourced',
        source: 'LinkedIn'
      }
    ]);
  }, [navigate]);

  const filteredCandidates = filterStatus === 'all' 
    ? candidates 
    : candidates.filter(c => c.status === filterStatus);

  const getStatusColor = (status) => {
    const colors = {
      'sourced': '#10B981',
      'contacted': '#F59E0B',
      'screened': '#8B5CF6',
      'shortlisted': '#3B82F6',
      'qualified': '#06B6D4'
    };
    return colors[status] || '#6B7280';
  };

  const getMatchColor = (score) => {
    if (score >= 90) return '#10B981';
    if (score >= 80) return '#3B82F6';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="candidates-container">
      <Navigation />

      <div className="candidates-content">
        <header className="candidates-header">
          <h1>Candidates</h1>
          <p>Review and manage your candidate pipeline across all stages</p>
        </header>

        <div className="candidates-main">
          {/* Filters */}
          <div className="candidates-filters">
            <button
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All Candidates ({candidates.length})
            </button>
            <button
              className={`filter-btn ${filterStatus === 'shortlisted' ? 'active' : ''}`}
              onClick={() => setFilterStatus('shortlisted')}
            >
              ⭐ Shortlisted ({candidates.filter(c => c.status === 'shortlisted').length})
            </button>
            <button
              className={`filter-btn ${filterStatus === 'contacted' ? 'active' : ''}`}
              onClick={() => setFilterStatus('contacted')}
            >
              ✉️ Contacted ({candidates.filter(c => c.status === 'contacted').length})
            </button>
            <button
              className={`filter-btn ${filterStatus === 'screened' ? 'active' : ''}`}
              onClick={() => setFilterStatus('screened')}
            >
              ✓ Screened ({candidates.filter(c => c.status === 'screened').length})
            </button>
          </div>

          {/* Candidates Table */}
          <div className="candidates-table-wrapper">
            {filteredCandidates.length > 0 ? (
              <table className="candidates-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Skills</th>
                    <th>Experience</th>
                    <th>Match Score</th>
                    <th>Status</th>
                    <th>Source</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map(candidate => (
                    <tr key={candidate.id} className="candidate-row">
                      <td className="candidate-name">{candidate.name}</td>
                      <td>{candidate.position}</td>
                      <td className="candidate-email">
                        <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                      </td>
                      <td>{candidate.phone}</td>
                      <td>
                        <div className="skills-list">
                          {candidate.skills.map((skill, idx) => (
                            <span key={idx} className="skill-badge">{skill}</span>
                          ))}
                        </div>
                      </td>
                      <td>{candidate.experience}</td>
                      <td>
                        <div className="match-score" style={{ backgroundColor: getMatchColor(candidate.matchScore) }}>
                          {candidate.matchScore}%
                        </div>
                      </td>
                      <td>
                        <span 
                          className="status-badge" 
                          style={{ backgroundColor: getStatusColor(candidate.status) }}
                        >
                          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                        </span>
                      </td>
                      <td className="source">{candidate.source}</td>
                      <td className="actions">
                        <button className="action-btn" title="View">View</button>
                        <button className="action-btn" title="Message">✉️</button>
                        <button className="action-btn" title="More">⋮</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <p>No candidates found with the selected filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidates;
