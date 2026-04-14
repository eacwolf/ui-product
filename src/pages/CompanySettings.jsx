import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/CompanySettings.css';

function CompanySettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [companyData, setCompanyData] = useState(() => {
    // Load company data from userData if available
    const userData = JSON.parse(localStorage.getItem('userData') || '{"company": ""}');
    const savedCompanyData = localStorage.getItem('companyData');
    const parsed = savedCompanyData ? JSON.parse(savedCompanyData) : {};
    
    return {
      companyName: parsed.companyName || userData.company || '',
      companyEmail: parsed.companyEmail || '',
      website: parsed.website || '',
      industry: parsed.industry || '',
      companySize: parsed.companySize || '',
      address: parsed.address || '',
      city: parsed.city || '',
      state: parsed.state || '',
      zipCode: parsed.zipCode || '',
      country: parsed.country || '',
      phone: parsed.phone || '',
      taxId: parsed.taxId || ''
    };
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Recruiter', status: 'Pending' }
  ]);

  const [integrations] = useState([
    { id: 1, name: 'LinkedIn', status: 'Connected', icon: '' },
    { id: 2, name: 'Email Sync', status: 'Connected', icon: '' },
    { id: 3, name: 'Slack', status: 'Not Connected', icon: '' },
    { id: 4, name: 'Google Drive', status: 'Not Connected', icon: '' }
  ]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveCompanyInfo = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update userData with new company name
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.company = companyData.companyName;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Save company data
      localStorage.setItem('companyData', JSON.stringify(companyData));
      setMessage('Company information updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating company information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveTeamMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    setMessage('Team member removed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="company-settings-container">
      <Navigation />

      <div className="company-content">
        <header className="company-header">
          <h1>Company Settings</h1>
          <p>Manage your company profile, team members, and integrations</p>
        </header>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        <div className="company-tabs">
          <button
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Team Members
          </button>
          <button
            className={`tab-btn ${activeTab === 'integrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('integrations')}
          >
            Integrations
          </button>
          <button
            className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            Data & Privacy
          </button>
        </div>

        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="company-section">
            <h2>Company Information</h2>
            <p className="section-description">Update your company profile and contact details</p>

            <div className="form-grid">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={companyData.companyName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Your company name"
                />
              </div>

              <div className="form-group">
                <label>Company Email</label>
                <input
                  type="email"
                  name="companyEmail"
                  value={companyData.companyEmail}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="company@email.com"
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="website"
                  value={companyData.website}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div className="form-group">
                <label>Industry</label>
                <select
                  name="industry"
                  value={companyData.industry}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Education">Education</option>
                </select>
              </div>

              <div className="form-group">
                <label>Company Size</label>
                <select
                  name="companySize"
                  value={companyData.companySize}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={companyData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <h3 className="form-section-title">Address</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={companyData.address}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="123 Business Street"
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={companyData.city}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="City"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={companyData.state}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="State"
                />
              </div>

              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={companyData.zipCode}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Zip Code"
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={companyData.country}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Country"
                />
              </div>

              <div className="form-group">
                <label>Tax ID</label>
                <input
                  type="text"
                  name="taxId"
                  value={companyData.taxId}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Tax ID or EIN"
                />
              </div>
            </div>

            <button 
              className="btn btn-primary"
              onClick={handleSaveCompanyInfo}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Company Info'}
            </button>
          </div>
        )}

        {/* Team Members Tab */}
        {activeTab === 'team' && (
          <div className="company-section">
            <div className="section-header">
              <div>
                <h2>Team Members</h2>
                <p className="section-description">Manage your recruitment team</p>
              </div>
              <button className="btn btn-primary">+ Add Member</button>
            </div>

            <div className="team-members-list">
              {teamMembers.map(member => (
                <div key={member.id} className="team-member-card">
                  <div className="member-info">
                    <div className="member-avatar">{member.name.charAt(0)}</div>
                    <div className="member-details">
                      <h3>{member.name}</h3>
                      <p>{member.email}</p>
                      <span className="member-role">{member.role}</span>
                    </div>
                  </div>
                  <div className="member-status">
                    <span className={`status ${member.status.toLowerCase()}`}>
                      {member.status}
                    </span>
                  </div>
                  <div className="member-actions">
                    <button className="btn btn-secondary btn-small">Edit</button>
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => handleRemoveTeamMember(member.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="company-section">
            <h2>Integrations</h2>
            <p className="section-description">Connect third-party tools to enhance your recruitment workflow</p>

            <div className="integrations-grid">
              {integrations.map(integration => (
                <div key={integration.id} className="integration-card">
                  <span className="integration-icon">{integration.icon}</span>
                  <h3>{integration.name}</h3>
                  <p className={`status ${integration.status.replace(' ', '-').toLowerCase()}`}>
                    {integration.status}
                  </p>
                  <button className="btn btn-secondary">
                    {integration.status === 'Connected' ? 'Manage' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data & Privacy Tab */}
        {activeTab === 'data' && (
          <div className="company-section">
            <h2>Data & Privacy</h2>
            <p className="section-description">Manage your data, privacy settings, and regulatory compliance</p>

            <div className="data-cards">
              <div className="data-card">
                <h3>🔒 Data Backup</h3>
                <p>Automatically backup your company data</p>
                <button className="btn btn-secondary">Configure Backup</button>
              </div>

              <div className="data-card">
                <h3>📥 Export Data</h3>
                <p>Download all your company data in bulk</p>
                <button className="btn btn-secondary">Export Data</button>
              </div>

              <div className="data-card">
                <h3>🗑️ Delete Data</h3>
                <p>Permanently delete your company data</p>
                <button className="btn btn-danger">Delete All Data</button>
              </div>

              <div className="data-card">
                <h3>📋 Compliance</h3>
                <p>View GDPR and compliance reports</p>
                <button className="btn btn-secondary">View Reports</button>
              </div>
            </div>

            <div className="dangerous-zone">
              <h3>⚠️ Danger Zone</h3>
              <div className="danger-action">
                <div>
                  <h4>Delete Company Account</h4>
                  <p>This action cannot be undone. Please be certain.</p>
                </div>
                <button className="btn btn-danger">Delete Account</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanySettings;
