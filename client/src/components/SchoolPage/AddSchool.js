import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

const AddSchool = () => {
  const [isSchoolAdded, setSchoolAdded] = useState(false);
  const [isAlreadyExists, setAlreadyExists] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    school_name: yup.string().required('School Name is required'),
    location: yup.string().required('Location is required'),
    poster: yup.string().required('Poster is required'),
  });

  const onSubmit = async (values) => {
    try {
      const isSchoolExists = await checkIfSchoolExists(values.school_name);

      if (isSchoolExists) {
        setAlreadyExists(true);
      } else {
        const response = await fetch('/schools', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('School Added successfully:', responseData);
          setSchoolAdded(true);
          navigate('/schools');
        } else {
          const errorData = await response.json();
          console.error('Failed to Add School:', errorData);
        }
      }
    } catch (error) {
      console.error('Failed to Add School:', error);
    }
  };

  const checkIfSchoolExists = async (schoolName) => {
    // Simulate the check (replace with actual logic)
    const existingSchools = ['School1', 'School2', 'School3'];
    return existingSchools.includes(schoolName);
  };

  const formik = useFormik({
    initialValues: {
      school_name: '',
      location: '',
      poster: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className="mx-auto">
      <div className="bg-blue-600 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Add School</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
        {isAlreadyExists ? (
          <p className="text-red-500">School with this name already exists.</p>
        ) : isSchoolAdded ? (
          <p className="text-blue-600">School Added successfully!</p>
        ) : (
          <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2">
            <div className="mb-4">
              <input
                type="text"
                placeholder="School Name"
                name="school_name"
                onChange={formik.handleChange}
                value={formik.values.school_name}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.school_name && <p className="text-red-500 mt-1">{formik.errors.school_name}</p>}
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Location"
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.location && <p className="text-red-500 mt-1">{formik.errors.location}</p>}
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Poster"
                name="poster"
                onChange={formik.handleChange}
                value={formik.values.poster}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.poster && <p className="text-red-500 mt-1">{formik.errors.poster}</p>}
            </div>
        
            <div className="flex flex-row justify-center items-center mt-8 space-x-20">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4"
              >
                Add
              </button>
              <Link
                to="/school"
                className="bg-blue-600 hover-bg-orange-600 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4"
              >
                Back
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddSchool;
