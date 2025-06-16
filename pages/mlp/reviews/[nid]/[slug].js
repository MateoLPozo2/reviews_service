// pages/mlp/reviews/[nid]/[slug].js
import { useRef } from 'react';
import { getReviewById } from '@/services/reviewService';
import SlugValidator from '@/interfaces/SlugValidator';
import MarkdownViewer from '@/components/MarkdownViewer';
import ExportButton from '@/components/ExportButton';
import ReviewMeta from '@/components/ReviewMeta';

export async function getServerSideProps({ params, res }) {
  const { nid, slug } = params;
  const review = await getReviewById(nid);

  if (!review) {
    return { notFound: true };
  }

  SlugValidator.validateAndRedirect({
    nid,
    actualSlug: slug,
    expectedSlug: review.slug,
    res
  });

  return {
    props: { review }
  };
}

export default function ReviewPage({ review }) {
  const contentRef = useRef(null);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link.");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold">{review.title}</h1>
          <ReviewMeta review={review} />
        </div>
        <div className="flex gap-2">
          <ExportButton filename={review.slug} contentRef={contentRef} />
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Copy Link
          </button>
        </div>
      </div>
      <div
        ref={contentRef}
        className="bg-white text-black p-4 rounded shadow prose max-w-none"
      >
        <MarkdownViewer content={review.content} />
      </div>
    </div>
  );
}