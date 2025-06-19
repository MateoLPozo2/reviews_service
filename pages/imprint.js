// pages/imprint.js

import Head from "next/head";

export default function Imprint() {
  return (
    <>
      <Head>
        <title>Imprint – Reviews Platform</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-2">Imprint / Impressum</h1>

        {/* Legal Website Owner Identification */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Responsible for Content</h2>
          <p>
            <strong>Name:</strong> Mateo Lopez Pozo <br />
            <strong>Address:</strong> Im Neugrabener Dorf 68, 21147, Germany <br />
            <strong>Email:</strong> <a href="mailto:mlpcorporations+rs@gmail.com" 
            className="underline text-blue-600">mlpcorporations+rs@gmail.com</a> <br />
            <strong>Phone:</strong> +49 123 456 7890 <br />
            <strong>Founder:</strong> Mateo Lopez Pozo
          </p>
        </section>

        {/* Business Details (optional, add as needed) */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Business Information</h2>
          <p>
            <strong>Company:</strong> Reviews Platform<br />
            <strong>Legal Form:</strong> Sole Proprietorship / Einzelunternehmen <br />
          </p>
        </section>

        {/* Liability Disclaimer */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Liability for Content</h2>
          <p>
            The contents of our website have been created with the utmost care. 
            However, we cannot guarantee the contents&apos; accuracy, completeness or topicality.
            According to statutory provisions, we are responsible for our own content on these web pages. 
            In this matter, please note that we are not obliged to monitor the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity. 
            Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
          </p>
        </section>

        {/* Copyright */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Copyright Notice</h2>
          <p>
            All content and works published on this website are governed by the copyright laws of Germany. Any duplication, processing, distribution or any form of utilisation beyond the scope of copyright law shall require the prior written consent of the author or authors in question.
          </p>
        </section>

        {/* Cooperation/Partners */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Cooperations & Partners</h2>
          <p>
            Academic and research institutions are welcome for collaboration. Please contact for partnership opportunities.
          </p>
        </section>

        {/* Social/LinkedIn */}
        <section>
          <h2 className="text-xl font-semibold mb-1">Contact & Social</h2>
          <p>
            <a href="https://www.linkedin.com/in/mateo-lopez-pozo42/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">LinkedIn</a>
          </p>
        </section>

        {/* Date of last update */}
        <section>
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </>
  );
}