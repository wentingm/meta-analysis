import React, { useState } from 'react';
import { Trash2, Plus, Edit2, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddFieldForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'text',
    required: true,
    placeholder: '',
    options: []
  });

  const handleSubmit = () => {
    if (!formData.name) return;
    onAdd({
      ...formData,
      id: formData.name.toLowerCase().replace(/\s+/g, '_') + '_' + Math.random().toString(36).substr(2, 5)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Field</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Field Name"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
          <select
            value={formData.type}
            onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.required}
              onChange={e => setFormData(prev => ({ ...prev, required: e.target.checked }))}
            />
            <span>Required Field</span>
          </label>
          <input
            type="text"
            placeholder="Example Value"
            value={formData.placeholder}
            onChange={e => setFormData(prev => ({ ...prev, placeholder: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2"
          />
          {formData.type === 'select' && (
            <input
              type="text"
              placeholder="Options (comma-separated)"
              value={formData.options.join(', ')}
              onChange={e => setFormData(prev => ({
                ...prev,
                options: e.target.value.split(',').map(o => o.trim()).filter(Boolean)
              }))}
              className="w-full border rounded-lg px-3 py-2"
            />
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.name}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Add Field
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function CodebookSetup({ selectedCount = 0, onBack }) {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState('outcomes');
  const [editingField, setEditingField] = useState(null);
  const [addingToSection, setAddingToSection] = useState(null);
  const [codebookElements, setCodebookElements] = useState({
    outcomes: {
      title: "Outcome Measures",
      description: "Configure outcome measures and test results parameters to use in the codebook",
      fields: [
        {
          id: 'primaryOutcome',
          name: 'Primary Outcome Measure',
          type: 'text',
          required: true,
          placeholder: 'e.g., Mathematics Achievement Score'
        },
        {
          id: 'measurementTool',
          name: 'Measurement Tool/Scale',
          type: 'text',
          required: true,
          placeholder: 'e.g., Standardized Math Test'
        },
        {
          id: 'timePoints',
          name: 'Measurement Time Points',
          type: 'select',
          required: true,
          options: ['Pre-Post', 'Pre-Post-Follow up', 'Multiple time points']
        }
      ],
      testResults: {
        sections: [
          {
            title: "Intervention Group",
            color: "blue",
            fields: [
              {
                id: 'int_n',
                name: 'Number of Participants (n)',
                type: 'number',
                required: true,
                placeholder: '0'
              },
              {
                id: 'int_pre_mean',
                name: 'Pre-test Mean',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'int_pre_sd',
                name: 'Pre-test SD',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'int_post_mean',
                name: 'Post-test Mean',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'int_post_sd',
                name: 'Post-test SD',
                type: 'number',
                required: true,
                placeholder: '0.00'
              }
            ]
          },
          {
            title: "Control Group",
            color: "gray",
            fields: [
              {
                id: 'ctrl_n',
                name: 'Number of Participants (n)',
                type: 'number',
                required: true,
                placeholder: '0'
              },
              {
                id: 'ctrl_pre_mean',
                name: 'Pre-test Mean',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'ctrl_pre_sd',
                name: 'Pre-test SD',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'ctrl_post_mean',
                name: 'Post-test Mean',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'ctrl_post_sd',
                name: 'Post-test SD',
                type: 'number',
                required: true,
                placeholder: '0.00'
              }
            ]
          },
          {
            title: "Statistical Tests",
            color: "green",
            fields: [
              {
                id: 'test_type',
                name: 'Statistical Test',
                type: 'select',
                required: true,
                options: ['t-test', 'F-test', 'ANOVA', 'ANCOVA']
              },
              {
                id: 'test_value',
                name: 'Test Value',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'df',
                name: 'Degrees of Freedom',
                type: 'number',
                required: true,
                placeholder: '0'
              },
              {
                id: 'p_value',
                name: 'p-value',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'effect_size',
                name: 'Effect Size',
                type: 'number',
                required: true,
                placeholder: '0.00'
              }
            ]
          }
        ]
      }
    }
  });

  const handleAddField = (newField) => {
    setCodebookElements(prev => {
      const newElements = { ...prev };
      if (addingToSection === "Basic Information") {
        newElements.outcomes.fields = [...newElements.outcomes.fields, newField];
      } else {
        const sectionIndex = newElements.outcomes.testResults.sections
          .findIndex(s => s.title === addingToSection);
        if (sectionIndex !== -1) {
          newElements.outcomes.testResults.sections[sectionIndex].fields = [
            ...newElements.outcomes.testResults.sections[sectionIndex].fields,
            newField
          ];
        }
      }
      return newElements;
    });
    setAddingToSection(null);
  };

  const removeField = (sectionTitle, fieldId) => {
    setCodebookElements(prev => {
      const newElements = { ...prev };
      if (sectionTitle === "Basic Information") {
        newElements.outcomes.fields = newElements.outcomes.fields.filter(f => f.id !== fieldId);
      } else {
        const sectionIndex = newElements.outcomes.testResults.sections.findIndex(s => s.title === sectionTitle);
        if (sectionIndex !== -1) {
          newElements.outcomes.testResults.sections[sectionIndex].fields = 
            newElements.outcomes.testResults.sections[sectionIndex].fields.filter(f => f.id !== fieldId);
        }
      }
      return newElements;
    });
  };

  const EditableField = ({ field, section }) => (
    <div key={field.id} className="space-y-1 relative bg-white rounded-lg p-3 border">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg text-gray-900">{field.name}</h3>
            <div className="text-sm text-gray-500 mt-1">
              Type: {field.type}
              {field.required && <span className="text-red-500 ml-2">Required</span>}
            </div>
            {field.type === 'select' && field.options && (
              <div className="text-sm text-gray-500 mt-1">
                Options: {field.options.join(', ')}
              </div>
            )}
            {field.placeholder && (
              <div className="text-sm text-gray-500 mt-1">
                Example: {field.placeholder}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => removeField(section.title, field.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TestResultsSection = ({ section }) => (
    <div className="bg-white rounded-lg p-4 mb-4 border">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">{section.title}</h3>
        <button 
          onClick={() => setAddingToSection(section.title)}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Add Field
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {section.fields.map((field) => (
          <EditableField key={field.id} field={field} section={section} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <span className="mr-2">←</span>
          Back to Paper Selection
        </button>
        <h1 className="text-2xl font-bold mb-2">Statistical Results Codebook Setup</h1>
        <p className="text-gray-600">Configure the variables and parameters that will be used in your codebook</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          {/* Basic Outcome Fields */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Basic Information</h2>
              <button 
                onClick={() => setAddingToSection("Basic Information")}
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add Field
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {codebookElements.outcomes.fields.map((field) => (
                <EditableField 
                  key={field.id} 
                  field={field} 
                  section={{ title: "Basic Information" }}
                />
              ))}
            </div>
          </div>

          {/* Test Results */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Statistical Results</h2>
            </div>
            {codebookElements.outcomes.testResults.sections.map((section) => (
              <TestResultsSection key={section.title} section={section} />
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          Save Draft
        </button>
        <button onClick={() => { navigate('/analysis-setting'); }} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Continue
        </button>
      </div>

      {/* Add Field Modal */}
      {addingToSection && (
        <AddFieldForm
          onAdd={handleAddField}
          onCancel={() => setAddingToSection(null)}
        />
      )}
    </div>
  );
}

export default CodebookSetup;
