import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const EditSchools = () => {
  const { id } = useParams();
  const [schoolData, setSchoolData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    school_name: yup.string().required("Name is required").max(15),
    location: yup.string().required("Location is required"),
    poster: yup.string().required("Poster is required"),
  });

  useEffect(() => {
    fetch(`/schools/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSchoolData(data);
      })
      .catch((error) => {
        console.error("Error fetching school data:", error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      school_name: schoolData.school_name || "",
      location: schoolData.location || "",
      poster: schoolData.poster || "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetch(`/schools/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setSchoolData(data);
          setFormSubmitted(true);
          navigate("/schools");
        })
        .catch((error) => {
          console.error("Error updating school:", error);
          alert("An error occurred while updating the school.");
        });
    },
  });

  return (
    <div className="mx-auto">
      <div className="bg-blue-600 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Edit School</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
        {formSubmitted ? (
          <div>
            <p className="text-blue-600 mb-6 md:mb-12">
              School data updated successfully!
            </p>
            <Link
              to="/schools"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-3 md:px-4 md:py-4 justify-center items-center rounded-xl cursor-pointer"
            >
              Back to Schools
            </Link>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2">
            <div className="m-5">
            <input
                type="text"
                id="school_name"
                placeholder="Schoool Name"
                name="school_name"
                onChange={formik.handleChange}
                value={formik.values.school_name}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.school_name && (
                <p className="text-red-500 mt-1">{formik.errors.school_name}</p>
              )}
            </div>

           <div className="m-5">
              <input
                type="text"
                id="location"
                placeholder="Location"
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.location && (
                <p className="text-red-500 mt-1">{formik.errors.location}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="text"
                id="poster"
                placeholder="Poster"
                name="poster"
                onChange={formik.handleChange}
                value={formik.values.poster}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.poster && (
                <p className="text-red-500 mt-1">{formik.errors.poster}</p>
              )}
            </div>

            <div className="flex flex-row justify-center items-center mt-8 space-x-20">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4"
              >
                Update
              </button>
              <Link
                to="/schools"
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

export default EditSchools;
