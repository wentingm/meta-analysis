import React, { useState } from 'react';
import '../index.css';
import { Trash2, Plus, Edit2, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CodebookSetup({ selectedCount = 0, onBack }) {
  const [expandedSection, setExpandedSection] = useState('outcomes');
  const [editingField, setEditingField] = useState(null);
  const navigate = useNavigate();
  const colorMapping = {
    blue: 'bg-blue-50',
    gray: 'bg-gray-50',
    green: 'bg-green-50'
  };
  
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
        title: "Test Results",
        description: "Enter statistical results for intervention and control groups",
        sections: [
          {
            title: "Intervention Group",
            color: 'bg-blue-50',
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
            color: colorMapping.gray,
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
            color: colorMapping.green,
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

  const [editForm, setEditForm] = useState({
    name: '',
    type: 'text',
    required: true,
    placeholder: '',
    options: []
  });

  const startEditing = (field) => {
    setEditingField(field.id);
    setEditForm({
      name: field.name,
      type: field.type,
      required: field.required,
      placeholder: field.placeholder,
      options: field.options || []
    });
  };

  const saveEdit = (sectionTitle, fieldId) => {
    setCodebookElements(prev => {
      const newElements = { ...prev };
      if (sectionTitle === "Basic Information") {
        const fieldIndex = newElements.outcomes.fields.findIndex(f => f.id === fieldId);
        if (fieldIndex !== -1) {
          newElements.outcomes.fields[fieldIndex] = {
            ...newElements.outcomes.fields[fieldIndex],
            ...editForm
          };
        }
      } else {
        const sectionIndex = newElements.outcomes.testResults.sections.findIndex(s => s.title === sectionTitle);
        if (sectionIndex !== -1) {
          const fieldIndex = newElements.outcomes.testResults.sections[sectionIndex].fields.findIndex(f => f.id === fieldId);
          if (fieldIndex !== -1) {
            newElements.outcomes.testResults.sections[sectionIndex].fields[fieldIndex] = {
              ...newElements.outcomes.testResults.sections[sectionIndex].fields[fieldIndex],
              ...editForm
            };
          }
        }
      }
      return newElements;
    });
    setEditingField(null);
  };

  const EditableField = ({ field, section }) => {
    const isEditing = editingField === field.id;

    return (
      <div key={field.id} className="space-y-1 relative">
        {!isEditing ? (
          <>
            <div className="flex justify-between items-start">
              <label className="block text-sm font-medium text-gray-700">
                {field.name}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="flex space-x-2">
                <button 
                  onClick={() => startEditing(field)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => removeField(section.title, field.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {field.type === 'select' ? (
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="">Select...</option>
                {field.options?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full border rounded-lg px-3 py-2"
              />
            )}
          </>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.name}
                onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Field name"
              />
              <div className="flex space-x-2">
                <select
                  value={editForm.type}
                  onChange={e => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="select">Select</option>
                </select>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editForm.required}
                    onChange={e => setEditForm(prev => ({ ...prev, required: e.target.checked }))}
                  />
                  <span className="text-sm">Required</span>
                </label>
              </div>
              <input
                type="text"
                value={editForm.placeholder}
                onChange={e => setEditForm(prev => ({ ...prev, placeholder: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Placeholder text"
              />
              {editForm.type === 'select' && (
                <input
                  type="text"
                  value={editForm.options.join(', ')}
                  onChange={e => setEditForm(prev => ({ ...prev, options: e.target.value.split(',').map(o => o.trim()) }))}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Options (comma-separated)"
                />
              )}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingField(null)}
                  className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <X size={16} />
                </button>
                <button
                  onClick={() => saveEdit(section.title, field.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Check size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const TestResultsSection = ({ section }) => (
    <div className={`bg-${section.color}-50 rounded-lg p-4 mb-4`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">{section.title}</h3>
        <button className="text-blue-500 hover:text-blue-700 flex items-center">
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
        <button onClick={() => { navigate('/paper-list-review'); }}  className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <span className="mr-2">←</span>
          Back to Paper Selection
        </button>
        <h1 className="text-2xl font-bold mb-2">Statistical Results Codebook</h1>
        <p className="text-gray-600">Configure outcome measures and test results parameters to use in the codebook</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          {/* Basic Outcome Fields */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Basic Information</h2>
              <button className="text-blue-500 hover:text-blue-700 flex items-center">
                <Plus size={16} className="mr-1" />
                Add Field
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
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
              <button className="text-blue-500 hover:text-blue-700 flex items-center">
                <Plus size={16} className="mr-1" />
                Add Section
              </button>
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
    </div>
  );
}

export default CodebookSetup;
