import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import type { NotificationFormData } from '../../../constants/Data';
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must not exceed 500 characters'),
});

const NotificationForm: React.FC<{ onSubmit: (values: NotificationFormData) => void; isSubmitting?: boolean }> = ({ onSubmit, isSubmitting }) => {
  const initialValues: NotificationFormData = {
    title: '',
    message: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <Field
              name="title"
              type="text"
              placeholder="Title"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            {errors.title && touched.title && (
              <div className="text-red-500 text-sm">{errors.title}</div>
            )}
          </div>

          <div className="space-y-2">
            <Field
              as="textarea"
              name="message"
              placeholder="Message"
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            />
            {errors.message && touched.message && (
              <div className="text-red-500 text-sm">{errors.message}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NotificationForm;