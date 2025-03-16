import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const MyVisaApplications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch user's visa applications
  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/visas/applications/${user?.email}`
      );
      const data = await response.json();
      if (response.ok) {
        setApplications(data.applications);
      } else {
        toast.error("Failed to load applications.");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  // Handle cancel application
  const handleCancel = async (applicationId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/visas/${applicationId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Application cancelled successfully!");
        setApplications(
          applications.filter((app) => app._id !== applicationId)
        );
      } else {
        toast.error("Failed to cancel application.");
      }
    } catch (error) {
      console.error("Error cancelling application:", error);
      toast.error("Error cancelling application.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Visa Applications
      </h2>
      {applications.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        applications.map((application) => (
          <div
            key={application._id}
            className="bg-white p-6 rounded-lg shadow-lg mb-4"
          >
            <div>
              <strong>Country:</strong> {application.country}
            </div>
            <div>
              <strong>Visa Type:</strong> {application.visaType}
            </div>
            <div>
              <strong>Processing Time:</strong> {application.processingTime}
            </div>
            <div>
              <strong>Fee:</strong> {application.fee}
            </div>
            <div>
              <strong>Validity:</strong> {application.validity}
            </div>
            <div>
              <strong>Age Restriction:</strong> {application.ageRestriction}
            </div>
            <div>
              <strong>Application Method:</strong>{" "}
              {application.applicationMethod}
            </div>
            <div>
              <strong>Applied Date:</strong> {application.appliedDate}
            </div>
            <div>
              <strong>Applicant's Name:</strong> {application.firstName}{" "}
              {application.lastName}
            </div>
            <div>
              <strong>Email:</strong> {application.email}
            </div>
            <button
              onClick={() => handleCancel(application._id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyVisaApplications;
