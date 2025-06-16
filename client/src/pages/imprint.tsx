import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Imprint() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Imprint / Legal Notice</h1>
          <p className="text-sm text-gray-600 mb-8">Information pursuant to applicable disclosure requirements</p>

          <div className="prose prose-lg max-w-none">
            <h2>Platform Information</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">MLP Research Platform</h3>
              <p className="text-gray-700 mb-2">
                <strong>Platform:</strong> Academic Research Review Publishing Platform
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Purpose:</strong> Educational and informational content dissemination
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Content Type:</strong> Academic research reviews and analysis
              </p>
              <p className="text-gray-700">
                <strong>Target Audience:</strong> Researchers, professionals, students, and general public
              </p>
            </div>

            <h2>Editorial Responsibility</h2>
            <p>
              Content published on MLP Research is subject to editorial review and academic standards. All reviews undergo quality assessment for accuracy, academic integrity, and compliance with fair use principles.
            </p>

            <h2>Content and Copyright</h2>
            <ul>
              <li><strong>Original Content:</strong> Reviews and analyses are original works created by qualified reviewers</li>
              <li><strong>Source Attribution:</strong> All source materials are properly cited with DOI links and academic references</li>
              <li><strong>Fair Use:</strong> Content complies with fair use provisions for educational and informational purposes</li>
              <li><strong>Copyright Respect:</strong> Original research papers and their authors are properly attributed and linked</li>
            </ul>

            <h2>Technical Information</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Technical Details</h3>
              <p className="text-gray-700 mb-2">
                <strong>Technology:</strong> Modern web application built for accessibility and performance
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Hosting:</strong> Secure, reliable hosting infrastructure
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Security:</strong> Industry-standard security measures and data protection
              </p>
              <p className="text-gray-700">
                <strong>Accessibility:</strong> WCAG-compliant design for universal access
              </p>
            </div>

            <h2>Professional Standards</h2>
            <p>
              MLP Research operates according to:
            </p>
            <ul>
              <li>Academic publishing ethics and standards</li>
              <li>Copyright law and fair use principles</li>
              <li>Data protection and privacy regulations</li>
              <li>Accessibility guidelines (WCAG)</li>
              <li>Professional content creation standards</li>
            </ul>

            <h2>Disclaimer</h2>
            <p>
              The information provided on this platform is for educational and informational purposes only. While we strive for accuracy and quality, users should verify information independently and consult original sources for comprehensive understanding.
            </p>

            <h2>Contact and Legal Issues</h2>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">For Legal Inquiries</h3>
              <p className="text-blue-800 mb-2">
                <strong>Copyright Issues:</strong> Contact our legal team for any copyright concerns or attribution questions
              </p>
              <p className="text-blue-800 mb-2">
                <strong>Academic Integrity:</strong> Report any concerns about academic standards or content accuracy
              </p>
              <p className="text-blue-800">
                <strong>General Legal:</strong> All legal matters should be directed through our official contact channels
              </p>
            </div>

            <h2>Jurisdiction and Applicable Law</h2>
            <p>
              This platform operates in compliance with applicable laws and regulations. Specific jurisdictional information will be provided based on operational requirements and legal obligations.
            </p>

            <h2>Updates to This Notice</h2>
            <p>
              This imprint may be updated periodically to reflect changes in our operations, legal requirements, or contact information. Users will be notified of significant changes through appropriate channels.
            </p>

            <div className="bg-green-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Academic Mission</h3>
              <p className="text-sm text-green-800">
                MLP Research is committed to advancing academic knowledge dissemination while maintaining the highest standards of legal compliance, academic integrity, and professional ethics. Our platform serves the global academic and professional community.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
