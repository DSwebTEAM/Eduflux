import { Subject } from '../types';

export const subjects: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    color: 'blue',
    icon: 'Zap',
    chapters: [
      {
        id: 'physics-1',
        title: 'Electric Charges and Fields',
        description: 'Understanding electric charges, Coulomb\'s law, and electric fields',
        estimatedTime: '2 hours',
        topics: [
          {
            id: 'physics-1-1',
            title: 'Electric Charge',
            content: `Electric charge is a fundamental property of matter. There are two types of electric charges: positive and negative. Like charges repel each other, while unlike charges attract.

Key Concepts:
• Charge is quantized - it exists in discrete packets
• The elementary charge (e) = 1.6 × 10⁻¹⁹ C
• Charge is conserved in any physical process
• Charge is invariant - it doesn't change with velocity`,
            keyPoints: [
              'Two types of charges: positive and negative',
              'Like charges repel, unlike charges attract',
              'Charge is quantized and conserved',
              'Elementary charge e = 1.6 × 10⁻¹⁹ C'
            ],
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            quiz: {
              id: 'physics-1-1-quiz',
              passingScore: 70,
              questions: [
                {
                  id: 'q1',
                  question: 'What is the value of elementary charge?',
                  options: ['1.6 × 10⁻¹⁹ C', '1.6 × 10⁻²⁰ C', '2.6 × 10⁻¹⁹ C', '1.6 × 10⁻¹⁸ C'],
                  correctAnswer: 0,
                  explanation: 'The elementary charge is 1.6 × 10⁻¹⁹ Coulombs',
                  points: 10
                },
                {
                  id: 'q2',
                  question: 'Like charges:',
                  options: ['Attract each other', 'Repel each other', 'Have no effect', 'Neutralize each other'],
                  correctAnswer: 1,
                  explanation: 'Like charges (both positive or both negative) repel each other',
                  points: 10
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    color: 'green',
    icon: 'Flask',
    chapters: [
      {
        id: 'chemistry-1',
        title: 'The Solid State',
        description: 'Crystal structures, unit cells, and properties of solids',
        estimatedTime: '2.5 hours',
        topics: [
          {
            id: 'chemistry-1-1',
            title: 'Classification of Solids',
            content: `Solids can be classified based on the arrangement of their constituent particles and the nature of bonding.

Types of Solids:
1. Crystalline Solids - Regular arrangement of particles
2. Amorphous Solids - Irregular arrangement of particles

Crystalline solids are further classified as:
• Ionic solids
• Molecular solids  
• Covalent network solids
• Metallic solids`,
            keyPoints: [
              'Crystalline vs Amorphous solids',
              'Four types of crystalline solids',
              'Regular vs irregular particle arrangement',
              'Different bonding patterns in each type'
            ],
            quiz: {
              id: 'chemistry-1-1-quiz',
              passingScore: 70,
              questions: [
                {
                  id: 'q1',
                  question: 'Which type of solid has an irregular arrangement of particles?',
                  options: ['Crystalline', 'Amorphous', 'Ionic', 'Metallic'],
                  correctAnswer: 1,
                  explanation: 'Amorphous solids have irregular arrangement of particles',
                  points: 10
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    color: 'purple',
    icon: 'Calculator',
    chapters: [
      {
        id: 'math-1',
        title: 'Relations and Functions',
        description: 'Types of relations and functions, their properties and applications',
        estimatedTime: '3 hours',
        topics: [
          {
            id: 'math-1-1',
            title: 'Types of Relations',
            content: `A relation from set A to set B is a subset of the Cartesian product A × B.

Types of Relations:
1. Reflexive: For all a ∈ A, (a,a) ∈ R
2. Symmetric: If (a,b) ∈ R, then (b,a) ∈ R
3. Transitive: If (a,b) ∈ R and (b,c) ∈ R, then (a,c) ∈ R
4. Equivalence: Reflexive, symmetric, and transitive

Functions are special types of relations where each element in the domain maps to exactly one element in the codomain.`,
            keyPoints: [
              'Relation is a subset of Cartesian product',
              'Four main types of relations',
              'Equivalence relation has all three properties',
              'Functions map each input to exactly one output'
            ],
            quiz: {
              id: 'math-1-1-quiz',
              passingScore: 70,
              questions: [
                {
                  id: 'q1',
                  question: 'A relation that is reflexive, symmetric, and transitive is called:',
                  options: ['Function', 'Equivalence relation', 'Partial order', 'Total order'],
                  correctAnswer: 1,
                  explanation: 'An equivalence relation has all three properties: reflexive, symmetric, and transitive',
                  points: 10
                }
              ]
            }
          }
        ]
      }
    ]
  }
];