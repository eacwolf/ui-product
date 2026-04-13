import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/Resumes.css';

function Resumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Sample resumes
    setResumes([
      {
        id: 1,
        fileName: 'john_smith_resume.pdf',
        candidate: 'John Smith',
        uploadDate: '2024-01-15',
        size: '245 KB'
      },
      {
        id: 2,
        fileName: 'sarah_johnson_resume.pdf',
        candidate: 'Sarah Johnson',
        uploadDate: '2024-01-14',
        size: '198 KB'
      },
      {
        id: 3,
        fileName: 'mike_chen_resume.docx',
        candidate: 'Mike Chen',
        uploadDate: '2024-01-13',
        size: '312 KB'
      },
      {
        id: 4,
        fileName: 'emma_davis_resume.pdf',
        candidate: 'Emma Davis',
        uploadDate: '2024-01-12',
        size: '267 KB'
      }
    ]);
  }, [navigate]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      alert('File upload: ' + e.dataTransfer.files[0].name);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      alert('File selected: ' + e.target.files[0].name);
    }
  };

  return (
    <div className="resumes-container">
      <Navigation />

      <div className="resumes-content">
        <header className="resumes-header">
          <h1>Resumes</h1>
          <p>Upload, manage, and organize candidate resumes for easy access and analysis</p>
        </header>

        <div className="resumes-main">
          {/* Upload Section */}
          <div className="upload-section">
            <h2>Upload Resumes</h2>
            
            <div
              className={`upload-area ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-input"
                multiple
                onChange={handleChange}
                className="file-input"
              />
              <label htmlFor="file-input" className="upload-label">
                <div className="upload-icon"></div>
                <p>Drag and drop resumes here</p>
                <p className="upload-sub">or click to browse (PDF, DOC, DOCX)</p>
              </label>
            </div>
          </div>

          {/* Resumes List */}
          <div className="resumes-section">
            <h2>Uploaded Resumes ({resumes.length})</h2>

            {resumes.length > 0 ? (
              <div className="resumes-grid">
                {resumes.map(resume => (
                  <div key={resume.id} className="resume-card">
                    <div className="resume-icon"></div>
                    <div className="resume-info">
                      <h4>{resume.candidate}</h4>
                      <p className="file-name">{resume.fileName}</p>
                      <p className="file-meta">{resume.size} • {resume.uploadDate}</p>
                    </div>
                    <div className="resume-actions">
                      <button className="action-btn" title="View">View</button>
                      <button className="action-btn" title="Download">Download</button>
                      <button className="action-btn" title="Delete">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No resumes uploaded yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resumes;
