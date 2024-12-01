import { useState, useRef } from 'react';
import { Sidebar } from './sidebar';
import { Settings } from './Settings';
import { ControlPanels } from './ControlPanels';
import { Chat } from './Chat';
import { Papers } from './Papers';
import { AnimatePresence, motion } from "framer-motion";
import { IntroModal } from './IntroModal';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.6
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.3
    }
  }
};

interface ChatRef {
  updateStepMessage: (description: string, step: number, bijection?: Record<string, string>) => void;
  clearAnimations: () => void;
  killAnimations: () => void;
  resetChat: () => void;
  createSkeleton: () => void;
}

export function Layout() {
  const [currentPage, setCurrentPage] = useState('control-panel');
  const [selectedPrompt, setSelectedPrompt] = useState<string>();
  const [selectedModel, setSelectedModel] = useState<string>();
  const [selectedAttack, setSelectedAttack] = useState<string>();
  const [isAttacking, setIsAttacking] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const chatRef = useRef<ChatRef>(null);

  const handleNavigate = (page: string) => {
    if (page === 'help') {
      setShowIntroModal(true);
      return;
    }
    setCurrentPage(page);
  };

  const resetAllStates = () => {
    setSelectedPrompt(undefined);
    setSelectedModel(undefined);
    setSelectedAttack(undefined);
    setIsAttacking(false);
  };

  const handleParameterChange = (setter: (value: string) => void, value: string) => {
    setter(value);
  };

  const handlePromptChange = (value: string) => {
    setSelectedPrompt(value);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onNavigate={handleNavigate} />
      <main className="flex-1 ml-16 mt-[57px]">
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentPage === 'settings' && (
              <motion.div
                key="settings"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-4"
              >
                <motion.div variants={item}>
                  <div className="p-6">
                    <Settings />
                  </div>
                </motion.div>
              </motion.div>
            )}
            {currentPage === 'papers' && (
              <motion.div
                key="papers"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-4"
              >
                <motion.div variants={item}>
                  <Papers />
                </motion.div>
              </motion.div>
            )}
            {currentPage !== 'settings' && currentPage !== 'papers' && (
              <motion.div
                key="control-panel"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-4"
              >
                <div className="grid flex-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                  <motion.div variants={item}>
                    <ControlPanels 
                      selectedModel={selectedModel}
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
                  </motion.div>
                  <motion.div variants={item} className="flex flex-col gap-4 lg:col-span-2">
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
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      {showIntroModal && (
        <IntroModal
          open={showIntroModal}
          onOpenChange={setShowIntroModal}
        />
      )}
    </div>
  );
}
