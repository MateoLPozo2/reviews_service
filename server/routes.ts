import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all published reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getPublishedReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Search reviews with filters
  app.get("/api/reviews/search", async (req, res) => {
    try {
      const { q, domain, year, tags } = req.query;
      const tagArray = tags ? (typeof tags === 'string' ? [tags] : tags as string[]) : undefined;
      
      const results = await storage.searchReviews(
        q as string || "",
        {
          domain: domain as string,
          year: year as string,
          tags: tagArray,
        }
      );
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to search reviews" });
    }
  });

  // Get specific review by nid and slug
  app.get("/api/reviews/:nid/:slug", async (req, res) => {
    try {
      const { nid, slug } = req.params;
      const review = await storage.getReviewByNidAndSlug(nid, slug);
      
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      
      res.json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch review" });
    }
  });

  // Get all domains
  app.get("/api/domains", async (req, res) => {
    try {
      const domains = await storage.getAllDomains();
      res.json(domains);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch domains" });
    }
  });

  // Get all tags
  app.get("/api/tags", async (req, res) => {
    try {
      const tags = await storage.getAllTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tags" });
    }
  });

  // Get reviews by domain
  app.get("/api/reviews/domain/:domain", async (req, res) => {
    try {
      const { domain } = req.params;
      const reviews = await storage.getReviewsByDomain(domain);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews by domain" });
    }
  });

  // Get reviews by tag
  app.get("/api/reviews/tag/:tag", async (req, res) => {
    try {
      const { tag } = req.params;
      const reviews = await storage.getReviewsByTag(tag);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews by tag" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
