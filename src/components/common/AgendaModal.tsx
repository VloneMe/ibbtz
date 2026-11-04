import { motion } from 'framer-motion';
import { X, Clock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { EventAgendaItem } from '@/data/index';

interface AgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  agenda: EventAgendaItem[];
  eventTitle: string;
}

const AgendaModal = ({ isOpen, onClose, agenda, eventTitle }: AgendaModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black border border-[oklch(0.473_0.137_46.201)]/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[oklch(0.473_0.137_46.201)]/20">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Event Agenda</h2>
            <p className="text-gray-300">{eventTitle}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-[oklch(0.473_0.137_46.201)]/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-4">
            {agenda.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[oklch(0.473_0.137_46.201)]/10 border border-[oklch(0.473_0.137_46.201)]/20 rounded-lg p-4 hover:bg-[oklch(0.473_0.137_46.201)]/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Time Badge */}
                  <div className="flex-shrink-0">
                    <div className="bg-[oklch(0.473_0.137_46.201)] text-white px-3 py-2 rounded-lg text-center min-w-[100px]">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Clock className="h-4 w-4" />
                        {item.time}
                      </div>
                      <div className="text-xs text-gray-300 mt-1">{item.duration}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 mb-3">{item.description}</p>
                    
                    {item.speaker && (
                      <div className="flex items-center gap-2 text-[#768f00]">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.speaker}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[oklch(0.473_0.137_46.201)]/20 bg-black/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Total Duration: {agenda.reduce((total, item) => {
                const duration = parseInt(item.duration);
                return total + (isNaN(duration) ? 0 : duration);
              }, 0)} minutes</span>
            </div>
            <Button
              onClick={onClose}
              className="bg-[oklch(0.473_0.137_46.201)] hover:bg-[oklch(0.4_0.15_46.201)] text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AgendaModal;
