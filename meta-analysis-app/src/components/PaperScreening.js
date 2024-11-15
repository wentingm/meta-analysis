import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Input } from 'lucide-react';
import { Button } from './ui/Button';
import { Textarea } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Progress
} from 'lucide-react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  Save,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaperScreening = () => {
  // Sample paper data - in real app would come from API/database
  const navigate = useNavigate();
  const [papers, setPapers] = useState([
    {
      id: 1,
      title: "Meta-analysis of cognitive behavioral therapy",
      authors: "Smith, J., Johnson, M., Williams, R.",
      journal: "Journal of Psychology",
      year: 2020,
      abstract: "This study examines the effectiveness of CBT across various conditions...",
      status: "pending",
      notes: ""
    },
    {
      id: 2,
      title: "Comparative study of treatment methods",
      authors: "Brown, A., Davis, L.",
      journal: "Clinical Research Quarterly",
      year: 2021,
      abstract: "A comprehensive comparison of different therapeutic approaches...",
      status: "pending",
      notes: ""
    },
    // Add more sample papers as needed
  ]);

  const [criteria, setCriteria] = useState({
    inclusionCriteria: [
      "RCT or quasi-experimental design",
      "Published between 2010-2024",
      "Adult participants (18+ years)",
      "Published in English"
    ],
    exclusionCriteria: [
      "Case studies or qualitative research",
      "Non-peer reviewed publications",
      "Conference abstracts",
      "Animal studies"
    ]
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPaper, setCurrentPaper] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      included: "text-green-600",
      excluded: "text-red-600",
      pending: "text-yellow-600"
    };
    return colors[status] || "text-gray-600";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'included':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'excluded':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const handleUpdateStatus = (paperId, newStatus) => {
    setPapers(papers.map(paper => 
      paper.id === paperId ? { ...paper, status: newStatus } : paper
    ));
  };

  const handleUpdateNotes = (paperId, notes) => {
    setPapers(papers.map(paper => 
      paper.id === paperId ? { ...paper, notes } : paper
    ));
  };

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authors.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || paper.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const screeningProgress = Math.round((papers.filter(p => p.status !== 'pending').length / papers.length) * 100);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="border-t-4 border-t-purple-500 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-500" />
              <span>Paper Selection Criteria</span>
            </div>
            <div className="text-sm font-normal flex items-center gap-2">
              <span>Screening Progress:</span>
              <Progress value={screeningProgress} className="w-32 h-2" />
              <span>{screeningProgress}%</span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Criteria Section */}
          <div className="grid grid-cols-2 gap-6">
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-5 h-5" />
                Inclusion Criteria
              </h3>
              <ul className="space-y-2">
                {criteria.inclusionCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                    <span className="text-sm">{criterion}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                Exclusion Criteria
              </h3>
              <ul className="space-y-2">
                {criteria.exclusionCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
                    <span className="text-sm">{criterion}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search papers by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Papers</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="included">Included</SelectItem>
                  <SelectItem value="excluded">Excluded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Papers List */}
          <div className="space-y-4">
            {filteredPapers.map(paper => (
              <div key={paper.id} className="bg-white rounded-lg p-4 shadow-sm border hover:border-purple-200 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <h4 className="font-medium text-lg mb-1">{paper.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{paper.authors}</p>
                    <p className="text-sm text-gray-500">{paper.journal}, {paper.year}</p>
                    
                    {currentPaper === paper.id && (
                      <div className="mt-4 space-y-4">
                        <p className="text-sm text-gray-700">{paper.abstract}</p>
                        <Textarea
                          placeholder="Add screening notes..."
                          value={paper.notes}
                          onChange={(e) => handleUpdateNotes(paper.id, e.target.value)}
                          className="w-full h-24"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPaper(currentPaper === paper.id ? null : paper.id)}
                      className="text-gray-600"
                    >
                      {currentPaper === paper.id ? 'Less' : 'More'}
                    </Button>
                    <Select
                      value={paper.status}
                      onValueChange={(value) => handleUpdateStatus(paper.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Set status">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(paper.status)}
                            <span className={getStatusColor(paper.status)}>
                              {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                            </span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            Pending
                          </div>
                        </SelectItem>
                        <SelectItem value="included">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            Included
                          </div>
                        </SelectItem>
                        <SelectItem value="excluded">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-600" />
                            Excluded
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center space-x-4 pt-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
              onClick={() => console.log('Saving screening progress...')}
            >
              <Save className="w-4 h-4" />
              Save Progress
            </Button>
            <Button
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600"
              onClick={() => navigate('/paper-list-review')}
            >
              Continue to Codebook
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaperScreening;
