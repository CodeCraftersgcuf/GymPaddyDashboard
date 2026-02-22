import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, X, ZoomIn } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Modal from '../../../components/Modal';
import { useApproveVerification, useRejectVerification } from '../../../utils/mutations/verificationMutations';

interface BusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  business: {
    id: string;
    businessName: string;
    category: string;
    email: string;
    phone: string;
    document: string;
    status: 'approved' | 'pending' | 'rejected';
  };
}

const categories = [
  'Gym Equipments',
  'Personal Training',
  'Nutrition Supplements',
  'Fitness Apparel',
  'Wellness Services',
  'Gym Wears'
];

const validationSchema = Yup.object().shape({
  businessName: Yup.string().required('Business name is required'),
  category: Yup.string().required('Category is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  status: Yup.string().required('Status is required'),
  rejectionReason: Yup.string().when('status', {
    is: 'rejected',
    then: (schema) => schema.required('Rejection reason is required'),
    otherwise: (schema) => schema.optional(),
  }),
});

const VerifyModal: React.FC<BusinessModalProps> = ({ isOpen, onClose, onSuccess, business }) => {
  const [selectedStatus, setSelectedStatus] = useState(business.status);
  const [showImageLightbox, setShowImageLightbox] = useState(false);

  const approveMutation = useApproveVerification();
  const rejectMutation = useRejectVerification();

  const isSubmitting = approveMutation.isPending || rejectMutation.isPending;

  if (!isOpen) return null;

  const handleSubmit = async (values: { status: string; rejectionReason: string }) => {
    try {
      if (values.status === 'approved') {
        await approveMutation.mutateAsync({ id: business.id });
      } else if (values.status === 'rejected') {
        await rejectMutation.mutateAsync({
          id: business.id,
          data: { reason: values.rejectionReason },
        });
      }
      onSuccess?.();
      onClose();
    } catch {
      // errors are already logged by apiCall
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={{
          businessName: business.businessName,
          category: business.category,
          email: business.email,
          phone: business.phone,
          document: business.document,
          status: business.status,
          rejectionReason: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="p-6 space-y-6">
            <div className="space-y-4">
              {/* Business Name */}
              <div>
                <Field
                  name="businessName"
                  type="text"
                  placeholder="Business Name"
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.businessName && touched.businessName && (
                  <div className="text-red-500 text-sm mt-1">{errors.businessName}</div>
                )}
              </div>

              {/* Category */}
              <div className="relative">
                <Field
                  as="select"
                  name="category"
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                {errors.category && touched.category && (
                  <div className="text-red-500 text-sm mt-1">{errors.category}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              {/* Phone */}
              <div>
                <Field
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.phone && touched.phone && (
                  <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                )}
              </div>

              {/* Certificate document preview */}
              {business.document && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Certificate</p>
                  <div
                    className="mt-2 border border-gray-300 py-4 rounded-lg cursor-pointer relative group"
                    onClick={() => setShowImageLightbox(true)}
                  >
                    <img
                      src={business.document}
                      alt="Uploaded document"
                      className="max-h-48 mx-auto rounded"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center rounded-lg">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-center">Click image to view full size</p>
                </div>
              )}

              {showImageLightbox && business.document && createPortal(
                <div
                  className="fixed inset-0 bg-black/80 z-[2000] flex items-center justify-center p-4 cursor-pointer"
                  onClick={() => setShowImageLightbox(false)}
                >
                  <button
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
                    onClick={() => setShowImageLightbox(false)}
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <img
                    src={business.document}
                    alt="Certificate full view"
                    className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>,
                document.body
              )}

              {/* Status */}
              <div className="relative">
                <Field
                  as="select"
                  name="status"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('status', e.target.value);
                    setSelectedStatus(e.target.value as 'approved' | 'pending' | 'rejected');
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Field>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                {errors.status && touched.status && (
                  <div className="text-red-500 text-sm mt-1">{errors.status}</div>
                )}
              </div>

              {/* Rejection Reason (Conditional) */}
              {selectedStatus === 'rejected' && (
                <div>
                  <Field
                    name="rejectionReason"
                    as="textarea"
                    placeholder="Reason ..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 max-h-[100px] overflow-auto"
                  />
                  {errors.rejectionReason && touched.rejectionReason && (
                    <div className="text-red-500 text-sm mt-1">{errors.rejectionReason}</div>
                  )}
                </div>
              )}
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isSubmitting || selectedStatus === 'pending'}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default VerifyModal;
