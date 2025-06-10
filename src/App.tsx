import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import SubjectView from './components/Subject/SubjectView';
import Calculator from './components/Tools/Calculator';
import Chatbot from './components/Tools/Chatbot';
import { Subject } from './types';

function AppContent() {
  const { state, dispatch } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {selectedSubject ? (
          <SubjectView
            subject={selectedSubject}
            onBack={() => setSelectedSubject(null)}
          />
        ) : (
          <Dashboard onSubjectSelect={setSelectedSubject} />
        )}
      </main>

      {state.showCalculator && (
        <Calculator onClose={() => dispatch({ type: 'TOGGLE_CALCULATOR' })} />
      )}

      {state.showChatbot && (
        <Chatbot onClose={() => dispatch({ type: 'TOGGLE_CHATBOT' })} />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;