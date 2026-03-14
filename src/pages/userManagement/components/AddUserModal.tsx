import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Eye, User2 } from 'lucide-react';
import Modal from '../../../components/Modal';
import { storageUrl } from '../../../constants/help';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues) => void | Promise<void>;
}

interface UserFormValues {
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: string;
  age: string | number;
  password: string;
  profile_picture: File | null;
}

const genders = ['Male', 'Female', 'Other'];

// Phone: digits, optional leading +, optional spaces/dashes, 10–20 digits total
const PHONE_REGEX = /^\+?[\d\s\-()]{10,20}$/;
const phoneDigitsOnly = (v: string) => (v || '').replace(/\D/g, '').length >= 10;

const buildValidationSchema = (isEdit: boolean) => Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  username: Yup.string()
    .trim()
    .required('Username is required')
    .min(2, 'Username must be at least 2 characters'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .trim()
    .required('Phone number is required')
    .matches(PHONE_REGEX, 'Enter a valid phone number (10–20 digits, e.g. +1234567890)')
    .test('min-digits', 'Phone number must have at least 10 digits', phoneDigitsOnly),
  gender: Yup.string().required('Please select a gender'),
  age: Yup.number()
    .transform((v) => (v === '' || v === null || isNaN(Number(v)) ? undefined : Number(v)))
    .required('Age is required')
    .integer('Age must be a whole number')
    .min(1, 'Age must be at least 1')
    .max(120, 'Age must be 120 or less'),
  password: isEdit
    ? Yup.string().optional()
    : Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
  profile_picture: Yup.mixed().nullable(),
});

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isEdit = !!initialData;

  useEffect(() => {
    const pic = (initialData as any)?.profilePicture || initialData?.profile_picture;
    if (pic && typeof pic === 'string') {
      setPreviewImage(storageUrl(pic) || pic);
    } else {
      setPreviewImage(null);
    }
    setSubmitError(null);
    setSubmitting(false);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const normalizeGender = (g?: string): string => {
    if (!g) return '';
    const lower = g.toLowerCase();
    const match = genders.find((opt) => opt.toLowerCase() === lower);
    return match || '';
  };

  const initialValues: UserFormValues = {
    fullName: initialData?.fullName || '',
    username: initialData?.username || '',
    email: initialData?.email || '',
    phoneNumber: initialData?.phoneNumber || '',
    gender: normalizeGender(initialData?.gender),
    age: initialData?.age || '',
    password: '',
    profile_picture: null,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit User" : "Add New User"}>
      <Formik
        initialValues={initialValues}
        validationSchema={buildValidationSchema(isEdit)}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (values) => {
          setSubmitError(null);
          setSubmitting(true);
          try {
            await onSubmit(values);
          } catch (err: any) {
            setSubmitError(err?.response?.data?.message || err?.message || 'Failed to save user. Please try again.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, setFieldValue, submitCount }) => {
          const showError = (name: keyof UserFormValues) =>
            Boolean(errors[name]) && (touched[name] || submitCount > 0);
          return (
          <Form className="p-6 space-y-5" autoComplete="off">
            {/* Profile Upload */}
            <div className="flex justify-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      setPreviewImage(URL.createObjectURL(file));
                      setFieldValue('profile_picture', file);
                    }
                  }}
                  className="hidden"
                />
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    <img src={previewImage} alt="preview" className="object-cover w-full h-full rounded-full" />
                  ) : (
                    <User2 className='text-gray-400' size={50} />
                  )}
                </div>
              </label>
            </div>

            {/* Fields */}
            {[
              { name: 'fullName' as const, placeholder: 'Full name', minLength: 2, autoComplete: 'off' },
              { name: 'username' as const, placeholder: 'Username', minLength: 2, autoComplete: 'off' },
              { name: 'email' as const, placeholder: 'Email', type: 'email' as const, autoComplete: 'off' },
              { name: 'phoneNumber' as const, placeholder: 'Phone number (e.g. +1234567890)', autoComplete: 'off' },
              { name: 'age' as const, placeholder: 'Age', type: 'number' as const, min: 1, max: 120, autoComplete: 'off' },
            ].map(({ name, placeholder, type = 'text', minLength, min, max, autoComplete }) => (
              <div key={name}>
                <Field
                  name={name}
                  placeholder={placeholder}
                  type={type}
                  min={min}
                  max={max}
                  minLength={minLength}
                  autoComplete={autoComplete}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    showError(name) ? 'border-red-500 text-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                />
                {showError(name) && (
                  <p className="text-red-500 text-sm mt-1">{errors[name] as string}</p>
                )}
              </div>
            ))}

            {/* Gender */}
            <div>
              <Field
                as="select"
                name="gender"
                className={`w-full px-4 py-3 rounded-lg border ${
                  showError('gender') ? 'border-red-500 text-red-500' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
              >
                <option value="">Select gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Field>
              {showError('gender') && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Password */}
            {!isEdit && (
              <div className="relative">
                <Field
                  name="password"
                  placeholder="Password (min 6 characters)"
                  type={showPassword ? 'text' : 'password'}
                  minLength={6}
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    showError('password') ? 'border-red-500 text-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                >
                  <Eye className="w-5 h-5" />
                </span>
                {showError('password') && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            )}

            {submitError && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : isEdit ? 'Update' : 'Save'}
            </button>
          </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default UserFormModal;
