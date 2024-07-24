import { z } from 'zod';
import { addMemberFormSchema } from './formSchema';
import { ErrorMessage, Formik, FormikProps } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

//IMemberFieldConfig interface
export interface IMemberFieldConfig<T> {
  label: string;
  name: keyof T;
  type: 'text' | 'email' | 'password' | 'select';
  placeholder?: string;
  showPassword?: boolean;
  tooltip?: string;
  options?: { name: string; value: string | number; id?: string | number }[];
}

export interface IMemberForm<T extends z.ZodTypeAny> {
  formFields: IMemberFieldConfig<z.infer<T>>[];
  onSubmit: (data: z.infer<T>) => void;
  initialValues: z.infer<T>;
  isAddForm: boolean;
}

function MemberForm<T extends z.ZodTypeAny>({
  formFields,
  onSubmit,
  initialValues,
  isAddForm,
}: IMemberForm<T>) {
  const updatePasswordField = (index: number) => {
    const newFields = [...fields];
    newFields[index].showPassword = !newFields[index].showPassword;
    setFields(newFields);
  };

  const [fields, setFields] =
    useState<IMemberFieldConfig<z.infer<T>>[]>(formFields);

  return (
    <section className="mt-2 lg:mt-6 mx-auto max-w-2xl">
      <h1 className="text-lg font-semibold">
        {isAddForm ? 'Add New' : 'Edit'} Team Member
      </h1>
      <p className="text-gray-600 text-sm">
        {isAddForm
          ? 'Please fill in details of new team member.'
          : 'Please update details to edit team member.'}
      </p>
      <Formik<z.infer<T>>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(addMemberFormSchema)}
      >
        {({ handleChange, handleSubmit, values }: FormikProps<z.infer<T>>) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-6">
              {fields.map(
                (
                  { name, placeholder, type, label, showPassword, options },
                  index,
                ) => (
                  <div key={String(name)}>
                    <label
                      className="relative flex mb-2 text-sm font-medium text-gray-900"
                      htmlFor={String(name)}
                    >
                      {label}
                      {/* TODO: Need to add tooltip */}
                    </label>
                    {type === 'select' ? (
                      <select
                        id={String(name)}
                        name={String(name)}
                        className="appearance-none block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5"
                        value={String(values[name])}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {(options &&
                          options.length > 0 &&
                          options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.name}
                            </option>
                          ))) ||
                          ''}
                      </select>
                    ) : type === 'password' ? (
                      <div className="relative">
                        <input
                          id={String(name)}
                          name={String(name)}
                          type={showPassword ? 'text' : 'password'}
                          className="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5"
                          placeholder={placeholder}
                          value={String(values[name])}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => updatePasswordField(index)}
                        >
                          {showPassword ? (
                            <EyeIcon aria-hidden="true" className="h-4 w-4" />
                          ) : (
                            <EyeSlashIcon
                              aria-hidden="true"
                              className="h-4 w-4"
                            />
                          )}
                        </button>
                      </div>
                    ) : (
                      <input
                        id={String(name)}
                        name={String(name)}
                        type={type}
                        className="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5"
                        placeholder={placeholder}
                        onChange={handleChange}
                        value={String(values[name])}
                      />
                    )}
                    <ErrorMessage
                      name={String(name)}
                      component="p"
                      className="mt-1 text-red-500 text-sm"
                    />
                  </div>
                ),
              )}
            </div>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
            >
              Add Member
            </button>
            <button
              type="button"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
            >
              Cancel
            </button>
          </form>
        )}
      </Formik>
    </section>
  );
}

export default MemberForm;
