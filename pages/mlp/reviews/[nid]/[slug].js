//pages/api/mlp/reviews/[nid]/[slug].js
import { useRef } from "react";
import { getReviewById } from "@/services/reviewService";
import SlugValidator from "@/interfaces/SlugValidator";
import MarkdownViewer from "@/components/MarkdownViewer";
import ExportButton from "@/components/ExportButton";

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{review.title}</h1>
        <ExportButton
          filename={review.slug}
          contentRef={contentRef}
          markdownContent={review.content}
        />
      </div>
      <p className="text-gray-600">
        <strong>Authors:</strong> {review.authors}
      </p>
      <div ref={contentRef}>
        <MarkdownViewer content={review.content} />
      </div>
    </div>
  );
}
