import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: January 15, 2024</p>

          <div className="prose prose-lg max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              MLP Research collects information to provide better services to our users. We collect information in the following ways:
            </p>
            
            <h3>Information You Provide</h3>
            <ul>
              <li>Account registration information (if applicable)</li>
              <li>Review submissions and content contributions</li>
              <li>Communications with our support team</li>
              <li>Feedback and survey responses</li>
            </ul>

            <h3>Information We Collect Automatically</h3>
            <ul>
              <li>Usage data and analytics (pages viewed, time spent, interactions)</li>
              <li>Device information (browser type, operating system, IP address)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process review submissions and manage content</li>
              <li>Communicate with users about updates and important notices</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Ensure platform security and prevent abuse</li>
            </ul>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:
            </p>
            <ul>
              <li><strong>With Your Consent:</strong> We may share information when you have given us explicit consent</li>
              <li><strong>For Legal Reasons:</strong> We may disclose information if required by law or to protect our rights</li>
              <li><strong>Service Providers:</strong> We may share information with trusted service providers who assist in operating our platform</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of internet transmission is 100% secure.
            </p>

            <h2>5. Cookies and Tracking</h2>
            <p>
              Our website uses cookies to enhance user experience:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p>
              You can control cookie preferences through your browser settings.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Review content may be retained indefinitely as part of our academic archive.
            </p>

            <h2>7. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your personal information (subject to certain limitations)</li>
              <li>Opt out of certain communications</li>
              <li>Data portability (where technically feasible)</li>
            </ul>

            <h2>8. Children's Privacy</h2>
            <p>
              Our service is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact our privacy team through our official channels.
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Academic Research Context</h3>
              <p className="text-sm text-blue-800">
                As an academic platform, we are committed to maintaining the highest standards of privacy and data protection while supporting legitimate research and educational activities. Our practices align with academic ethics and institutional privacy requirements.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
