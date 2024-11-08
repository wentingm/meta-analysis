import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Brain, BarChart3, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { 
  Search,  
  FolderOpen, 
  Users, 
  Bot,
  ArrowUpRight 
} from 'lucide-react';

const DashboardLayout = () => {
  const [user] = useState({
    name: "Dr. Jane Smith",
    role: "Research Lead",
    institution: "Education Research Institute"
  });

  const [projects] = useState([
    {
        id: 1,
        title: "AI-Enhanced Learning Analytics",
        description: "Systematic review of AI integration in educational assessment and analytics.",
        status: "In Progress",
        progress: 65, // Progress percentage
        lastUpdate: "2023-10-15"
      },
      {
        id: 2,
        title: "Personalized Learning Pathways",
        description: "Meta-analysis of adaptive learning systems and personalized education outcomes.",
        status: "Planning",
        progress: 20,
        lastUpdate: "2023-09-10"
      },
      {
        id: 3,
        title: "Virtual Reality in STEM Education",
        description: "Analysis of VR technology impact on STEM learning outcomes and engagement.",
        status: "In Progress",
        progress: 50,
        lastUpdate: "2023-11-01"
      },
      {
        id: 4,
        title: "Social-Emotional Learning Technologies",
        description: "Comprehensive review of digital tools supporting social-emotional development.",
        status: "Completed",
        progress: 100,
        lastUpdate: "2023-08-22"
      },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProjects, setExpandedProjects] = useState({});
  const [selectedNavItem, setSelectedNavItem] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('In Progress');

  const toggleProjectExpansion = (projectId) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "status-completed";
      case "In Progress": return "status-in-progress";
      case "Planning": return "status-planning";
      default: return "bg-gray-100 text-gray-800"; // fallback color
    }
  };

  const filteredProjects = projects
    .filter(project => 
      project.status === activeTab &&
      (searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const getProjectCountByStatus = (status) => {
    return projects.filter(project => project.status === status).length;
  };
  const navigate = useNavigate();

  return (
    <div className="layout-container">
      {/* Left Navigation */}
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <Brain className="logo-icon" />
            </div>
            <span className="logo-text bg-red-500">Meta-Research</span>
          </div>
  
          {/* Navigation Items */}
          <nav>
            <button
              onClick={() => setSelectedNavItem('dashboard')}
              className={`nav-button ${selectedNavItem === 'dashboard' ? 'active' : ''}`}
            >
              <BarChart3 className="icon" />
              Dashboard
            </button>
  
            {/* My Projects Section */}
            <div className="project-section">
              <div className="project-section-title">My Projects</div>
              {projects.map((project) => (
                <div key={project.id} className="project-item">
                  <button
                    onClick={() => toggleProjectExpansion(project.id)}
                    className="nav-button"
                  >
                    {expandedProjects[project.id] ? (
                      <ChevronDown className="icon-small" />
                    ) : (
                      <ChevronRight className="icon-small" />
                    )}
                    {project.title}
                  </button>
  
                  {/* Subcategories */}
                  {expandedProjects[project.id] && (
                    <div className="subcategory-container">
                      <button className="nav-button">
                        <FolderOpen className="icon-small" />
                        Project Files
                      </button>
                      <button className="nav-button">
                        <Users className="icon-small" />
                        Project Team
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
  
      <div className="content-container">
        {/* Top Navigation */}
        <nav className="top-nav">
          <div className="top-nav-content">
            <div className="user-info">
              <Bot className="icon" />
              <div className="user-avatar">JS</div>
            </div>
          </div>
        </nav>
  
        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <div className="header">
            <div>
              <h1 className="header-text">Research Dashboard</h1>
              <p className="welcome-message">Welcome, {user.name}!</p>
            </div>
            <button onClick={() => navigate('/create-project')} className="add-project-button">
              <Plus className="icon" />
              New Project
            </button>
          </div>
  
          {/* Search Bar */}
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search Projects..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="search-icon" />
          </div>
  
          {/* Tabs */}
          <div className="tab-container">
            {["In Progress", "Planning", "Completed"].map(status => (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`tab-button ${activeTab === status ? 'active' : ''}`}
              >
                {status} <span className="tab-count">({getProjectCountByStatus(status)})</span>
              </button>
            ))}
          </div>
  
          {/* Project Cards */}
          <div className="project-card-grid">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="card">
                <CardHeader className={getStatusColor(project.status)}>
                    <div className='card-header'>
                        <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                    </div>
                    <div className='status-tag-container'>
                        <span className="status-tag">{project.status}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="project-info">
                    <div className="project-status">
                      <p className="progress-text">Progress: {project.progress}%</p>
                    </div>
                    <div className="progress-bar-container">
                        <div 
                        className="progress-bar" 
                        style={{ width: `${project.progress}%` }}
                        ></div>
                    </div>
                    
                  </div>
                </CardContent>
                <CardFooter>
                    <div className="card-footer">
                        <div className="project-update">
                            <span className="update-text">Last Updated: {project.lastUpdate}</span>
                        </div>
                        <button className="view-details-button">View Details
                        <ArrowUpRight className="icon" />
                        </button>
                    </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
