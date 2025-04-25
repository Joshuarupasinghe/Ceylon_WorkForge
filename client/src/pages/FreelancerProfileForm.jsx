import { useState, useEffect } from "react";
import { profileService } from "../services/api";
import { useNavigate } from "react-router-dom";

const FreelancerProfileForm = () => {
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    contactNumber: "",
    education: "",
    field: "",
    certificates: "",
    service: "",
    subCategory: "",
    specialNotes: "",
    profileImageUrl: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const jobCategories = {
    "Software Development": ["Frontend", "Backend", "Full Stack"],
    "Graphic Design": ["Logo Design", "UI/UX", "Branding"],
    "Marketing": ["SEO", "Social Media", "PPC"],
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const userData = JSON.parse(localStorage.getItem("user") || "{}");

        // Pre-populate form with Google signup data
        if (!userData.hasProfile) {
          setFormData(prevData => ({
            ...prevData,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            profileImageUrl: userData.picture || "",
          }));

          // Set image preview if picture exists
          if (userData.picture) {
            setImagePreview(userData.picture);
          }

          setIsNewUser(true);
          return;
        }

        const response = await profileService.getProfile();

        if (response.data) {
          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // If no profile exists, keep the new user flow
          const userData = JSON.parse(localStorage.getItem("user") || "{}");
          
          setFormData(prevData => ({
            ...prevData,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            profileImageUrl: userData.picture || "",
          }));

          // Set image preview if picture exists
          if (userData.picture) {
            setImagePreview(userData.picture);
          }

          setIsNewUser(true);
        } else {
          console.error("Error checking profile:", error);
          navigate("/login");
        }
      }
    };

    checkUserStatus();
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.contactNumber) errors.contactNumber = "Contact number is required";
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, profileImageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to update your profile");
          return;
        }

        const response = await profileService.createOrUpdateProfile(formData);
        const userData = JSON.parse(localStorage.getItem("user") || "{}");

        const updatedUserData = {
          ...userData,
          hasProfile: true,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          gender: formData.gender,
          contactNumber: formData.contactNumber,
          education: formData.education,
          field: formData.field,
          certificates: formData.certificates,
          service: formData.service,
          subCategory: formData.subCategory,
          specialNotes: formData.specialNotes,
          profileImageUrl: response.data.profileImage || formData.profileImageUrl,
        };

        localStorage.setItem("user", JSON.stringify(updatedUserData));

        alert("Profile updated successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error submitting profile:", error);
        alert("There was an error updating your profile. Please try again.");
      }
    }
  };

  if (isLoading || !isNewUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <h2 className="text-2xl font-semibold text-gray-800 sm:col-span-2 mb-4">Become a Freelancer</h2>

        <div className="flex flex-col sm:col-span-2 items-center space-y-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-500 flex items-center justify-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          <label className="cursor-pointer">
            <span className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200">
              Change Profile Picture
            </span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`mt-1 p-2 rounded-xl border ${formErrors.firstName ? "border-red-500" : "border-gray-500"} focus:outline-none focus:ring-2 focus:ring-gray-600`}
            placeholder="John"
          />
          {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`mt-1 p-2 rounded-xl border ${formErrors.lastName ? "border-red-500" : "border-gray-500"} focus:outline-none focus:ring-2 focus:ring-gray-600`}
            placeholder="Smith"
          />
          {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 p-2 rounded-xl border ${formErrors.email ? "border-red-500" : "border-gray-500"} focus:outline-none focus:ring-2 focus:ring-gray-600`}
            placeholder="example@gmail.com"
            readOnly
          />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className={`mt-1 p-2 rounded-xl border ${formErrors.contactNumber ? "border-red-500" : "border-gray-500"} focus:outline-none focus:ring-2 focus:ring-gray-600`}
            placeholder="+1234567890"
          />
          {formErrors.contactNumber && <p className="text-red-500 text-sm mt-1">{formErrors.contactNumber}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Education</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Bachelor's Degree"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Field</label>
          <select
            name="field"
            value={formData.field}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <option value="">Select Field</option>
            {Object.keys(jobCategories).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Certificates</label>
          <input
            type="text"
            name="certificates"
            value={formData.certificates}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Professional Certifications"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Current Service</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <option value="">Select Service</option>
            {Object.keys(jobCategories).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Sub Category</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
            disabled={!formData.service}
          >
            <option value="">Select Sub Category</option>
            {formData.service && jobCategories[formData.service]?.map((subCategory) => (
              <option key={subCategory} value={subCategory}>{subCategory}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm font-medium text-gray-700">Special Notes</label>
          <textarea
            name="specialNotes"
            value={formData.specialNotes}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-xl border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Additional information"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="sm:col-span-2 bg-teal-400 hover:bg-teal-500 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-md transition duration-200"
        >
          Submit
        </button> 
      </form>
    </div>
  );
};

export default FreelancerProfileForm;