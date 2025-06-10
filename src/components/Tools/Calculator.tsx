import React, { useState } from 'react';
import { X, Delete } from 'lucide-react';

interface CalculatorProps {
  onClose: () => void;
}

export default function Calculator({ onClose }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const buttons = [
    ['C', 'CE', '⌫', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['±', '0', '.', '=']
  ];

  const getButtonClass = (button: string) => {
    const baseClass = 'h-12 rounded-lg font-medium transition-colors ';
    
    if (['='].includes(button)) {
      return baseClass + 'bg-indigo-600 text-white hover:bg-indigo-700';
    } else if (['+', '-', '×', '÷'].includes(button)) {
      return baseClass + 'bg-orange-500 text-white hover:bg-orange-600';
    } else if (['C', 'CE', '⌫'].includes(button)) {
      return baseClass + 'bg-red-500 text-white hover:bg-red-600';
    } else {
      return baseClass + 'bg-gray-100 text-gray-900 hover:bg-gray-200';
    }
  };

  const handleButtonClick = (button: string) => {
    switch (button) {
      case 'C':
        clear();
        break;
      case 'CE':
        clearEntry();
        break;
      case '⌫':
        setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
        break;
      case '=':
        performCalculation();
        break;
      case '+':
      case '-':
      case '×':
      case '÷':
        inputOperation(button);
        break;
      case '.':
        if (display.indexOf('.') === -1) {
          inputNumber('.');
        }
        break;
      case '±':
        setDisplay(String(parseFloat(display) * -1));
        break;
      default:
        inputNumber(button);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Calculator</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Display */}
          <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
            <div className="text-right text-2xl font-mono overflow-hidden">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {buttons.flat().map((button) => (
              <button
                key={button}
                onClick={() => handleButtonClick(button)}
                className={getButtonClass(button)}
              >
                {button === '⌫' ? <Delete className="h-4 w-4 mx-auto" /> : button}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}