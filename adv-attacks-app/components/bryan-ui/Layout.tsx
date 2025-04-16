import { useState, useRef } from 'react';
import { Sidebar } from './sidebar';
import { Settings } from './Settings';
import { MapControls } from './MapControls';
import { Map, MapRef } from './Map';
import { Papers } from './Papers';
import { Emails } from './Emails';
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

// No longer need ChatRef interface

export function Layout() {
  const [currentPage, setCurrentPage] = useState('control-panel');
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number }>({ year: 2024, month: 1 });
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [showIntroModal, setShowIntroModal] = useState(false);
  const mapRef = useRef<MapRef>(null);

  const handleNavigate = (page: string) => {
    if (page === 'help') {
      setShowIntroModal(true);
      return;
    }
    setCurrentPage(page);
  };

  const resetAllStates = () => {
    setSelectedDate({ year: 2024, month: 1 });
    setSelectedRegion('global');
    if (mapRef.current) {
      mapRef.current.resetMap();
    }
    setCurrentPage('control-panel'); // Optionally reset to map view
  };

  const handleDateChange = (date: { year: number; month: number }) => {
    setSelectedDate(date);
    if (mapRef.current) {
      mapRef.current.updateDate(date);
    }
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar selectedPage={currentPage} onNavigate={handleNavigate} />
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
            {currentPage === 'emails' && (
              <motion.div
                key="emails"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-4"
              >
                <motion.div variants={item}>
                  <Emails />
                </motion.div>
              </motion.div>
            )}
            {currentPage !== 'settings' && currentPage !== 'papers' && currentPage !== 'emails' && (
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
                    <MapControls 
                      selectedDate={selectedDate}
                      onDateSelect={handleDateChange}
                      onRegionSelect={handleRegionChange}
                      onReset={resetAllStates}
                    />
                  </motion.div>
                  <motion.div variants={item} className="flex flex-col gap-4 lg:col-span-2">
                    <div className="flex-grow">
                      <Map
                        ref={mapRef}
                        selectedDate={selectedDate}
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
          showIntroModal={showIntroModal}
          setShowIntroModal={setShowIntroModal}
        />
      )}
    </div>
  );
}
