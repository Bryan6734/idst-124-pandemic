import { useState, useRef } from 'react';
import { Sidebar } from './sidebar';
import { Settings } from './Settings';
import { ControlPanels } from './ControlPanels';
import { Chat } from './Chat';

export function Layout() {
  const [currentPage, setCurrentPage] = useState('control-panel');
  const [selectedPrompt, setSelectedPrompt] = useState<string>();
  const [selectedModel, setSelectedModel] = useState<string>();
  const [selectedAttack, setSelectedAttack] = useState<string>("");
  const [isAttacking, setIsAttacking] = useState(false);

  const chatRef = useRef<{ 
    updateStepMessage: (desc: string, step: number, bijection: any) => void; 
    createSkeleton: () => void;
    resetChat: () => void;
    killAnimations: () => void;
  }>();

  const resetAllStates = () => {
    if (isAttacking) {
      chatRef.current?.killAnimations();
    }
    setSelectedPrompt(undefined);
    setSelectedAttack("");
    setSelectedModel("");  
    setIsAttacking(false);
    chatRef.current?.resetChat();
  };

  const handleParameterChange = (setter: Function, value: string) => {
    if (isAttacking) {
      resetAllStates();
    }
    setter(value);
  };

  const handlePromptChange = (value: string) => {
    if (isAttacking) {
      setIsAttacking(false);
      chatRef.current?.resetChat();
    }
    setSelectedPrompt(value);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onNavigate={setCurrentPage} />
      <main className="flex-1 ml-16 mt-[57px]">
        {currentPage === 'settings' ? (
          <div className="p-6">
            <Settings />
          </div>
        ) : (
          <div className="grid flex-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            <ControlPanels 
              onPromptSelect={handlePromptChange}
              onModelSelect={(value) => handleParameterChange(setSelectedModel, value)}
              onAttackSelect={(value) => handleParameterChange(setSelectedAttack, value)}
              isAttacking={isAttacking}
              onAttackStart={() => {
                setIsAttacking(true);
                chatRef.current?.createSkeleton();
              }}
              onStepReady={(desc, step, bijection) => {
                if (!isAttacking) return;
                chatRef.current?.updateStepMessage(desc, step, bijection);
              }}
              onContinue={() => {
                if (!isAttacking) return;
                chatRef.current?.createSkeleton();
              }}
              onReset={resetAllStates}
            />
            <div className="flex flex-col gap-4 lg:col-span-2">
              <div className="flex-grow">
                <Chat
                  ref={chatRef}
                  selectedPrompt={selectedPrompt}
                  selectedModel={selectedModel}
                  selectedAttack={selectedAttack}
                  onAttackStart={() => {
                    setIsAttacking(true);
                    chatRef.current?.createSkeleton();
                  }}
                  onAttackComplete={() => setIsAttacking(false)}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
