import React, { useState } from 'react';
import '../index.css';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card";
import { 
  Search, 
  Plus, 
  BarChart3, 
  FileText, 
  Users, 
  Calendar,
  Brain,
  Bot,
  Settings,
  Star,
  Database,
  LineChart,
  ArrowUpRight,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Group
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    const projectId = "123";
    navigate('/project-dashboard');
  };
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
      progress: 75,
      studies: 42,
      team: 5,
      metrics: {
        effectSize: 0.82,
        heterogeneity: "Low",
        aiConfidence: 92
      },
      tags: ["AI", "EdTech", "Assessment"],
      lastUpdate: "2024-03-15"
    },
    {
      id: 2,
      title: "Personalized Learning Pathways",
      description: "Meta-analysis of adaptive learning systems and personalized education outcomes.",
      status: "Planning",
      progress: 30,
      studies: 28,
      team: 4,
      metrics: {
        effectSize: 0.65,
        heterogeneity: "Moderate",
        aiConfidence: 88
      },
      tags: ["Adaptive Learning", "Personalization", "Student Success"],
      lastUpdate: "2024-03-12"
    },
    {
      id: 3,
      title: "Virtual Reality in STEM Education",
      description: "Analysis of VR technology impact on STEM learning outcomes and engagement.",
      status: "In Progress",
      progress: 60,
      studies: 35,
      team: 6,
      metrics: {
        effectSize: 0.74,
        heterogeneity: "Low",
        aiConfidence: 90
      },
      tags: ["VR", "STEM", "Technology Integration"],
      lastUpdate: "2024-03-10"
    },
    {
      id: 4,
      title: "Social-Emotional Learning Technologies",
      description: "Comprehensive review of digital tools supporting social-emotional development.",
      status: "Completed",
      progress: 100,
      studies: 45,
      team: 4,
      metrics: {
        effectSize: 0.78,
        heterogeneity: "Low",
        aiConfidence: 94
      },
      tags: ["SEL", "EdTech", "Student Wellbeing"],
      lastUpdate: "2024-03-01"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProjects, setExpandedProjects] = useState({});
  const [selectedNavItem, setSelectedNavItem] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('In Progress');

  const toggleProjectExpansion = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold">Meta-Research</span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <button 
              onClick={() => setSelectedNavItem('dashboard')}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${
                selectedNavItem === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Dashboard
            </button>

            {/* My Projects Section */}
            <div className="mt-4">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                My Projects
              </div>
              {projects.map((project) => (
                <div key={project.id} className="ml-2">
                  <button
                    onClick={() => toggleProjectExpansion(project.id)}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    {expandedProjects[project.id] ? (
                      <ChevronDown className="h-4 w-4 mr-2" />
                    ) : (
                      <ChevronRight className="h-4 w-4 mr-2" />
                    )}
                    {project.title}
                  </button>
                  
                  {/* Subcategories */}
                  {expandedProjects[project.id] && (
                    <div className="ml-6 space-y-1">
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Project Files
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Users className="h-4 w-4 mr-2" />
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

      <div className="flex-1">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end items-center h-16">
              <div className="flex items-center space-x-4">
                <Bot className="h-5 w-5 text-indigo-600" />
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JS</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Research Dashboard</h1>
              <p className="text-gray-600">AI-Enhanced Meta-Analysis Projects</p>
            </div>
            <button onClick={() => navigate('/create-project')} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700">
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['Planning', 'In Progress', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`
                    py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm
                    ${activeTab === status
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {status}
                  <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium ${
                    activeTab === status ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900'
                  }`}>
                    {getProjectCountByStatus(status)}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <FileText className="h-5 w-5 mx-auto text-indigo-600 mb-1" />
                      <p className="text-sm font-medium text-gray-900">{project.studies}</p>
                      <p className="text-xs text-gray-500">Studies</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-5 w-5 mx-auto text-indigo-600 mb-1" />
                      <p className="text-sm font-medium text-gray-900">{project.team}</p>
                      <p className="text-xs text-gray-500">Team</p>
                    </div>
                    <div className="text-center">
                      <Bot className="h-5 w-5 mx-auto text-indigo-600 mb-1" />
                      <p className="text-sm font-medium text-gray-900">{project.metrics.aiConfidence}%</p>
                      <p className="text-xs text-gray-500">AI Confidence</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Updated: {project.lastUpdate}
                  </div>
                  <div onClick={handleClick} className="flex items-center text-indigo-600 hover:text-indigo-700 cursor-pointer">
                    View Details
                    <ArrowUpRight className="h-4 w-4 ml-1" />
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
