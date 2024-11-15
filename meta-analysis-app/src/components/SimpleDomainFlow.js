import React, { useState } from 'react';
import '../index.css';
import { 
  Heart, 
  GraduationCap, 
  Brain, 
  Users, 
  Building2, 
  Globe,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SimpleDomainFlow = () => {
  const [currentView, setCurrentView] = useState('domain');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const navigate = useNavigate();
  const domains = [
    {
      id: 'healthcare',
      name: 'Healthcare & Medicine',
      icon: Heart,
      color: 'bg-red-50',
      description: 'Clinical trials, medical interventions, and healthcare outcomes'
    },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      color: 'bg-blue-50',
      description: 'Educational interventions and learning outcomes'
    },
    {
      id: 'psychology',
      name: 'Psychology & Behavior',
      icon: Brain,
      color: 'bg-purple-50',
      description: 'Behavioral interventions and psychological outcomes'
    },
    {
      id: 'social',
      name: 'Social Sciences',
      icon: Users,
      color: 'bg-green-50',
      description: 'Social interventions and community outcomes'
    },
    {
      id: 'business',
      name: 'Business & Economics',
      icon: Building2,
      color: 'bg-yellow-50',
      description: 'Business interventions and economic outcomes'
    },
    {
      id: 'environmental',
      name: 'Environmental Science',
      icon: Globe,
      color: 'bg-emerald-50',
      description: 'Environmental interventions and ecological outcomes'
    }
  ];

  if (currentView === 'domain') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Select Your Research Domain</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <button
                key={domain.id}
                onClick={() => {
                  setSelectedDomain(domain);
                  setCurrentView('pico');
                }}
                className={`p-6 rounded-xl border-2 hover:shadow-lg text-left ${domain.color}`}
              >
                <div className="flex items-center space-x-4">
                  <Icon className="h-8 w-8" />
                  <div>
                    <h3 className="font-semibold text-lg">{domain.name}</h3>
                    <p className="text-sm text-gray-600">{domain.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (currentView === 'pico') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => setCurrentView('domain')}
          className="flex items-center mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Domains
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">{selectedDomain.name}</h2>
          <p className="text-gray-600">Define your research criteria</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <label className="block mb-2">
              <span className="text-gray-700 font-medium">Population/Participants</span>
              <input
                type="text"
                className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-2"
                placeholder="Define your target population"
              />
            </label>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <label className="block mb-2">
              <span className="text-gray-700 font-medium">Intervention/Program</span>
              <input
                type="text"
                className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-2"
                placeholder="Define your intervention"
              />
            </label>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium mb-4">Pre-configured Settings</h3>
            <p className="text-sm text-gray-600">
              Comparison groups and outcomes will be automatically detected based on your domain.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="px-6 py-2 bg-gray-100 rounded-lg">
              Save Draft
            </button>
            <button onClick={() => navigate('/education-analysis-setup')} className="px-6 py-2 bg-blue-500 text-white rounded-lg">
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SimpleDomainFlow;
