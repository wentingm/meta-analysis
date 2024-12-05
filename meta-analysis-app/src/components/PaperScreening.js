import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import Input from "./ui/Input";
import { Modal, Button } from 'react-bootstrap';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  Save,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Pencil
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaperScreening() {
  const navigate = useNavigate(); 
  const [criteria, setCriteria] = useState({
    inclusionCriteria: [
      { id: 1, text: "Reported original data", isEditing: false },
      { id: 2, text: "Assessed treatment outcomes after participants interact with [your application/tool/medicine etc.]", isEditing: false },
      { id: 3, text: "Compared outcomes from the experiment group with outcomes from a non-treatment mode from the control/comparison group", isEditing: false },
      { id: 4, text: "Were publicly available, either online or in library archives", isEditing: false },
      { id: 5, text: "Reported sufficient data to calculate effect size", isEditing: false },
      { id: 6, text: "Reported measurable outcomes that can be further analyzed", isEditing: false }
    ],
    exclusionCriteria: [
      { id: 1, text: "Case studies or qualitative research", isEditing: false },
      { id: 2, text: "Non-peer reviewed publications", isEditing: false },
      { id: 3, text: "Conference abstracts", isEditing: false },
      { id: 4, text: "Animal studies", isEditing: false }
    ]
  });

  const [newCriterion, setNewCriterion] = useState({ inclusion: "", exclusion: "" });
  const [editingText, setEditingText] = useState("");
  const [criterionToDelete, setCriterionToDelete] = useState({ type: null, id: null });
  const [showModal, setShowModal] = useState(false);
  
  const handleAddCriterion = (type) => {
    if (newCriterion[type].trim()) {
      setCriteria(prev => ({
        ...prev,
        [`${type}Criteria`]: [
          ...prev[`${type}Criteria`],
          { id: Date.now(), text: newCriterion[type], isEditing: false }
        ]
      }));
      setNewCriterion(prev => ({ ...prev, [type]: "" }));
    }
  };

  const handleEditCriterion = (type, id) => {
    setCriteria(prev => ({
      ...prev,
      [`${type}Criteria`]: prev[`${type}Criteria`].map(criterion => {
        if (criterion.id === id) {
          setEditingText(criterion.text);
          return { ...criterion, isEditing: true };
        }
        return { ...criterion, isEditing: false };
      })
    }));
  };

  const handleSaveEdit = (type, id) => {
    if (!editingText.trim()) return;
    
    setCriteria(prev => ({
      ...prev,
      [`${type}Criteria`]: prev[`${type}Criteria`].map(criterion => {
        if (criterion.id === id) {
          return { ...criterion, text: editingText, isEditing: false };
        }
        return criterion;
      })
    }));
  };

  const handleDeleteCriterion = () => {
    if (criterionToDelete.type && criterionToDelete.id) {
      setCriteria(prev => ({
        ...prev,
        [`${criterionToDelete.type}Criteria`]: prev[`${criterionToDelete.type}Criteria`]
          .filter(criterion => criterion.id !== criterionToDelete.id)
      }));
      setCriterionToDelete({ type: null, id: null });
    }
    setShowModal(false);
  };

  const CriterionList = ({ type, icon: Icon, color }) => (
    <section className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 text-${color}-700`}>
        <Icon className="w-5 h-5" />
        {type === 'inclusion' ? 'Inclusion' : 'Exclusion'} Criteria
      </h3>
      
      <ul className="space-y-3 mb-4 p-0">
        {criteria[`${type}Criteria`].map((criterion) => (
          <li key={criterion.id} className="group">
            <div className="flex items-start justify-between p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-start gap-2 flex-grow">
                <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500 mt-2 flex-shrink-0`} />
                <span className="text-sm">{criterion.text}</span>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="no-outline-primary"
                  size="sm"
                  onClick={() => handleEditCriterion(type, criterion.id)}
                  className="p-1.5 h-8 w-8 rounded-full text-gray-500"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="no-outline-danger"
                  size="sm"
                  className="p-1.5 h-8 w-8 rounded-full text-red-500"
                  onClick={() => {
                    setCriterionToDelete({ type, id: criterion.id });
                    setShowModal(true);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 mt-4">
        <Input
        placeholder = {`Add new ${type === 'inclusion' ? 'Inclusion' : 'Exclusion'} Criteria`}
        className="w-64 flex-grow rounded-md px-3 py-2"> 
        </Input>
        <Button
            variant="no-outline-primary"
            size="sm"
            className="p-1.5 h-8 w-auto rounded-full text-gray-500 flex items-center justify-center"
        >
            <span className="text-sm">+ Add</span>
        </Button>
      </div>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="border-t-4 border-t-purple-500 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-500" />
            Paper Selection Criteria
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <CriterionList type="inclusion" icon={CheckCircle2} color="green" />
            <CriterionList type="exclusion" icon={XCircle} color="red" />
          </div>

          <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Progress
            </Button>
            <Button className="flex items-center gap-2"
            onClick={() => navigate('/codebook-setup')}>
              Continue to Codebook
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Criterion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this criterion? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCriterion}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
