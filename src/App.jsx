import React, { useState, useMemo } from 'react';
import { Search, FileText, Stethoscope, Pill, AlertTriangle, Book, Info, ArrowLeft } from 'lucide-react';
import {
  assessmentsContent,
  medicationsContent,
  alertsContent,
  halakhaContent,
  infoContent
} from './data/contentData';

// Reusable table component
const DataTable = ({ headers, rows, className = '' }) => (
  <div className="overflow-x-auto">
    <table className={`min-w-full border-collapse border border-gray-300 ${className}`}>
      <thead>
        <tr className="bg-blue-50">
          {headers.map((header, idx) => (
            <th key={idx} className="border border-gray-300 px-3 py-2 text-left font-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
            {row.map((cell, cellIdx) => (
              <td key={cellIdx} className="border border-gray-300 px-3 py-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Reusable pneumonic/list component
const PneumonicList = ({ items }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300">
      <tbody>
        {items.map((item, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
            <td className="border border-gray-300 px-3 py-2 font-bold w-12 text-center">
              {item.letter}
            </td>
            <td className="border border-gray-300 px-3 py-2">
              {item.meaning}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Component to render assessment content
const AssessmentContent = ({ contentKey, data }) => {
  const content = data.content;
  
  return (
    <div className="space-y-6">
      {/* Tables */}
      {content.tables && content.tables.map((table, idx) => (
        <div key={idx}>
          {content.description && idx === 0 && (
            <p className="mb-4 text-gray-700">{content.description}</p>
          )}
          <DataTable headers={table.headers} rows={table.rows} />
        </div>
      ))}
      
      {/* Recognition section */}
      {content.recognition && (
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
          <h3 className="font-bold text-blue-900 mb-3">{content.recognition.title || 'Recognition'}</h3>
          {content.recognition.description && (
            <p className="mb-3">{content.recognition.description}</p>
          )}
          {content.recognition.pneumonic && (
            <PneumonicList items={content.recognition.pneumonic} />
          )}
          {content.recognition.criteria && (
            <DataTable 
              headers={content.recognition.criteria.headers} 
              rows={content.recognition.criteria.rows} 
            />
          )}
          {content.recognition.note && (
            <p className="mt-3 text-sm text-red-700 font-semibold">{content.recognition.note}</p>
          )}
          {content.recognition.table && (
            <DataTable 
              headers={content.recognition.table.headers} 
              rows={content.recognition.table.rows} 
            />
          )}
        </div>
      )}
      
      {/* Assessment section */}
      {content.assessment && (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
          <h3 className="font-bold text-yellow-900 mb-3">Assessment</h3>
          {content.assessment.description && (
            <p className="mb-3">{content.assessment.description}</p>
          )}
          {content.assessment.decisionTable && (
            <DataTable 
              headers={content.assessment.decisionTable.headers} 
              rows={content.assessment.decisionTable.rows} 
            />
          )}
        </div>
      )}
      
      {/* Protocols section */}
      {content.protocols && (
        <div className="space-y-4">
          {Object.entries(content.protocols).map(([key, protocol]) => (
            <div key={key} className="p-4 bg-green-50 border-l-4 border-green-500">
              <h3 className="font-bold text-green-900 mb-3">{protocol.title}</h3>
              {protocol.steps && (
                <ul className="list-disc pl-5 space-y-1">
                  {protocol.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              )}
              {protocol.adult && (
                <div className="mt-3">
                  <h4 className="font-semibold mb-2">Adult:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {protocol.adult.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}
              {protocol.child && (
                <div className="mt-3">
                  <h4 className="font-semibold mb-2">Child:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {protocol.child.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Adrenaline Dosing */}
      {content.adrenalineDosing && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500">
          <h3 className="font-bold text-red-900 mb-3">Adrenaline Dosing</h3>
          <p className="mb-3">{content.adrenalineDosing.description}</p>
          <DataTable 
            headers={content.adrenalineDosing.table.headers} 
            rows={content.adrenalineDosing.table.rows} 
          />
          {content.adrenalineDosing.notes && (
            <ul className="list-disc pl-5 space-y-1 mt-3 text-sm">
              {content.adrenalineDosing.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {/* Ventilation Rates */}
      {content.ventilationRates && (
        <div className="p-4 bg-purple-50 border-l-4 border-purple-500">
          <h3 className="font-bold text-purple-900 mb-3">Ventilation Rates</h3>
          {content.ventilationRates.description && (
            <p className="mb-3">{content.ventilationRates.description}</p>
          )}
          {content.ventilationRates.table && (
            <DataTable 
              headers={content.ventilationRates.table.headers} 
              rows={content.ventilationRates.table.rows} 
            />
          )}
        </div>
      )}
      
      {/* Management section */}
      {content.management && (Array.isArray(content.management) ? (
        <div className="p-4 bg-green-50 border-l-4 border-green-500">
          <h3 className="font-bold text-green-900 mb-3">Management</h3>
          <ul className="list-disc pl-5 space-y-1">
            {content.management.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-4 bg-green-50 border-l-4 border-green-500">
          <h3 className="font-bold text-green-900 mb-3">{content.management.title}</h3>
          {content.management.whenLessAdequate && (
            <div>
              <p className="font-semibold mb-2">{content.management.whenLessAdequate.condition}</p>
              <ul className="list-disc pl-5 space-y-1">
                {content.management.whenLessAdequate.actions.map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      
      {/* Clinical Flags */}
      {content.redFlags && (
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border-l-4 border-red-500">
            <h3 className="font-bold text-red-900 mb-3">
              {content.redFlags.adultsAndPaediatrics.description}
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {content.redFlags.adultsAndPaediatrics.flags.map((flag, idx) => (
                <li key={idx}>{flag}</li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 bg-red-50 border-l-4 border-red-500">
            <h3 className="font-bold text-red-900 mb-3">
              {content.redFlags.paediatricsOnly.description}
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {content.redFlags.paediatricsOnly.flags.map((flag, idx) => (
                <li key={idx}>{flag}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {content.yellowFlags && (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
          <h3 className="font-bold text-yellow-900 mb-3">{content.yellowFlags.title}</h3>
          <ul className="list-disc pl-5 space-y-1">
            {content.yellowFlags.flags.map((flag, idx) => (
              <li key={idx}>{flag}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Pain Assessment */}
      {content.wongBaker && (
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
          <h3 className="font-bold text-blue-900 mb-2">{content.wongBaker.title}</h3>
          <p className="mb-2">{content.wongBaker.description}</p>
          <p className="text-sm text-red-700 font-semibold">{content.wongBaker.warning}</p>
        </div>
      )}
      
      {content.dolor && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500">
          <h3 className="font-bold text-green-900 mb-3">{content.dolor.title}</h3>
          <PneumonicList items={content.dolor.pneumonic} />
          {content.dolor.notes && (
            <div className="mt-3 space-y-1 text-sm">
              {content.dolor.notes.map((note, idx) => (
                <p key={idx}>{note}</p>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Weight Calculations */}
      {content.formulas && (
        <div>
          <p className="mb-3 font-semibold">{content.description}</p>
          <DataTable 
            headers={content.formulas.table.headers} 
            rows={content.formulas.table.rows} 
          />
        </div>
      )}
      
      {/* Notes */}
      {content.notes && (
        <div className="p-4 bg-gray-50 border-l-4 border-gray-400">
          <h4 className="font-semibold mb-2">Notes:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {content.notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Component to render medication content
const MedicationContent = ({ data }) => (
  <div className="space-y-6">
    {/* Indications */}
    <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
      <h3 className="font-bold text-blue-900 mb-2">Indications</h3>
      <ul className="list-disc pl-5 space-y-1">
        {data.indications.map((indication, idx) => (
          <li key={idx}>{indication}</li>
        ))}
      </ul>
    </div>
    
    {/* Preparations */}
    {data.preparations && (
      <div className="p-4 bg-purple-50 border-l-4 border-purple-500">
        <h3 className="font-bold text-purple-900 mb-2">Preparations</h3>
        {data.preparations.map((prep, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-semibold">{prep.name}:</span> {prep.use}
          </div>
        ))}
      </div>
    )}
    
    {/* Dosing */}
    <div className="p-4 bg-green-50 border-l-4 border-green-500">
      <h3 className="font-bold text-green-900 mb-3">Dosing</h3>
      {Object.entries(data.dosing).map(([key, dosing]) => (
        <div key={key} className="mb-4 last:mb-0">
          <h4 className="font-semibold capitalize mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}:</h4>
          
          {dosing.route && <p className="mb-1"><span className="font-medium">Route:</span> {dosing.route}</p>}
          {dosing.dose && <p className="mb-1"><span className="font-medium">Dose:</span> {dosing.dose}</p>}
          {dosing.adultDose && <p className="mb-1"><span className="font-medium">Adult:</span> {dosing.adultDose}</p>}
          {dosing.paediatricDose && <p className="mb-1"><span className="font-medium">Paediatric:</span> {dosing.paediatricDose}</p>}
          {dosing.repeat && <p className="mb-1"><span className="font-medium">Repeat:</span> {dosing.repeat}</p>}
          {dosing.notes && <p className="mb-1 text-sm italic">{dosing.notes}</p>}
          
          {dosing.doses && (
            <DataTable 
              headers={['Weight', 'Age', 'Dose']}
              rows={dosing.doses.map(d => [d.weight, d.age, d.dose])}
              className="mt-2"
            />
          )}
        </div>
      ))}
    </div>
    
    {/* Contraindications */}
    {data.contraindications && (
      <div className="p-4 bg-red-50 border-l-4 border-red-500">
        <h3 className="font-bold text-red-900 mb-2">Contraindications</h3>
        <ul className="list-disc pl-5 space-y-1">
          {data.contraindications.map((contra, idx) => (
            <li key={idx}>{contra}</li>
          ))}
        </ul>
      </div>
    )}
    
    {/* Side Effects */}
    {data.sideEffects && (
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
        <h3 className="font-bold text-yellow-900 mb-2">Side Effects</h3>
        <ul className="list-disc pl-5 space-y-1">
          {data.sideEffects.map((effect, idx) => (
            <li key={idx}>{effect}</li>
          ))}
        </ul>
      </div>
    )}
    
    {/* Administration */}
    {data.administration && (
      <div className="p-4 bg-purple-50 border-l-4 border-purple-500">
        <h3 className="font-bold text-purple-900 mb-2">Administration</h3>
        <ul className="list-disc pl-5 space-y-1">
          {data.administration.map((instruction, idx) => (
            <li key={idx}>{instruction}</li>
          ))}
        </ul>
      </div>
    )}
    
    {/* Notes */}
    {data.notes && (
      <div className="p-4 bg-gray-50 border-l-4 border-gray-400">
        <h3 className="font-bold text-gray-900 mb-2">Important Notes</h3>
        <ul className="list-disc pl-5 space-y-1">
          {data.notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);

  // Define main sections
  const sections = [
    {
      id: 'assessments',
      title: 'Assessments',
      icon: <Stethoscope className="w-5 h-5" />,
      content: assessmentsContent
    },
    {
      id: 'medications',
      title: 'Medications',
      icon: <Pill className="w-5 h-5" />,
      content: medicationsContent
    },
    {
      id: 'alerts',
      title: 'Alerts',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: alertsContent
    },
    {
      id: 'halakha',
      title: 'Halakha',
      icon: <Book className="w-5 h-5" />,
      content: halakhaContent
    },
    {
      id: 'info',
      title: 'Info',
      icon: <Info className="w-5 h-5" />,
      content: infoContent
    }
  ];

  // Simple fuzzy search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results = [];
    
    sections.forEach(section => {
      Object.entries(section.content).forEach(([key, item]) => {
        const title = item.title?.toLowerCase() || '';
        const contentStr = JSON.stringify(item).toLowerCase();
        
        if (title.includes(query) || contentStr.includes(query)) {
          results.push({
            section: section.id,
            sectionTitle: section.title,
            key,
            title: item.title,
            icon: section.icon
          });
        }
      });
    });
    
    return results;
  }, [searchQuery]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setSelectedSubsection(null);
    setSearchQuery('');
  };

  const handleSubsectionClick = (key) => {
    setSelectedSubsection(key);
  };

  const handleBackToSections = () => {
    setSelectedSection(null);
    setSelectedSubsection(null);
  };

  const handleBackToSubsections = () => {
    setSelectedSubsection(null);
  };

  const renderContent = () => {
    if (selectedSubsection && selectedSection) {
      const data = selectedSection.content[selectedSubsection];
      
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <button 
                onClick={handleBackToSubsections}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to {selectedSection.title}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3 mb-6">
              {selectedSection.icon}
              <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
            </div>
            
            {selectedSection.id === 'assessments' && (
              <AssessmentContent contentKey={selectedSubsection} data={data} />
            )}
            
            {selectedSection.id === 'medications' && (
              <MedicationContent data={data} />
            )}
            
            {selectedSection.id === 'alerts' && data.alerts && (
              <div className="space-y-4">
                {data.alerts.map((alert, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 border-l-4 ${
                      alert.priority === 'CRITICAL' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
                    }`}
                  >
                    <h3 className={`font-bold mb-2 ${
                      alert.priority === 'CRITICAL' ? 'text-red-900' : 'text-yellow-900'
                    }`}>
                      {alert.title}
                      <span className="ml-2 text-xs px-2 py-1 rounded bg-white">
                        {alert.priority}
                      </span>
                    </h3>
                    <p>{alert.content}</p>
                  </div>
                ))}
              </div>
            )}
            
            {(selectedSection.id === 'halakha' || selectedSection.id === 'info') && data.content && (
              <div className="p-4 bg-gray-50 border-l-4 border-gray-400">
                <p className="text-gray-600 italic">{data.content}</p>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    if (selectedSection) {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <button 
                onClick={handleBackToSections}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3 mb-6">
              {selectedSection.icon}
              <h2 className="text-2xl font-bold text-gray-900">{selectedSection.title}</h2>
            </div>
            
            <div className="grid gap-4">
              {Object.entries(selectedSection.content).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => handleSubsectionClick(key)}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.content?.description || item.indications?.[0] || 'Click to view details'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    if (searchQuery && searchResults.length > 0) {
      return (
        <div className="space-y-4">
          {searchResults.map((result, idx) => (
            <button
              key={idx}
              onClick={() => {
                const section = sections.find(s => s.id === result.section);
                setSelectedSection(section);
                setSelectedSubsection(result.key);
                setSearchQuery('');
              }}
              className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-2">
                {result.icon}
                <span className="text-sm text-gray-500">{result.sectionTitle}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{result.title}</h3>
            </button>
          ))}
        </div>
      );
    }
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Clinical Practice Guidelines
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Access comprehensive medical guidelines, medication dosing, and emergency protocols. 
          Use the search bar above or navigate through sections using the bottom menu.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hatzolah CPG</h1>
              <p className="text-sm text-gray-600">Clinical Practice Guidelines v4.9</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search guidelines..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <p className="text-sm text-gray-600 mt-2">
            Found {searchResults.length} results
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex justify-around items-center py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section)}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                  selectedSection?.id === section.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="w-6 h-6 mb-1">
                  {section.icon}
                </div>
                <span className="text-xs font-medium leading-tight">
                  {section.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default App;