// Domain.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, GraduationCap, Brain, Users, Building2, Globe } from 'lucide-react';

const SimpleDomainFlow = () => {
  const navigate = useNavigate();

  const domains = [
    {
      id: 'healthcare',
      name: 'Healthcare & Medicine',
      icon: Heart,
      color: 'bg-red-50',
      description: 'Clinical trials, medical interventions, and healthcare outcomes',
    },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      color: 'bg-blue-50',
      description: 'Educational interventions and learning outcomes',
    },
    {
      id: 'psychology',
      name: 'Psychology & Behavior',
      icon: Brain,
      color: 'bg-purple-50',
      description: 'Behavioral interventions and psychological outcomes',
    },
    {
      id: 'social',
      name: 'Social Sciences',
      icon: Users,
      color: 'bg-green-50',
      description: 'Social interventions and community outcomes',
    },
    {
      id: 'business',
      name: 'Business & Economics',
      icon: Building2,
      color: 'bg-yellow-50',
      description: 'Business interventions and economic outcomes',
    },
    {
      id: 'environmental',
      name: 'Environmental Science',
      icon: Globe,
      color: 'bg-emerald-50',
      description: 'Environmental interventions and ecological outcomes',
    },
  ];

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
                navigate('/project-setup', {
                  state: {
                    id: domain.id,
                    name: domain.name,
                    description: domain.description,
                    color: domain.color,
                  },
                });
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
};

export default SimpleDomainFlow;
