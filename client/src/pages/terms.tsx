import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: January 15, 2024</p>

          <div className="prose prose-lg max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the MLP Research platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2>2. Academic Integrity and Fair Use</h2>
            <p>
              MLP Research is committed to academic integrity and operates under fair use principles:
            </p>
            <ul>
              <li>All reviews reference and cite original academic sources with proper attribution</li>
              <li>Content is transformative in nature, providing analysis and commentary</li>
              <li>Original research papers are linked via DOI for proper attribution</li>
              <li>Reviews comply with copyright and fair use guidelines</li>
            </ul>

            <h2>3. User Responsibilities</h2>
            <p>Users of the platform agree to:</p>
            <ul>
              <li>Use the platform for legitimate academic, professional, or educational purposes</li>
              <li>Respect intellectual property rights of original authors and researchers</li>
              <li>Provide accurate information when submitting reviews or feedback</li>
              <li>Not misrepresent or plagiarize content from the platform</li>
            </ul>

            <h2>4. Content and Licensing</h2>
            <p>
              Reviews published on MLP Research:
            </p>
            <ul>
              <li>Are original analyses created by qualified reviewers</li>
              <li>Include proper attribution to source materials</li>
              <li>May be cited with appropriate attribution to MLP Research</li>
              <li>Are provided for informational and educational purposes</li>
            </ul>

            <h2>5. Privacy and Data Protection</h2>
            <p>
              We respect your privacy and are committed to protecting your personal information. Please review our Privacy Policy for detailed information about our data practices.
            </p>

            <h2>6. Disclaimer of Warranties</h2>
            <p>
              The information provided on MLP Research is for general informational purposes only. While we strive for accuracy, we make no representations or warranties about the completeness, accuracy, reliability, suitability, or availability of the information.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              MLP Research shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              The platform design, functionality, and original review content are protected by intellectual property laws. Users may not reproduce, distribute, or create derivative works without explicit permission.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of the service constitutes acceptance of the modified terms.
            </p>

            <h2>10. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us through our official channels or legal department.
            </p>

            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Academic Compliance</h3>
              <p className="text-sm text-gray-700">
                MLP Research operates in compliance with academic publishing standards, copyright law, and fair use provisions. Our platform is designed to support the dissemination of academic knowledge while respecting the rights of original researchers and publishers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
