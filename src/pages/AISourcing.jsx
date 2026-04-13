import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/AISourcing.css';

function AISourcing() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysis({
        title: 'Job Analysis',
        coreSkills: [
          'Software development',
          'Full-stack development',
          'React/Vue.js',
          'Node.js',
          'Database design',
          'REST API development',
          'Git/Version control',
          'Agile methodologies'
        ],
        inferredSkills: [
          'Cloud platform experience (AWS/GCP)',
          'CI/CD pipeline knowledge',
          'Docker/Kubernetes',
          'Unit testing',
          'Performance optimization'
        ],
        experience: '3-5 years',
        seniorityLevel: 'Mid-level to Senior'
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="ai-sourcing-container">
      <Navigation />

      <div className="ai-sourcing-content">
        <header className="ai-sourcing-header">
          <h1>AI-Powered Sourcing</h1>
          <p>Use intelligent job analysis to identify and match the best candidates for your roles</p>
        </header>

        <div className="ai-sourcing-main">
          {/* Input Section */}
          <div className="input-section">
            <h2>Step 1: Paste Job Description</h2>
            
            <textarea
              className="job-description-input"
              placeholder="Paste your job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows="10"
            />

            <button 
              className="btn btn-primary analyze-btn"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze JD'}
            </button>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="analysis-section">
              <h2>Step 2: Review Analysis</h2>

              <div className="analysis-content">
                <div className="analysis-card">
                  <h3>Core Skills Required</h3>
                  <div className="skills-grid">
                    {analysis.coreSkills.map((skill, idx) => (
                      <div key={idx} className="skill-chip skill-primary">{skill}</div>
                    ))}
                  </div>
                </div>

                <div className="analysis-card">
                  <h3>Inferred Skills</h3>
                  <div className="skills-grid">
                    {analysis.inferredSkills.map((skill, idx) => (
                      <div key={idx} className="skill-chip skill-secondary">{skill}</div>
                    ))}
                  </div>
                </div>

                <div className="analysis-card">
                  <h3>Experience Requirements</h3>
                  <p><strong>Experience:</strong> {analysis.experience}</p>
                  <p><strong>Seniority:</strong> {analysis.seniorityLevel}</p>
                </div>

                <button className="btn btn-primary create-job-btn">
                  Create Job & Start Sourcing
                </button>
              </div>
            </div>
          )}

          {/* Sample Jobs */}
          <div className="sample-section">
            <h3>Sample Job Descriptions (Click to Use)</h3>
            <div className="sample-jobs">
              <div className="sample-card" onClick={() => setJobDescription('Senior Full Stack Developer\n\nWe are looking for an experienced Full Stack Developer with 5+ years of experience. Required skills:\n- React.js and Node.js\n- MongoDB and PostgreSQL\n- Docker and Kubernetes\n- AWS/GCP\n- Git and CI/CD pipelines\n\nResponsibilities:\n- Design and implement scalable web applications\n- Lead technical architecture discussions\n- Mentor junior developers\n- Contribute to DevOps practices')}>
                <h4>Senior Full Stack Developer</h4>
                <p>5+ years experience with React, Node.js, MongoDB...</p>
              </div>

              <div className="sample-card" onClick={() => setJobDescription('Product Manager\n\nLooking for an experienced Product Manager to lead our next-generation platform. Requirements:\n- 5+ years in product management\n- Experience with SaaS products\n- Strong data analytics background\n- User research and design thinking\n- Ability to work with cross-functional teams')}>
                <h4>Product Manager</h4>
                <p>Lead product strategy and roadmap for SaaS platform...</p>
              </div>

              <div className="sample-card" onClick={() => setJobDescription('DevOps Engineer\n\nWe seek an experienced DevOps Engineer. Key skills:\n- Kubernetes and Docker\n- CI/CD pipeline design\n- AWS/Azure cloud platforms\n- Infrastructure as Code (Terraform)\n- Monitoring and logging tools\n- Linux system administration')}>
                <h4>DevOps Engineer</h4>
                <p>Manage cloud infrastructure and deployment pipelines...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AISourcing;
