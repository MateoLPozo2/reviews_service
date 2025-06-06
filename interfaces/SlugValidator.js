// interfaces/SlugValidator.js
export default class SlugValidator {
  static validateAndRedirect({ nid, actualSlug, expectedSlug, res }) {
    if (actualSlug !== expectedSlug) {
      res.writeHead(301, {
        Location: `/mlp/reviews/${nid}/${expectedSlug}`
      });
      res.end();
    }
  }
}