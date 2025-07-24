import { useRef } from "react";
import { getReviewById } from "@/services/reviewService";
import SlugValidator from "@/interfaces/SlugValidator";
import MarkdownViewer from "@/components/MarkdownViewer";
import ReviewMeta from "@/components/ReviewMeta";

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
    res,
  });

  return {
    props: { review },
  };
}

export default function ReviewPage({ review }) {
  const contentRef = useRef(null);

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold">{review.title}</h1>
      </div>
      <ReviewMeta review={review} contentRef={contentRef} />
      <div
        ref={contentRef}
        className="prose dark:prose-invert bg-white dark:bg-neutral-900 text-black dark:text-white p-4 rounded shadow max-w-none"
      >
        <MarkdownViewer content={review.content} />
      </div>
    </div>
  );
}