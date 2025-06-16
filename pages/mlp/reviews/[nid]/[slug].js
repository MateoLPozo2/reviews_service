import { useRef } from "react";
import { getReviewById } from "@/services/reviewService";
import SlugValidator from "@/interfaces/SlugValidator";
import MarkdownViewer from "@/components/MarkdownViewer";
import ExportButton from "@/components/ExportButton";
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
        <div className="flex gap-2 flex-wrap">
          <ExportButton filename={review.slug} contentRef={contentRef} />
          <a
            href={`data:text/markdown;charset=utf-8,${encodeURIComponent(
              review.content
            )}`}
            download={`${review.slug}.md`}
            className="px-4 py-2 text-sm bg-gray-200 text-black rounded hover:bg-gray-300"
          >
            Download .md
          </a>
        </div>
      </div>
      <div
        ref={contentRef}
        className="prose dark:prose-invert bg-white dark:bg-neutral-900 text-black dark:text-white p-4 rounded shadow max-w-none"
      >
        <MarkdownViewer content={review.content} />
      </div>
    </div>
  );
}
