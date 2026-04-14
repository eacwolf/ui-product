import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/SourcingHub.css';

function SourcingHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Account Executive');
  const [tabs, setTabs] = useState([]);
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [newJobData, setNewJobData] = useState({
    name: '',
    coreSkills: '',
    inferredSkills: '',
    searchSources: ''
  });

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

  const handleCloseTab = (tabName, e) => {
    e.stopPropagation();
    const filteredTabs = tabs.filter(tab => tab.name !== tabName);
    setTabs(filteredTabs);
    
    // If closed tab was active, switch to another tab
    if (activeTab === tabName && filteredTabs.length > 0) {
      setActiveTab(filteredTabs[0].name);
    } else if (filteredTabs.length === 0) {
      setActiveTab(null);
    }
  };

  const handleCreateNewJob = () => {
    if (!newJobData.name.trim()) {
      alert('Please enter a job title');
      return;
    }

    const jobId = Math.max(...tabs.map(t => t.id), 0) + 1;
    const newJob = {
      id: jobId,
      name: newJobData.name,
      status: 'active',
      coreSkills: newJobData.coreSkills
        ? newJobData.coreSkills.split(',').map(s => s.trim()).filter(s => s)
        : [],
      inferredSkills: newJobData.inferredSkills
        ? newJobData.inferredSkills.split(',').map(s => s.trim()).filter(s => s)
        : [],
      candidates: 0,
      searchSources: newJobData.searchSources
        ? newJobData.searchSources.split(',').map(s => s.trim()).filter(s => s)
        : ['Uploaded']
    };

    setTabs([...tabs, newJob]);
    setActiveTab(newJob.name);
    setNewJobData({ name: '', coreSkills: '', inferredSkills: '', searchSources: '' });
    setShowNewJobForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJobData(prev => ({
      ...prev,
      [name]: value
    }));
  }

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
                  <button 
                    className="close-tab"
                    onClick={(e) => handleCloseTab(tab.name, e)}
                    title="Close tab"
                  >
                    ×
                  </button>
                </button>
              ))}
            </div>
            <div className="tabs-actions">
              <button className="btn btn-secondary">Tabs</button>
              <button className="btn btn-secondary">Dashboard</button>
              <button 
                className="btn btn-primary"
                onClick={() => setShowNewJobForm(!showNewJobForm)}
              >
                + New Job Tab
              </button>
            </div>
          </div>

          {/* New Job Form */}
          {showNewJobForm && (
            <div className="new-job-form-container">
              <div className="new-job-form">
                <div className="form-header">
                  <h3>Create New Job Tab</h3>
                  <button 
                    className="close-form-btn"
                    onClick={() => setShowNewJobForm(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="jobName">Job Title *</label>
                  <input
                    type="text"
                    id="jobName"
                    name="name"
                    value={newJobData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Developer, Product Manager"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="coreSkills">Core Skills (comma-separated)</label>
                  <input
                    type="text"
                    id="coreSkills"
                    name="coreSkills"
                    value={newJobData.coreSkills}
                    onChange={handleInputChange}
                    placeholder="e.g., Python, JavaScript, React"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inferredSkills">Inferred Skills (comma-separated)</label>
                  <input
                    type="text"
                    id="inferredSkills"
                    name="inferredSkills"
                    value={newJobData.inferredSkills}
                    onChange={handleInputChange}
                    placeholder="e.g., Problem solving, Communication"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="searchSources">Search Sources (comma-separated)</label>
                  <input
                    type="text"
                    id="searchSources"
                    name="searchSources"
                    value={newJobData.searchSources}
                    onChange={handleInputChange}
                    placeholder="e.g., LinkedIn, GitHub, Naukri"
                    className="form-input"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={handleCreateNewJob}
                  >
                    Create Job Tab
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowNewJobForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

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
