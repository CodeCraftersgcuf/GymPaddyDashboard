import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import Tab from './Tab';
import NotificationForm from './NotificationForm';
import NotificationHistory from './NotificationHistory';
import { type NotificationFormData } from '../../../constants/Data';
import { useSendBulkNotification, useDeleteNotification } from '../../../utils/mutations/notificationMutations';
import { useGetBroadcastHistory } from '../../../utils/queries/notificationQueries';

const NotificationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'send' | 'history'>('send');
  const [sendError, setSendError] = useState<string | null>(null);

  const sendMutation = useSendBulkNotification();
  const deleteMutation = useDeleteNotification();
  const { data: history = [], isLoading: historyLoading } = useGetBroadcastHistory();

  const handleSubmit = async (values: NotificationFormData) => {
    setSendError(null);
    try {
      await sendMutation.mutateAsync({
        title: values.title,
        message: values.message,
        type: 'broadcast',
        userType: 'all',
      });
      setActiveTab('history');
    } catch (err: any) {
      setSendError(err?.message || 'Failed to send notification.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch {
      // silently ignore
    }
  };

  const handleResend = async (title: string, message: string) => {
    try {
      await sendMutation.mutateAsync({
        title,
        message,
        type: 'broadcast',
        userType: 'all',
      });
    } catch {
      // silently ignore
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 space-y-6">
        <div className="flex rounded-lg overflow-hidden w-fit">
          <Tab active={activeTab === 'send'} onClick={() => setActiveTab('send')}>
            Send
          </Tab>
          <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
            History
          </Tab>
        </div>

        {activeTab === 'send' ? (
          <>
            <NotificationForm onSubmit={handleSubmit} isSubmitting={sendMutation.isPending} />
            {sendError && (
              <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{sendError}</p>
            )}
          </>
        ) : (
          <NotificationHistory
            notifications={history}
            isLoading={historyLoading}
            onDelete={handleDelete}
            onResend={handleResend}
          />
        )}
      </div>
    </Modal>
  );
};

export default NotificationModal;
