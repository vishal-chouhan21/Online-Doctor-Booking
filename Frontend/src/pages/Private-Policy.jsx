import React from "react";

const Policy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-20">
      {/* ---------- Header ---------- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Privacy <span className="text-gray-800">Policy</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use our services.
        </p>
      </div>

      {/* ---------- Policy Content ---------- */}
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 space-y-10">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may collect personal information such as your name, email
            address, phone number, and medical details when you register,
            schedule appointments, or communicate with our support team.
            Additionally, non-personal information like browser type and device
            data may be collected automatically to improve our services.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We use your data to connect you with doctors, manage appointments,
            improve user experience, and send service-related updates. Your data
            helps us ensure you receive the best possible healthcare assistance
            through our platform.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            3. Data Protection and Security
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We implement strict security measures to protect your personal data
            from unauthorized access, misuse, or disclosure. All data
            transmissions are encrypted and stored securely in compliance with
            applicable laws and regulations.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            4. Sharing of Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell or trade your personal information. We may share data
            only with verified healthcare professionals and partners involved in
            delivering our services, and only when necessary.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            5. Your Rights
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to access, update, or request deletion of your
            personal information at any time. You can also opt out of marketing
            communications or withdraw consent for data processing.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            6. Cookies and Tracking
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We use cookies to enhance your browsing experience and analyze
            website traffic. You can choose to disable cookies in your browser
            settings, but some features may not function properly as a result.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            7. Updates to This Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. All changes
            will be reflected on this page with an updated “Last Modified” date.
            Please review it periodically to stay informed.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            8. Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy or
            our data handling practices, please contact us at:
          </p>
          <p className="text-gray-700 font-medium mt-2">
            📧 support@healthconnect.com  
            <br />📞 +91 98765 43210
          </p>
        </section>

        <p className="text-sm text-gray-500 text-center pt-6 border-t">
          Last Updated: November 2025
        </p>
      </div>
    </div>
  );
};

export default Policy;
