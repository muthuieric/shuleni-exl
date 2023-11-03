import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


const EditUsers = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required").max(15),
    phone: yup.string().required("Phone is required").max(10),
    email: yup.string().required('Email is required'),
    role: yup.string().required("Must enter a role"),
    school: yup.string().required("School is required"), 

  });

  useEffect(() => {
    fetch(`/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: userData.name || "",
      phone: userData.phone || "",
      email: userData.email || "",
      role: userData.role || "",
      school: userData.school || "",

    },
    validationSchema,
    onSubmit: (values) => {
      fetch(`/users/${id}`, { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setFormSubmitted(true);
          navigate("/users");
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          alert("An error occurred while updating the user.");
        });
    },
 
});

  return (
    <div className="mx-auto">
      <div className="bg-blue-600 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Edit User</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
        {formSubmitted ? (
          <div>
            <p className="text-blue-600 mb-6 md:mb-12">
              User data updated successfully!
            </p>
            <Link
              to="/users"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-3 md:px-4 md:py-4 justify-center items-center rounded-xl cursor-pointer"
            >
              Back to Users
            </Link>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2">
            <div className="m-5">
              <input
                type="text"
                id="name"
                placeholder="Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.name && (
                <p className="text-red-500 mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="text"
                id="phone"
                placeholder="Phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.phone && (
                <p className="text-red-500 mt-1">{formik.errors.phone}</p>
              )}
            </div>

            <div className="m-5">
            <input
              type="text"
              id="email"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
            />
            {formik.errors.email && (
              <p className="text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="m-5">
              <select
                id="role"
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
              className="w-full px-4 py-2 border bg-white rounded-xl focus:outline-none focus:border-blue-600"
              >
                <option value="">Role</option>
                <option value="Facilitator">Facilitator</option>
                <option value="Educator">Educator</option>
                <option value="Student">Student</option>
              </select>

              {formik.errors.role && <p className="text-red-500 mt-1">{formik.errors.role}</p>} 
            </div>


            <div className="m-5">
              <input
                type="text"
                id="school"
                placeholder="School"
                name="school"
                onChange={formik.handleChange}
                value={formik.values.school}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.school && (
                <p className="text-red-500 mt-1">{formik.errors.school}</p>
              )}
            </div>


            <div className="flex flex-row justify-center items-center mt-8 space-x-20">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4 "
              >
                Update
              </button>
              <Link
                to="/users"
                className="bg-blue-600 hover-bg-orange-600 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4"
              >
                Back
              </Link>
            </div>
            <button type="submit" className="hidden" />
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUsers;