import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import {
  ArrowLeft,
  Brain,
  Users,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProjectSetup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the state from the location object
  const { state } = location;
    console.log('state',state)
  // Initialize state for project data
  const [projectData, setProjectData] = useState({
    title: state?.title || "",
    description: state?.description || "",
    selectedDomain: state?.selectedDomain || null,
  });

  // Log to verify received state
  useEffect(() => {
    console.log("Received State:", state);
  }, [state]);

  // Handle input change
  const handleInputChange = (field, value) => {
    setProjectData({ ...projectData, [field]: value });
  };

  // Check if the form is valid
  const isFormValid = projectData.title.trim() !== "" && projectData.description.trim() !== "";

  const handleSaveAndContinue = () => {
    console.log("Navigating to /pico with state:", projectData);
    if (isFormValid) {
      navigate('/pico-flow', {
        state: {
          title: projectData.title,
          description: projectData.description,
          selectedDomain: projectData.selectedDomain
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button className="flex items-center text-gray-600 hover:text-gray-900"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Project Title */}
              <div>
                <label htmlFor="project-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  id="project-title"
                  type="text"
                  value={projectData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter project title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description
                </label>
                <textarea
                  id="project-description"
                  value={projectData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter project description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Team Link */}
              <div className="border-t border-gray-200 pt-6">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Team Members</h3>
                      <p className="text-sm text-gray-500">Add or manage team members</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Save and Continue Button */}
              <div className="pt-6">
              <button
                  onClick={handleSaveAndContinue}
                  disabled={!isFormValid}
                  className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Save Project and Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProjectSetup;
