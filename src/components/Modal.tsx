import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { ModalProps } from '../constants/Data';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title = 'Push Notification', children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 min-h-screen bg-black/50 z-[1000] overflow-auto">
      <div className="flex items-center justify-center w-full py-8">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
          <div className="flex items-center justify-between p-4 pb-2 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;