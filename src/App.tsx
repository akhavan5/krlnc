import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { TestScreen } from './components/TestScreen';
import { ResultScreen } from './components/ResultScreen';
import { TypesExplorerModal } from './components/TypesExplorerModal';
import { HistoryModal } from './components/HistoryModal';
import { QUESTIONS } from './data/questions';
import { LikertScore, TestResult } from './types';
import { 
  calculateTestResult, 
  saveResultToHistory, 
  getSavedHistory, 
  deleteSavedResult,
  saveCurrentProgress,
  loadCurrentProgress,
  clearCurrentProgress
} from './utils/calculator';

export default function App() {
  const [screen, setScreen] = useState<'start' | 'test' | 'result'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, LikertScore>>({});
  const [userName, setUserName] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);
  
  // Modals state
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<TestResult[]>([]);
  const [hasResumeProgress, setHasResumeProgress] = useState(false);

  // Load history & session progress on initial load
  useEffect(() => {
    const saved = getSavedHistory();
    setHistory(saved);

    const prog = loadCurrentProgress();
    if (prog && Object.keys(prog.answers).length > 0) {
      setHasResumeProgress(true);
    }
  }, []);

  // Sync current progress to session storage while in test screen
  useEffect(() => {
    if (screen === 'test') {
      saveCurrentProgress(answers, currentQuestionIndex);
      setHasResumeProgress(true);
    }
  }, [answers, currentQuestionIndex, screen]);

  const handleStartTest = (name?: string) => {
    setUserName(name || '');
    setAnswers({});
    setCurrentQuestionIndex(0);
    clearCurrentProgress();
    setHasResumeProgress(false);
    setScreen('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeTest = () => {
    const prog = loadCurrentProgress();
    if (prog) {
      setAnswers(prog.answers);
      setCurrentQuestionIndex(prog.currentStep || 0);
      setScreen('test');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleStartTest();
    }
  };

  const handleAnswer = (questionId: number, value: LikertScore) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleFinishTest = () => {
    const finalResult = calculateTestResult(answers, userName);
    setCurrentResult(finalResult);
    saveResultToHistory(finalResult);
    setHistory(getSavedHistory());
    clearCurrentProgress();
    setHasResumeProgress(false);
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryResult = (res: TestResult) => {
    setCurrentResult(res);
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistory = (id: string) => {
    const updated = deleteSavedResult(id);
    setHistory(updated);
  };

  const handleRetake = () => {
    handleStartTest(userName);
  };

  const handleGoHome = () => {
    setScreen('start');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentScreen={screen}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenExplorer={() => setIsExplorerOpen(true)}
        onGoHome={handleGoHome}
      />

      {/* Main Content Areas */}
      <main className="flex-1 pb-16">
        {screen === 'start' && (
          <StartScreen
            onStartTest={handleStartTest}
            onResumeTest={handleResumeTest}
            hasResumeProgress={hasResumeProgress}
            onOpenExplorer={() => setIsExplorerOpen(true)}
          />
        )}

        {screen === 'test' && (
          <TestScreen
            questions={QUESTIONS}
            currentIndex={currentQuestionIndex}
            answers={answers}
            onAnswer={handleAnswer}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onFinish={handleFinishTest}
            userName={userName}
          />
        )}

        {screen === 'result' && currentResult && (
          <ResultScreen
            result={currentResult}
            onRetake={handleRetake}
            onOpenExplorer={() => setIsExplorerOpen(true)}
            onOpenTypeDetail={(code) => {
              setIsExplorerOpen(true);
            }}
          />
        )}
      </main>

      {/* Modals */}
      <TypesExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectResult={handleSelectHistoryResult}
        onDeleteResult={handleDeleteHistory}
        onStartNewTest={() => handleStartTest(userName)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700">
            سامانه تخصصی آزمون شخصیت‌شناسی MBTI فارسی
          </p>
          <p className="text-slate-400 text-[11px]">
            طراحی شده با الهام از تئوری تیپ‌های روان‌شناختی کارل یونگ و ایزابل بریگز مایرز
          </p>
        </div>
      </footer>
    </div>
  );
}
