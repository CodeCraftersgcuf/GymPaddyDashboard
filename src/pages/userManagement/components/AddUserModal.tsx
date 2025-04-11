import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Eye, User2 } from 'lucide-react';
import Modal from '../../../components/Modal';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
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

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  gender: Yup.string().required('Gender is required'),
  age: Yup.number().min(1, 'Age must be positive').required('Age is required'),
  password: Yup.string().when('isEdit', {
    is: false,
    then: (schema) => schema.min(6, 'Minimum 6 characters').required('Password is required'),
    otherwise: (schema) => schema.optional(),
  }),
  profile_picture: Yup.mixed().required('Profile image is required'),
});

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData?.profile_picture && typeof initialData.profile_picture === 'string') {
      setPreviewImage(initialData.profile_picture);
    } else {
      setPreviewImage(null);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const initialValues: UserFormValues = {
    fullName: initialData?.fullName || '',
    username: initialData?.username || '',
    email: initialData?.email || '',
    phoneNumber: initialData?.phoneNumber || '',
    gender: initialData?.gender || '',
    age: initialData?.age || '',
    password: '',
    profile_picture: null,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit User" : "Add New User"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Values from Modal : ',values)
          onSubmit(values);
          onClose();
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="p-6 space-y-5">
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
              { name: 'fullName', placeholder: 'Full name' },
              { name: 'username', placeholder: 'Username' },
              { name: 'email', placeholder: 'Email', type: 'email' },
              { name: 'phoneNumber', placeholder: 'Phone number' },
              { name: 'age', placeholder: 'Age', type: 'number' },
            ].map(({ name, placeholder, type = 'text' }) => (
              <div key={name}>
                <Field
                  name={name}
                  placeholder={placeholder}
                  type={type}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    touched[name as keyof UserFormValues] && errors[name as keyof UserFormValues]
                      ? 'border-red-500 text-red-500'
                      : 'border-gray-200'
                  } focus:outline-none`}
                />
                {touched[name as keyof UserFormValues] && errors[name as keyof UserFormValues] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[name as keyof UserFormValues] as string}
                  </p>
                )}
              </div>
            ))}

            {/* Gender */}
            <div>
              <Field
                as="select"
                name="gender"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.gender && touched.gender ? 'border-red-500 text-red-500' : 'border-gray-200'
                } focus:outline-none`}
              >
                <option value="">Gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Field>
              {errors.gender && touched.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Password */}
            {!isEdit && (
              <div className="relative">
                <Field
                  name="password"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password && touched.password
                      ? 'border-red-500 text-red-500'
                      : 'border-gray-200'
                  } focus:outline-none`}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                >
                  <Eye className="w-5 h-5" />
                </span>
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="cursor-pointer w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              {isEdit ? 'Update' : 'Save'}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserFormModal;
