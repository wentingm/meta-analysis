import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Alert, AlertDescription } from "./ui/Alert";
import { 
  Brain, 
  ChevronRight, 
  ArrowLeft, 
  Search, 
  Database, 
  CheckSquare, 
  FileText, 
  Settings,
  Plus,
  X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectSetupOverview = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeNavItem, setActiveNavItem] = useState('research-questions');
  
  // Project Overview State
  const [projectData, setProjectData] = useState({
    title: "AI-Enhanced Learning Analytics",
    description: "Systematic review of AI integration in educational assessment and analytics.",
    team: [
      { id: 1, name: "Dr. Jane Smith", role: "Lead Researcher" },
      { id: 2, name: "Dr. Michael Chen", role: "Statistical Analyst" },
      { id: 3, name: "Dr. Sarah Johnson", role: "Content Expert" }
    ]
  });

  // Project Details States
  const [researchQuestions, setResearchQuestions] = useState([
    { id: 1, question: "What is the overall effect of AI integration on student learning outcomes?" },
    { id: 2, question: "How does AI-enhanced assessment compare to traditional assessment methods?" }
  ]);

  const [databases, setDatabases] = useState([
    { id: 1, name: "Education Source", selected: true },
    { id: 2, name: "ERIC", selected: true },
    { id: 3, name: "PsycINFO", selected: false },
    { id: 4, name: "Web of Science", selected: true }
  ]);

  const [inclusionCriteria, setInclusionCriteria] = useState([
    { id: 1, criterion: "Studies published between 2015-2024" },
    { id: 2, criterion: "Peer-reviewed articles only" },
    { id: 3, criterion: "Studies with quantitative outcomes" }
  ]);

  const [codebookFields, setCodebookFields] = useState([
    { id: 1, name: "Study Characteristics", type: "category" },
    { id: 2, name: "Sample Size", type: "numeric" },
    { id: 3, name: "Effect Size", type: "numeric" }
  ]);

  const [metaAnalysisSettings, setMetaAnalysisSettings] = useState({
    model: "random",
    effectSizeMetric: "hedges_g",
    confidenceInterval: 95,
    heterogeneityTest: true
  });

  const navItems = [
    { id: 'research-questions', label: 'Research Questions', icon: Search },
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'inclusion-criteria', label: 'Inclusion Criteria', icon: CheckSquare },
    { id: 'codebook', label: 'Codebook', icon: FileText },
    { id: 'meta-analysis', label: 'Meta-analysis Settings', icon: Settings }
  ];

  const handleProjectDataChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={projectData.title}
                  onChange={(e) => handleProjectDataChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description
                </label>
                <textarea
                  value={projectData.description}
                  onChange={(e) => handleProjectDataChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Team Members
                </label>
                <div className="space-y-3">
                  {projectData.team.map((member, index) => (
                    <div key={member.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Member Name"
                          value={member.name}
                          onChange={(e) => {
                            const newTeam = [...projectData.team];
                            newTeam[index].name = e.target.value;
                            handleProjectDataChange('team', newTeam);
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                          type="text"
                          placeholder="Role"
                          value={member.role}
                          onChange={(e) => {
                            const newTeam = [...projectData.team];
                            newTeam[index].role = e.target.value;
                            handleProjectDataChange('team', newTeam);
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const newTeam = projectData.team.filter((_, i) => i !== index);
                          handleProjectDataChange('team', newTeam);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const newTeam = [...projectData.team, { id: Date.now(), name: '', role: '' }];
                    handleProjectDataChange('team', newTeam);
                  }}
                  className="mt-4 flex items-center px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Project Details Content (from previous version)
    switch (activeNavItem) {
      case 'research-questions':
        return (
          <div className="space-y-4">
            {researchQuestions.map((q) => (
              <div key={q.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => {
                    setResearchQuestions(prev => prev.map(item => 
                      item.id === q.id ? { ...item, question: e.target.value } : item
                    ));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => setResearchQuestions(prev => prev.filter(item => item.id !== q.id))}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setResearchQuestions(prev => [...prev, { id: Date.now(), question: "" }])}
              className="flex items-center px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </button>
          </div>
        );

      // [Previous cases remain the same...]
      default:
        return (
          <Alert>
            <AlertDescription>Select an item from the navigation to begin setup.</AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => navigate('/dashboard')} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Project Overview
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Project Details
            </button>
          </nav>
        </div>

        {/* Content Area */}
        {activeTab === 'details' ? (
          <div className="flex">
            {/* Left Navigation */}
            <div className="w-64 mr-8">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNavItem(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${
                      activeNavItem === item.id
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mr-2 ${
                      activeNavItem === item.id ? 'text-indigo-600' : 'text-gray-400'
                    }`} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>{navItems.find(item => item.id === activeNavItem)?.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderContent()}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </main>
    </div>
  );
};

export default ProjectSetupOverview;
