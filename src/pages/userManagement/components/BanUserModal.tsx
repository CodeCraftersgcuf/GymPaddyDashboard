import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Modal from '../../../components/Modal';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useBanUser } from '../../../utils/mutations/userMutations';

interface BanUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | number;
  userName?: string;
}

const durationUnits = ['minutes', 'hours', 'days', 'weeks', 'months', 'years'];

const validationSchema = Yup.object().shape({
  unit: Yup.string().required('Please select a time unit'),
  duration: Yup.number().typeError('Must be a number').positive('Must be positive').required('Duration is required'),
  reason: Yup.string().required('Reason is required'),
});

const BanUserModal: React.FC<BanUserModalProps> = ({ isOpen, onClose, userId, userName }) => {
  const [error, setError] = useState<string | null>(null);
  const banMutation = useBanUser();

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Block ${userName || 'User'}`}>
      <Formik
        initialValues={{
          unit: 'days',
          duration: '',
          reason: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError(null);
          try {
            await banMutation.mutateAsync({
              id: String(userId),
              data: {
                reason: values.reason,
                duration: Number(values.duration),
                unit: values.unit,
              },
            });
            onClose();
          } catch (err: any) {
            setError(err?.response?.data?.error?.message || err?.message || 'Failed to block user');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="p-6 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="relative">
              <Field
                as="select"
                name="unit"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.unit && touched.unit ? 'border-red-500 text-red-500' : 'border-gray-200'
                } appearance-none focus:outline-none`}
              >
                {durationUnits.map((unit) => (
                  <option value={unit} key={unit}>{unit}</option>
                ))}
              </Field>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              {errors.unit && touched.unit && <p className="text-red-500 text-sm mt-1">{errors.unit}</p>}
            </div>

            <div>
              <Field
                name="duration"
                type="number"
                placeholder="Duration (e.g. 7)"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.duration && touched.duration ? 'border-red-500 text-red-500' : 'border-gray-200'
                } focus:outline-none`}
              />
              {errors.duration && touched.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
              )}
            </div>

            <div>
              <Field
                as="textarea"
                name="reason"
                placeholder="Reason for blocking"
                className={`w-full px-4 py-3 rounded-lg border max-h-[100px] ${
                  errors.reason && touched.reason ? 'border-red-500 text-red-500' : 'border-gray-200'
                } focus:outline-none`}
              />
              {errors.reason && touched.reason && (
                <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || banMutation.isPending}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {(isSubmitting || banMutation.isPending) && <Loader2 className="w-4 h-4 animate-spin" />}
              {(isSubmitting || banMutation.isPending) ? 'Blocking...' : 'Block User'}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BanUserModal;
