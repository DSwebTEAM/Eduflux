import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Badge } from '../types';

interface AppState {
  user: User | null;
  showCalculator: boolean;
  showChatbot: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_POINTS'; payload: number }
  | { type: 'ADD_BADGE'; payload: Badge }
  | { type: 'COMPLETE_TOPIC'; payload: string }
  | { type: 'TOGGLE_CALCULATOR' }
  | { type: 'TOGGLE_CHATBOT' };

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Student',
    email: 'student@example.com',
    points: 150,
    badges: [],
    completedTopics: ['physics-1-1', 'chemistry-1-1'],
    currentStreak: 5,
    level: 2
  },
  showCalculator: false,
  showChatbot: false
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null
});

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_POINTS':
      return {
        ...state,
        user: state.user ? { ...state.user, points: state.user.points + action.payload } : null
      };
    case 'ADD_BADGE':
      return {
        ...state,
        user: state.user ? { ...state.user, badges: [...state.user.badges, action.payload] } : null
      };
    case 'COMPLETE_TOPIC':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          completedTopics: [...state.user.completedTopics, action.payload]
        } : null
      };
    case 'TOGGLE_CALCULATOR':
      return { ...state, showCalculator: !state.showCalculator };
    case 'TOGGLE_CHATBOT':
      return { ...state, showChatbot: !state.showChatbot };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};