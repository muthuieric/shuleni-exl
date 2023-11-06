import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

const AddUsers = () => {
  const [isSignupSuccessful, setSignupSuccessful] = useState(false);
  const [isAlreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();


  const validationSchema = yup.object().shape({
    Name: yup.string().required('Name is required'),
    Phone: yup.string().required('Phone is required'),
    Email: yup.string().email('Invalid email').required('Email is required'),
    Password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    RepeatPassword: yup
      .string()
      .oneOf([yup.ref('Password'), null], 'Passwords must match'),
    Role: yup.string().required('Role is required'),
    School: yup.string().required('School is required'),

  });

  const onSubmit = async (values) => {
    try {
      const isUserRegistered = await checkIfUserIsRegistered(values.Email);

      if (isUserRegistered) {
        setAlreadyRegistered(true);
      } else {
        const response = await fetch('/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Sign Up successful:', responseData);
          setSignupSuccessful(true);

          navigate('/users');
        } else {
          const errorData = await response.json();
          console.error('Sign Up failed:', errorData);
        }
      }
    } catch (error) {
      console.error('Sign Up failed:', error);
    }
  };

  const checkIfUserIsRegistered = async (email) => {
    // Simulate the check (replace with actual logic)
    const registeredUsers = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
    return registeredUsers.includes(email);
  };

  const formik = useFormik({
    initialValues: {
      Name: '',
      Phone: '',
      Email: '',
      Password: '',
      RepeatPassword: '',
      Role: '',
      School: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className="mx-auto">
      <div className="bg-blue-600 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Add User</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
      {isAlreadyRegistered ? (
          <p className="text-red-500">User already registered with this email.</p>
        ) : isSignupSuccessful ? (
          <p className="text-red-500">Sign Up successful!</p>
        ) : (
          <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2">
            <div className="mb-5">
              <input
                type="text"
                placeholder="Name"
                name="Name"
                onChange={formik.handleChange}
                value={formik.values.Name}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.Name && <p className="text-red-500 mt-1">{formik.errors.Name}</p>}
            </div>
            {/* Add more input fields for Phone, Email, Password, RepeatPassword, Role */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Phone"
                name="Phone"
                onChange={formik.handleChange}
                value={formik.values.Phone}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.Phone && <p className="text-red-500 mt-1">{formik.errors.Phone}</p>}
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                name="Email"
                onChange={formik.handleChange}
                value={formik.values.Email}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.Email && <p className="text-red-500 mt-1">{formik.errors.Email}</p>}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                name="Password"
                onChange={formik.handleChange}
                value={formik.values.Password}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.Password && <p className="text-red-500 mt-1">{formik.errors.Password}</p>}
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Repeat Password"
                name="RepeatPassword"
                onChange={formik.handleChange}
                value={formik.values.RepeatPassword}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.RepeatPassword && <p className="text-red-500 mt-1">{formik.errors.RepeatPassword}</p>}
            </div>
            <div className="mb-4">
              <select
                name="Role"
                onChange={formik.handleChange}
                value={formik.values.Role}
                className="w-full px-3 py-2 border rounded-xl bg-white border-gray-300 focus-outline-none"
              >
                <option value="">Role</option>
                <option value="Facilitator">Facilitator</option>
                <option value="Educator">Educator</option>
                <option value="Student">Student</option>
              </select>

              {formik.errors.Role && <p className="text-red-500 mt-1">{formik.errors.Role}</p>}
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="School"
                name="School"
                onChange={formik.handleChange}
                value={formik.values.School}
                className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none"
              />
              {formik.errors.School && <p className="text-red-500 mt-1">{formik.errors.School}</p>}
            </div>
            
            <div className="flex flex-row justify-center items-center mt-8 space-x-20">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4 "
              >
                Add
              </button>
              <Link
                to="/users"
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

export default AddUsers;