import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  GraduationCap, 
  Brain, 
  Users, 
  Building2, 
  Globe,
  ArrowLeft,
  Lightbulb,
  FileText,
  HelpCircle,
  ClipboardList,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SinglePagePicoFlow = () => {
  const [currentView, setCurrentView] = useState('domain');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('standard');
  const [formData, setFormData] = useState({
    population: '',
    intervention: '',
    comparison: '',
    outcome: ''
  });

  const navigate = useNavigate();
  const domains = [
    {
      id: 'healthcare',
      name: 'Healthcare & Medicine',
      icon: Heart,
      color: 'bg-red-50',
      description: 'Clinical trials, medical interventions, and healthcare outcomes',
      suggestions: {
        population: ['Adults with type 2 diabetes', 'Children with asthma', 'Elderly patients with hypertension'],
        intervention: ['New medication regimen', 'Lifestyle modification program', 'Surgical procedure'],
        comparison: ['Standard care protocol', 'Placebo treatment', 'Existing medication'],
        outcome: ['Blood glucose levels', 'Quality of life scores', 'Mortality rates']
      }
    },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      color: 'bg-blue-50',
      description: 'Educational interventions and learning outcomes',
      suggestions: {
        population: ['K-12 students', 'University undergraduates', 'Adult learners'],
        intervention: ['Project-based learning', 'Flipped classroom approach', 'Digital learning tools'],
        comparison: ['Traditional lecture format', 'Standard curriculum', 'Self-paced learning'],
        outcome: ['Test scores', 'Student engagement', 'Course completion rates']
      }
    },
    {
      id: 'psychology',
      name: 'Psychology & Behavior',
      icon: Brain,
      color: 'bg-purple-50',
      description: 'Behavioral interventions and psychological outcomes',
      suggestions: {
        population: ['Adults with anxiety', 'Adolescents with depression', 'Individuals with PTSD'],
        intervention: ['Cognitive behavioral therapy', 'Mindfulness training', 'Group therapy sessions'],
        comparison: ['Waitlist control', 'Standard counseling', 'No intervention'],
        outcome: ['Anxiety levels', 'Depression scores', 'Quality of life measures']
      }
    },
    {
      id: 'social',
      name: 'Social Sciences',
      icon: Users,
      color: 'bg-green-50',
      description: 'Social interventions and community outcomes',
      suggestions: {
        population: ['Urban communities', 'Minority groups', 'Low-income families'],
        intervention: ['Community outreach program', 'Social support initiative', 'Policy change'],
        comparison: ['Existing community programs', 'No intervention', 'Different policy approach'],
        outcome: ['Community engagement', 'Social cohesion', 'Economic indicators']
      }
    },
    {
      id: 'business',
      name: 'Business & Economics',
      icon: Building2,
      color: 'bg-yellow-50',
      description: 'Business interventions and economic outcomes',
      suggestions: {
        population: ['Small businesses', 'Corporate employees', 'Start-up companies'],
        intervention: ['Management training', 'Digital transformation', 'New pricing strategy'],
        comparison: ['Traditional methods', 'Competitor approaches', 'Pre-intervention performance'],
        outcome: ['Revenue growth', 'Employee satisfaction', 'Market share']
      }
    },
    {
      id: 'environmental',
      name: 'Environmental Science',
      icon: Globe,
      color: 'bg-emerald-50',
      description: 'Environmental interventions and ecological outcomes',
      suggestions: {
        population: ['Urban ecosystems', 'Marine environments', 'Forest habitats'],
        intervention: ['Conservation method', 'Pollution reduction', 'Sustainable practices'],
        comparison: ['Current practices', 'No intervention', 'Alternative methods'],
        outcome: ['Biodiversity metrics', 'Pollution levels', 'Species population']
      }
    }
  ];

  const questionFormats = {
    standard: {
      name: 'Standard Question',
      icon: HelpCircle,
      description: 'Phrases your research as a clear, direct question',
      example: 'Among diabetic patients, does exercise compared to sedentary lifestyle affect blood glucose?',
      format: (data) => {
        const parts = [];
        if (data.population) parts.push(`Among ${data.population}`);
        if (data.intervention || data.comparison) {
          let comparisonText = '';
          if (data.intervention && data.comparison) {
            comparisonText = `does ${data.intervention} compared to ${data.comparison}`;
          } else if (data.intervention) {
            comparisonText = `does ${data.intervention}`;
          }
          if (comparisonText) parts.push(comparisonText);
        }
        if (data.outcome) parts.push(`affect ${data.outcome}`);
        let question = parts.join(', ');
        return parts.length > 0 ? question.charAt(0).toUpperCase() + question.slice(1) + '?' : '';
      }
    },
    hypothesis: {
      name: 'Hypothesis Statement',
      icon: Target,
      description: 'Presents your research as a testable hypothesis',
      example: 'The implementation of exercise in diabetic patients compared to sedentary lifestyle will result in changes to blood glucose.',
      format: (data) => {
        if (!data.intervention || !data.outcome) return '';
        return `The implementation of ${data.intervention}${data.population ? ` in ${data.population}` : ''}${data.comparison ? ` compared to ${data.comparison}` : ''} will result in changes to ${data.outcome}.`;
      }
    },
    objective: {
      name: 'Research Objective',
      icon: Target,
      description: 'States your research goal as a clear objective',
      example: 'To evaluate the effect of exercise versus sedentary lifestyle in diabetic patients on blood glucose.',
      format: (data) => {
        if (!data.intervention || !data.outcome) return '';
        return `To evaluate the effect of ${data.intervention}${data.comparison ? ` versus ${data.comparison}` : ''}${data.population ? ` in ${data.population}` : ''} on ${data.outcome}.`;
      }
    },
    structured: {
      name: 'Structured Format',
      icon: ClipboardList,
      description: 'Breaks down your research into clear PICO components',
      example: 'Population: Diabetic patients\nIntervention: Exercise\nComparison: Sedentary lifestyle\nOutcome: Blood glucose',
      format: (data) => {
        const parts = [];
        if (data.population) parts.push(`Population: ${data.population}`);
        if (data.intervention) parts.push(`Intervention: ${data.intervention}`);
        if (data.comparison) parts.push(`Comparison: ${data.comparison}`);
        if (data.outcome) parts.push(`Outcome: ${data.outcome}`);
        return parts.join('\n');
      }
    }
  };

  const formattedQuestion = useMemo(() => {
    if (!formData.population && !formData.intervention && !formData.comparison && !formData.outcome) {
      return 'Your research question will appear here as you fill in the PICO elements...';
    }
    return questionFormats[selectedFormat].format(formData) || 'Add more PICO elements to generate a complete question...';
  }, [formData, selectedFormat]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const SuggestionList = ({ suggestions, field, onSelect }) => (
    <div className="mt-2 space-y-2">
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <Lightbulb className="w-4 h-4 mr-2" />
        <span>Suggested examples:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );

  const FormatSelector = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {Object.entries(questionFormats).map(([key, format]) => {
        const Icon = format.icon;
        const isSelected = selectedFormat === key;
        return (
          <button
            key={key}
            onClick={() => setSelectedFormat(key)}
            className={`p-4 rounded-lg border-2 text-left transition-all
              ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}
            `}
          >
            <div className="flex items-start space-x-3">
              <Icon className={`h-6 w-6 mt-1 ${isSelected ? 'text-blue-500' : 'text-gray-500'}`} />
              <div>
                <h4 className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                  {format.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{format.description}</p>
                <p className="text-xs text-gray-500 italic">Example:</p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{format.example}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );

  const picoFields = [
    {
      title: 'Population',
      description: 'Who are you studying?',
      field: 'population'
    },
    {
      title: 'Intervention',
      description: 'What is the main intervention?',
      field: 'intervention'
    },
    {
      title: 'Comparison',
      description: 'What are you comparing against?',
      field: 'comparison'
    },
    {
      title: 'Outcome',
      description: 'What outcomes are you measuring?',
      field: 'outcome'
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

  if (!selectedDomain) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => {
          setCurrentView('domain');
          setSelectedDomain(null);
        }}
        className="flex items-center mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Domains
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold">{selectedDomain.name}</h2>
        <p className="text-gray-600">Define your complete PICO criteria</p>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg shadow mb-8">
        <div className="flex items-center mb-4">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          <h3 className="font-semibold text-blue-600">Research Question Format</h3>
        </div>
        
        <FormatSelector />

        <div className="bg-white rounded-lg p-4">
          <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {formattedQuestion}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {picoFields.map(({ title, description, field }) => (
          <div key={field} className="bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>

            <input
              type="text"
              className="block w-full rounded-md border border-gray-300 px-4 py-3"
              placeholder={`Enter ${title.toLowerCase()}`}
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
            />

            <SuggestionList
              suggestions={selectedDomain.suggestions[field]}
              field={field}
              onSelect={(value) => handleInputChange(field, value)}
            />
          </div>
        ))}

        <div className="flex justify-end space-x-4">
          <button 
            className="px-6 py-2 bg-gray-100 rounded-lg"
            onClick={() => setFormData({
              population: '',
              intervention: '',
              comparison: '',
              outcome: ''
            })}
          >
            Clear All
          </button>
          <button 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => navigate('/education-analysis-settings')}
          >
            Save Research Criteria
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePagePicoFlow;
