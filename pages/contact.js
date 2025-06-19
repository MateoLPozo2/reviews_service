// pages/contact.js

import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact – Reviews Platform</title>
      </Head>
      <div className="max-w-lg mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p>
          For questions, feedback, or collaboration inquiries, feel free to reach out:
        </p>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:mlpcorporations+rss@gmail.com"
              className="underline text-blue-600"
            >
              mlpcorporations+rs@gmail.com
            </a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/mateo-lopez-pozo42/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              linkedin.com/in/mateo-lopez-pozo42
            </a>
          </p>
        </div>
        <div className="mt-6">
          {/* Placeholder for future form */}
          <p className="text-gray-500 italic">
            A contact form will be available soon.
          </p>
        </div>
      </div>
    </>
  );
}