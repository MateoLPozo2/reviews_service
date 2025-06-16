import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About MLP Research</h1>
          
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
            alt="Modern academic library and research environment" 
            className="rounded-lg shadow-lg w-full h-auto mb-8"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">
              MLP Research is a structured, extensible platform designed to bridge the gap between complex academic research and accessible professional insight.
            </p>

            <h2>Our Mission</h2>
            <p>
              We transform cutting-edge academic papers into comprehensive, accessible reviews that serve investors, professionals, and curious minds seeking reliable, research-backed knowledge.
            </p>

            <h2>What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">For Investors</h3>
                <p className="text-primary-800">
                  Reliable summaries of technical innovations with clear implications for market opportunities and technological advancement.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">For Professionals</h3>
                <p className="text-gray-800">
                  Research-backed insights perfect for LinkedIn sharing and professional development, with proper attribution and sourcing.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">For General Public</h3>
                <p className="text-orange-800">
                  Complex knowledge made accessible without losing scientific rigor, helping bridge the gap between academia and public understanding.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">For Researchers</h3>
                <p className="text-green-800">
                  Platform for sharing impact and ensuring broader accessibility of important research findings.
                </p>
              </div>
            </div>

            <h2>Quality Standards</h2>
            <ul>
              <li><strong>Academic Integrity:</strong> Every review links to original sources with proper DOI attribution</li>
              <li><strong>Professional Compliance:</strong> Built with copyright respect and fair-use principles</li>
              <li><strong>Accessibility:</strong> WCAG-compliant design ensuring content is accessible to all users</li>
              <li><strong>Transparency:</strong> Clear versioning, update history, and review methodology</li>
            </ul>

            <h2>Technical Foundation</h2>
            <p>
              Our platform is built on modern web technologies with extensibility and professional compliance at its core. The system supports structured metadata, version control, and is prepared for future expansion into collaborative review processes.
            </p>

            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact & Legal</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900">Legal Pages</h4>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li><Link href="/terms"><span className="hover:text-primary-600 cursor-pointer">Terms of Service</span></Link></li>
                    <li><Link href="/privacy"><span className="hover:text-primary-600 cursor-pointer">Privacy Policy</span></Link></li>
                    <li><Link href="/imprint"><span className="hover:text-primary-600 cursor-pointer">Imprint</span></Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">For Authors</h4>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li><Link href="/submit"><span className="hover:text-primary-600 cursor-pointer">Submit Review</span></Link></li>
                    <li><a href="#" className="hover:text-primary-600">Review Guidelines</a></li>
                    <li><a href="#" className="hover:text-primary-600">Editorial Process</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Resources</h4>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li><a href="#" className="hover:text-primary-600">API Documentation</a></li>
                    <li><a href="#" className="hover:text-primary-600">Citation Guide</a></li>
                    <li><a href="#" className="hover:text-primary-600">RSS Feeds</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
