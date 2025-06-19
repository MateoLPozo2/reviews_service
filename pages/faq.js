// pages/faq.js
export default function FAQ() {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>

      <div>
        <h2 className="font-semibold mb-1">What is this platform?</h2>
        <p>
          A curated collection of readable reviews on research papers in emerging fields—tailored for investors, professionals, and curious readers.
        </p>
      </div>

      <div>
        <h2 className="font-semibold mb-1">Who writes the reviews?</h2>
        <p>
          Reviews are authored by MLP (Mateo LP), with expertise in engineering, technology, and academic research.
        </p>
      </div>

      <div>
        <h2 className="font-semibold mb-1">Can I suggest a paper to review?</h2>
        <p>
          Yes! Email your suggestions via the Contact page.
        </p>
      </div>

      <div>
        <h2 className="font-semibold mb-1">Are these reviews peer-reviewed?</h2>
        <p>
          No, but all reviews aim for technical accuracy and clear sourcing. Please cross-check with the original papers.
        </p>
      </div>
    </div>
  );
}