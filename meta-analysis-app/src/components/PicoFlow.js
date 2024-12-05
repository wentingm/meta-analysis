// Pico.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Heart, GraduationCap, Brain, Users, Building2, Globe } from 'lucide-react';

const PicoFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDomain = location.state || null;

  const domains = [
    {
      id: 'healthcare',
      icon: Heart,
    },
    {
      id: 'education',
      icon: GraduationCap,
    },
    {
      id: 'psychology',
      icon: Brain,
    },
    {
      id: 'social',
      icon: Users,
    },
    {
      id: 'business',
      icon: Building2,
    },
    {
      id: 'environmental',
      icon: Globe,
    },
  ];

  if (!selectedDomain) {
    navigate('/create-project');
    return null;
  }

  const { id, name, description, color } = selectedDomain;
  const Icon = domains.find((domain) => domain.id === id)?.icon || null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => navigate('/select-domain')}
        className="flex items-center mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Domains
      </button>

      <div className="mb-6">
        {Icon && <Icon className="h-10 w-10 text-gray-700" />}
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-gray-600">{description}</p>
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
};

export default PicoFlow;
