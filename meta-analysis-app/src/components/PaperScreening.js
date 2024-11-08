// import React, { useState } from 'react';
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';
// import { FileText, Search, CheckCircle, Cancel, Warning, Save } from '@mui/icons-material';

// const PaperScreening = () => {
//   const [papers, setPapers] = useState([
//     {
//       id: 1,
//       title: "Meta-analysis of cognitive behavioral therapy",
//       authors: "Smith, J., Johnson, M., Williams, R.",
//       journal: "Journal of Psychology",
//       year: 2020,
//       abstract: "This study examines the effectiveness of CBT across various conditions...",
//       status: "pending",
//       notes: ""
//     },
//     {
//       id: 2,
//       title: "Comparative study of treatment methods",
//       authors: "Brown, A., Davis, L.",
//       journal: "Clinical Research Quarterly",
//       year: 2021,
//       abstract: "A comprehensive comparison of different therapeutic approaches...",
//       status: "pending",
//       notes: ""
//     },
//   ]);

//   const [criteria, setCriteria] = useState({
//     inclusionCriteria: [
//       "RCT or quasi-experimental design",
//       "Published between 2010-2024",
//       "Adult participants (18+ years)",
//       "Published in English"
//     ],
//     exclusionCriteria: [
//       "Case studies or qualitative research",
//       "Non-peer reviewed publications",
//       "Conference abstracts",
//       "Animal studies"
//     ]
//   });

//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPaper, setCurrentPaper] = useState(null);

//   const getStatusColor = (status) => {
//     const colors = {
//       included: "green",
//       excluded: "red",
//       pending: "yellow"
//     };
//     return colors[status] || "gray";
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'included':
//         return <CheckCircle className="w-5 h-5" style={{ color: "green" }} />;
//       case 'excluded':
//         return <Cancel className="w-5 h-5" style={{ color: "red" }} />;
//       case 'pending':
//         return <Warning className="w-5 h-5" style={{ color: "orange" }} />; // Updated to use Warning
//       default:
//         return null;
//     }
//   };

//   const handleUpdateStatus = (paperId, newStatus) => {
//     setPapers(papers.map(paper =>
//       paper.id === paperId ? { ...paper, status: newStatus } : paper
//     ));
//   };

//   const handleUpdateNotes = (paperId, notes) => {
//     setPapers(papers.map(paper =>
//       paper.id === paperId ? { ...paper, notes } : paper
//     ));
//   };

//   const filteredPapers = papers.filter(paper => {
//     const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       paper.authors.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "all" || paper.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const screeningProgress = Math.round((papers.filter(p => p.status !== 'pending').length / papers.length) * 100);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <Card variant="outlined">
//         <CardHeader>
//           <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center' }}>
//             <FileText style={{ marginRight: 8 }} />
//             Paper Selection Criteria
//           </Typography>
//           <Typography variant="body2" color="textSecondary" style={{ display: 'flex', alignItems: 'center' }}>
//             Screening Progress:
//             <CircularProgress variant="determinate" value={screeningProgress} style={{ margin: '0 8px', width: 40, height: 40 }} />
//             {screeningProgress}%
//           </Typography>
//         </CardHeader>

//         <CardContent>
//           {/* Criteria Section */}
//           <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
//             <section style={{ flex: 1, padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
//               <Typography variant="h6" style={{ color: 'green', display: 'flex', alignItems: 'center' }}>
//                 <CheckCircle style={{ marginRight: 8 }} />
//                 Inclusion Criteria
//               </Typography>
//               <List>
//                 {criteria.inclusionCriteria.map((criterion, index) => (
//                   <ListItem key={index}>
//                     <ListItemText primary={criterion} />
//                   </ListItem>
//                 ))}
//               </List>
//             </section>

//             <section style={{ flex: 1, padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
//               <Typography variant="h6" style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
//                 <Cancel style={{ marginRight: 8 }} />
//                 Exclusion Criteria
//               </Typography>
//               <List>
//                 {criteria.exclusionCriteria.map((criterion, index) => (
//                   <ListItem key={index}>
//                     <ListItemText primary={criterion} />
//                   </ListItem>
//                 ))}
//               </List>
//             </section>
//           </div>

//           {/* Search and Filter */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
//             <TextField
//               variant="outlined"
//               placeholder="Search papers by title or author..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: <Search style={{ marginRight: 8 }} />
//               }}
//               fullWidth
//             />
//             <FormControl variant="outlined" style={{ minWidth: 140 }}>
//               <InputLabel>Filter by status</InputLabel>
//               <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Filter by status">
//                 <MenuItem value="all">All Papers</MenuItem>
//                 <MenuItem value="pending">Pending</MenuItem>
//                 <MenuItem value="included">Included</MenuItem>
//                 <MenuItem value="excluded">Excluded</MenuItem>
//               </Select>
//             </FormControl>
//           </div>

//           {/* Papers List */}
//           <div>
//             {filteredPapers.map(paper => (
//               <div key={paper.id} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '16px', marginBottom: '16px', border: '1px solid #e0e0e0', cursor: 'pointer' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                   <div style={{ flexGrow: 1 }}>
//                     <Typography variant="h6" style={{ fontWeight: 'bold' }}>{paper.title}</Typography>
//                     <Typography variant="body2" color="textSecondary">{paper.authors}</Typography>
//                     <Typography variant="body2" color="textSecondary">{paper.journal}, {paper.year}</Typography>
//                     <Typography variant="body2" color="textSecondary">{paper.abstract}</Typography>
//                     <Typography variant="body2" style={{ color: getStatusColor(paper.status), fontWeight: 'bold' }}>
//                       {getStatusIcon(paper.status)} {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
//                     </Typography>
//                   </div>
//                   <div>
//                     <IconButton onClick={() => handleUpdateStatus(paper.id, 'included')}>
//                       <CheckCircle />
//                     </IconButton>
//                     <IconButton onClick={() => handleUpdateStatus(paper.id, 'excluded')}>
//                       <Cancel />
//                     </IconButton>
//                   </div>
//                 </div>
//                 <div style={{ marginTop: '8px' }}>
//                   <TextField
//                     variant="outlined"
//                     placeholder="Add notes..."
//                     multiline
//                     rows={2}
//                     fullWidth
//                     value={paper.notes}
//                     onChange={(e) => handleUpdateNotes(paper.id, e.target.value)}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Action Buttons */}
//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//             <Button
//               variant="outlined"
//               startIcon={<Save />}
//               onClick={() => console.log('Saving screening progress...')}
//               style={{ marginRight: '8px' }}
//             >
//               Save Progress
//             </Button>
//             <Button
//               variant="contained"
//               endIcon={<ArrowRight />}
//               onClick={() => console.log('Moving to codebook setup...')}
//             >
//               Continue to Codebook
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PaperScreening;
