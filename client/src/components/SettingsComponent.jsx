import React, { useState } from "react";

const SettingsComponent = () => {
  // State for form fields
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* <h2 className="text-2xl md:text-3xl font-bold text-white">Settings</h2> */}

      <div className=" max-h-screen overflow-y-auto pr-2 pb-8">
        {/* Account Deactivation Section */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">
            Account Deactivation
          </h3>
          <p className="text-gray-400 mb-4">
            If you're sure you want to deactivate your account, click the button
            below. This action cannot be undone.
          </p>
          <button className="w-full md:w-64 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200">
            Deactivate Account
          </button>
        </div>

        {/* Profile Settings */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">
            Profile Settings
          </h3>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <div className="flex-1">
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                placeholder="Enter your full name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <button className="mt-4 w-full md:w-32 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
            Save Changes
          </button>
        </div>

        {/* Security Settings */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">
            Security Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">
                Security Question
              </label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                placeholder="Enter your security question"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Answer</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                placeholder="Enter your answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
              />
            </div>

            {/* Two Factor Authentication */}
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className="h-4 w-4 bg-gray-600 rounded"
              />
              <span className="text-gray-300">
                Enable Two-Factor Authentication
              </span>
            </div>

            <button className="w-full md:w-64 mt-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
              Save Security Settings
            </button>
          </div>
        </div>

        {/* Notification Settings */} 
        <div>
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">
              Notification Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 bg-gray-600 rounded"
                />
                <span className="ml-4 text-gray-300">
                  Receive email notifications
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 bg-gray-600 rounded"
                />
                <span className="ml-4 text-gray-300">
                  Receive push notifications
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 bg-gray-600 rounded"
                />
                <span className="ml-4 text-gray-300">
                  Receive SMS notifications
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 bg-gray-600 rounded"
                />
                <span className="ml-4 text-gray-300">
                  Receive weekly digest
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 bg-gray-600 rounded"
                />
                <span className="ml-4 text-gray-300">
                  Receive important updates
                </span>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full md:w-32 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200 ">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
