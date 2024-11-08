import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, GraduationCap, Brain, Users, Building2, Globe, ArrowLeft } from 'lucide-react';
import './SimpleDomainFlow.css';

const SimpleDomainFlow = () => {
  const [currentView, setCurrentView] = useState('domain');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const navigate = useNavigate();

  const domains = [
    { id: 'healthcare', name: 'Healthcare & Medicine', icon: Heart, color: '#fef2f2', description: 'Clinical trials, medical interventions, and healthcare outcomes' },
    { id: 'education', name: 'Education', icon: GraduationCap, color: '#eff6ff', description: 'Educational interventions and learning outcomes' },
    { id: 'psychology', name: 'Psychology & Behavior', icon: Brain, color: '#f3e8ff', description: 'Behavioral interventions and psychological outcomes' },
    { id: 'social', name: 'Social Sciences', icon: Users, color: '#ecfdf5', description: 'Social interventions and community outcomes' },
    { id: 'business', name: 'Business & Economics', icon: Building2, color: '#fef9c3', description: 'Business interventions and economic outcomes' },
    { id: 'environmental', name: 'Environmental Science', icon: Globe, color: '#e7f5ef', description: 'Environmental interventions and ecological outcomes' }
  ];

  if (currentView === 'domain') {
    return (
      <div className="container">
        <h1 className="title">Select Your Research Domain</h1>
        
        <div className="domain-grid">
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <button
                key={domain.id}
                onClick={() => {
                  setSelectedDomain(domain);
                  setCurrentView('pico');
                }}
                style={{ backgroundColor: domain.color }}
                className="domain-button"
              >
                <Icon className="domain-button-icon" />
                <div>
                  <h3 className="domain-button-title">{domain.name}</h3>
                  <p className="domain-button-description">{domain.description}</p>
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
      <div className="container">
        <button 
          onClick={() => setCurrentView('domain')}
          className="back-button"
        >
          <ArrowLeft className="back-button-icon" />
          Back to Domains
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">{selectedDomain.name}</h2>
          <p className="text-gray-600">Define your research criteria</p>
        </div>

        <div className="space-y-6">
          <div className="form-section">
            <label className="form-label">
              Population/Participants
              <input
                type="text"
                className="form-input"
                placeholder="Define your target population"
              />
            </label>
          </div>

          <div className="form-section">
            <label className="form-label">
              Intervention/Program
              <input
                type="text"
                className="form-input"
                placeholder="Define your intervention"
              />
            </label>
          </div>

          <div className="form-section">
            <h3 className="font-medium mb-4">Pre-configured Settings</h3>
            <p className="text-sm text-gray-600">
              Comparison groups and outcomes will be automatically detected based on your domain.
            </p>
          </div>

          <div className="action-buttons">
            <button className="action-button save-draft">Save Draft</button>
            <button className="action-button continue" onClick={() => navigate('/education-analysis-setup')}>Continue</button>
          </div>
        </div>
      </div>
    );
  }
};

export default SimpleDomainFlow;
