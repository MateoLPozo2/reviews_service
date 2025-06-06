// pages/mlp/reviews/[nid]/[slug].js
import { getReviewById } from '@/services/reviewService';
import SlugValidator from '@/interfaces/SlugValidator';
import MarkdownViewer from '@/components/MarkdownViewer';

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
  return (
    <div>
      <h1>{review.title}</h1>
      <p><strong>Authors:</strong> {review.authors}</p>
      <MarkdownViewer content={review.content} />
    </div>
  );
}