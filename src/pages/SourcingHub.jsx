import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/SourcingHub.css';

function SourcingHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Account Executive');
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Initialize sample job tabs
    setTabs([
      {
        id: 1,
        name: 'Account Executive',
        status: 'active',
        coreSkills: [
          'Enterprise sales',
          'B2B sales',
          'Named account management',
          'Quota attainment',
          'New business development',
          'Pipeline management',
          'Forecasting',
          'Territory planning',
          'Customer relationship management',
          'Executive-level communication',
          'Negotiation',
          'Solution/consultative selling',
          'Stakeholder management',
          'Presentation skills'
        ],
        inferredSkills: [
          'Data/analytics solution selling',
          'SaaS sales',
          'Value-based selling and ROI articulation',
          'RFP/RFI response management',
          'Competitive positioning',
          'Procurement and legal/commercial deal navigation'
        ],
        candidates: 0,
        searchSources: ['Uploaded', 'ATS', 'Naukri', 'LinkedIn']
      },
      {
        id: 2,
        name: 'sdet',
        status: 'active',
        coreSkills: ['Test automation', 'Python', 'CI/CD'],
        inferredSkills: ['Performance testing', 'Agile methodologies'],
        candidates: 0,
        searchSources: ['Uploaded', 'GitHub']
      }
    ]);
  }, [navigate]);

  const activeTabData = tabs.find(tab => tab.name === activeTab);

  return (
    <div className="sourcing-hub-container">
      <Navigation />

      <div className="sourcing-content">
        <header className="sourcing-header">
          <h1>Sourcing Hub</h1>
          <p>Manage multiple job openings and track candidates across all recruitment stages</p>
        </header>

        <div className="sourcing-main">
          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs-list">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.name ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.name}
                  <span className="status-dot"></span>
                  <button className="close-tab">×</button>
                </button>
              ))}
            </div>
            <div className="tabs-actions">
              <button className="btn btn-secondary">Tabs</button>
              <button className="btn btn-secondary">Dashboard</button>
              <button className="btn btn-primary">+ New Job Tab</button>
            </div>
          </div>

          {/* Content */}
          {activeTabData && (
            <div className="tab-content">
              {/* Left Section - Job Details */}
              <div className="job-details">
                <div className="job-header">
                  <div className="job-title">
                    <h2>{activeTabData.name}</h2>
                    <span className="ai-badge">AI Sourcing Agent</span>
                  </div>
                </div>

                <div className="job-description">
                  <p><strong>Working on: "{activeTabData.name}"</strong></p>
                  <p>I've loaded the job description. Here's my understanding:</p>

                  <div className="skills-section">
                    <h3>CORE SKILLS</h3>
                    <div className="skills-tags">
                      {activeTabData.coreSkills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="skills-section">
                    <h3>INFERRED SKILLS</h3>
                    <div className="skills-tags">
                      {activeTabData.inferredSkills.map((skill, idx) => (
                        <span key={idx} className="skill-tag inferred">{skill}</span>
                      ))}
                    </div>
                    <p className="skill-note"><em>Not specified</em></p>
                  </div>

                  <div className="search-sources">
                    <h3>SEARCH SOURCES</h3>
                    <div className="source-buttons">
                      {activeTabData.searchSources.map((source, idx) => (
                        <span key={idx} className="source-button">{source}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Candidates */}
              <div className="candidates-section">
                <div className="candidates-header">
                  <h3>Candidates</h3>
                  <span className="candidate-count">{activeTabData.candidates} found for {activeTabData.name}</span>
                </div>

                <div className="candidates-empty">
                  <div className="empty-state">
                    <p>No candidates yet.</p>
                    <p>Search to find matches from AIS, Naukri, LinkedIn.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SourcingHub;
