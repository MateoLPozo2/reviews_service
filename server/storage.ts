import { reviews, users, type Review, type InsertReview, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, and, like, ilike, or, desc, asc, sql } from "drizzle-orm";

// Type helper for array casting
function ensureStringArray(value: any): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return [value];
  return [];
}

export interface IStorage {
  // Reviews
  getAllReviews(): Promise<Review[]>;
  getReviewById(id: number): Promise<Review | undefined>;
  getReviewByNidAndSlug(nid: string, slug: string): Promise<Review | undefined>;
  getPublishedReviews(): Promise<Review[]>;
  searchReviews(query: string, filters?: {
    domain?: string;
    year?: string;
    tags?: string[];
  }): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, review: Partial<InsertReview>): Promise<Review | undefined>;
  deleteReview(id: number): Promise<boolean>;
  
  // Additional methods
  getReviewsByDomain(domain: string): Promise<Review[]>;
  getReviewsByTag(tag: string): Promise<Review[]>;
  getAllDomains(): Promise<string[]>;
  getAllTags(): Promise<string[]>;

  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getAllReviews(): Promise<Review[]> {
    return await db.select().from(reviews).orderBy(desc(reviews.lastUpdated));
  }

  async getReviewById(id: number): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review || undefined;
  }

  async getReviewByNidAndSlug(nid: string, slug: string): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(
      and(eq(reviews.nid, nid), eq(reviews.slug, slug))
    );
    return review || undefined;
  }

  async getPublishedReviews(): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(eq(reviews.published, 1))
      .orderBy(desc(reviews.lastUpdated));
  }

  async searchReviews(query: string, filters?: {
    domain?: string;
    year?: string;
    tags?: string[];
  }): Promise<Review[]> {
    let conditions = [];

    // Text search across multiple fields
    if (query.trim()) {
      conditions.push(
        or(
          ilike(reviews.title, `%${query}%`),
          ilike(reviews.reviewSummary, `%${query}%`),
          ilike(reviews.content, `%${query}%`),
          sql`${reviews.authors}::text ILIKE ${'%' + query + '%'}`,
          sql`${reviews.tags}::text ILIKE ${'%' + query + '%'}`
        )
      );
    }

    // Domain filter
    if (filters?.domain) {
      conditions.push(eq(reviews.domain, filters.domain));
    }

    // Year filter
    if (filters?.year) {
      conditions.push(sql`EXTRACT(YEAR FROM ${reviews.lastUpdated}) = ${parseInt(filters.year)}`);
    }

    // Tags filter
    if (filters?.tags && filters.tags.length > 0) {
      const tagConditions = filters.tags.map(tag => 
        sql`${reviews.tags}::text ILIKE ${'%' + tag + '%'}`
      );
      conditions.push(or(...tagConditions));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    return await db.select().from(reviews)
      .where(whereClause)
      .orderBy(desc(reviews.lastUpdated));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db
      .insert(reviews)
      .values(insertReview)
      .returning();
    return review;
  }

  async updateReview(id: number, updateData: Partial<InsertReview>): Promise<Review | undefined> {
    const [review] = await db
      .update(reviews)
      .set(updateData)
      .where(eq(reviews.id, id))
      .returning();
    return review || undefined;
  }

  async deleteReview(id: number): Promise<boolean> {
    const result = await db.delete(reviews).where(eq(reviews.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getReviewsByDomain(domain: string): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(eq(reviews.domain, domain))
      .orderBy(desc(reviews.lastUpdated));
  }

  async getReviewsByTag(tag: string): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(sql`${reviews.tags}::text ILIKE ${'%' + tag + '%'}`)
      .orderBy(desc(reviews.lastUpdated));
  }

  async getAllDomains(): Promise<string[]> {
    const result = await db.selectDistinct({ domain: reviews.domain }).from(reviews);
    return result.map(r => r.domain).filter(Boolean);
  }

  async getAllTags(): Promise<string[]> {
    const result = await db.select({ tags: reviews.tags }).from(reviews);
    const allTags = new Set<string>();
    
    result.forEach(row => {
      if (row.tags && Array.isArray(row.tags)) {
        row.tags.forEach(tag => allTags.add(tag));
      }
    });
    
    return Array.from(allTags).sort();
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
}

export class MemStorage implements IStorage {
  private reviews: Map<number, Review>;
  private currentId: number;

  constructor() {
    this.reviews = new Map();
    this.currentId = 1;
    this.seedData();
  }

  private seedData() {
    const sampleReviews: InsertReview[] = [
      {
        nid: "1",
        title: "Transformer Architecture Improvements for Natural Language Processing",
        slug: "transformer-architecture-improvements-nlp",
        reviewSummary: "Comprehensive analysis of recent improvements to transformer models, focusing on efficiency gains and performance benchmarks.",
        content: `# Executive Summary

This review examines the latest developments in transformer architecture for natural language processing, focusing on computational efficiency improvements and performance optimizations introduced in recent research papers.

## Key Findings

- **Efficiency Improvements:** New attention mechanisms reduce computational complexity by 35% while maintaining performance.
- **Scalability:** Novel architectural modifications enable training on longer sequences without proportional memory increases.
- **Performance Benchmarks:** Consistent improvements across GLUE, SuperGLUE, and domain-specific evaluation metrics.

## Technical Analysis

The transformer architecture has undergone significant refinements since its introduction. Recent work has focused on addressing the quadratic complexity of self-attention mechanisms, particularly for long sequence processing.

> "The integration of sparse attention patterns with linear complexity scaling represents a fundamental advancement in transformer efficiency."
> 
> — Original Paper Authors

## Implementation Considerations

For practitioners looking to implement these improvements, several key considerations emerge:

### Practical Recommendations

**For Researchers:**
- Evaluate sparse attention patterns for specific domains
- Consider memory-efficiency trade-offs
- Benchmark against domain-specific tasks

**For Industry:**
- Assess deployment requirements
- Consider fine-tuning strategies
- Evaluate cost-benefit of migration

## Future Directions

The research indicates several promising avenues for continued development, including hybrid architectures that combine the benefits of different attention mechanisms and the exploration of task-specific optimizations.`,
        authors: ["Smith, J.", "Johnson, M.", "Chen, L."],
        doi: "10.1000/182",
        domain: "Machine Learning",
        tags: ["NLP", "Transformers", "Deep Learning"],
        version: "1.2",
        wordCount: 2847,
        estimatedReadingTime: 12,
        published: 1,
      },
      {
        nid: "2",
        title: "Quantum Computing Applications in Cryptography",
        slug: "quantum-computing-cryptography-applications",
        reviewSummary: "Analysis of quantum computing threats to current cryptographic systems and emerging post-quantum solutions.",
        content: `# Executive Summary

This comprehensive review analyzes the intersection of quantum computing and cryptography, examining both the threats posed to current cryptographic systems and the emerging solutions designed to maintain security in a post-quantum world.

## Current Cryptographic Vulnerabilities

Quantum computers pose significant threats to widely-used cryptographic algorithms:

- **RSA Encryption:** Shor's algorithm can factor large integers exponentially faster than classical computers
- **Elliptic Curve Cryptography:** Also vulnerable to quantum attacks via Shor's algorithm
- **Symmetric Ciphers:** Less vulnerable but still affected by Grover's algorithm

## Post-Quantum Solutions

The cryptographic community has responded with several promising approaches:

### Lattice-Based Cryptography
- High security guarantees against quantum attacks
- Efficient implementation possible
- Currently the most mature post-quantum approach

### Code-Based Cryptography
- Long history of security analysis
- Large key sizes remain a challenge
- Strong theoretical foundations

### Multivariate Cryptography
- Fast signature generation and verification
- Complex security analysis required
- Promising for specific applications

## Implementation Timeline

The transition to post-quantum cryptography is critical and time-sensitive:

1. **2024-2025:** Standards finalization and early adoption
2. **2025-2030:** Widespread implementation in critical systems
3. **2030+:** Full migration completion before quantum threat materialization

## Conclusion

Organizations must begin planning their post-quantum transition immediately to ensure security continuity as quantum computing capabilities advance.`,
        authors: ["Williams, R.", "Davis, K."],
        doi: "10.1000/183",
        domain: "Quantum Computing",
        tags: ["Cryptography", "Quantum", "Security"],
        version: "1.0",
        wordCount: 3421,
        estimatedReadingTime: 15,
        published: 1,
      },
      {
        nid: "3",
        title: "Sustainable Energy Storage Systems: A Materials Science Perspective",
        slug: "sustainable-energy-storage-materials-science",
        reviewSummary: "Review of advanced materials for next-generation battery technologies and their environmental impact.",
        content: `# Executive Summary

This review examines the latest developments in sustainable energy storage systems from a materials science perspective, focusing on breakthrough materials that promise to revolutionize battery technology while minimizing environmental impact.

## Advanced Battery Materials

### Solid-State Electrolytes
- **Lithium Garnet Ceramics:** High ionic conductivity and stability
- **Sulfide-Based Electrolytes:** Excellent processability and performance
- **Polymer Electrolytes:** Flexible and lightweight solutions

### Next-Generation Cathode Materials
- **Lithium-Rich Layered Oxides:** Higher energy density potential
- **Sodium-Ion Alternatives:** Abundant raw materials, lower cost
- **Organic Electrode Materials:** Sustainable and recyclable options

## Environmental Considerations

The sustainability aspect of energy storage extends beyond performance:

### Life Cycle Assessment
- Raw material extraction impact
- Manufacturing energy requirements
- End-of-life recycling and disposal
- Carbon footprint analysis

### Circular Economy Principles
- Design for disassembly and recycling
- Material recovery and reuse strategies
- Reduced dependence on critical raw materials
- Local supply chain development

## Performance Metrics

Modern energy storage systems must balance multiple criteria:

| Material Type | Energy Density | Cycle Life | Cost | Environmental Impact |
|---------------|----------------|------------|------|---------------------|
| Li-ion (current) | High | Good | Medium | High |
| Solid-state | Very High | Excellent | High | Medium |
| Na-ion | Medium | Good | Low | Low |
| Organic | Low-Medium | Fair | Low | Very Low |

## Future Outlook

The field is rapidly evolving with several breakthrough technologies on the horizon:

- **Room-temperature solid-state batteries** expected by 2027
- **Sustainable electrode materials** reaching commercial viability
- **Advanced recycling technologies** enabling true circular economy

## Recommendations

For stakeholders in the energy storage ecosystem:

1. **Researchers:** Focus on scalable synthesis methods for sustainable materials
2. **Industry:** Invest in pilot-scale manufacturing capabilities
3. **Policymakers:** Develop supportive regulatory frameworks for sustainable technologies
4. **Investors:** Consider long-term sustainability metrics in investment decisions

The transition to sustainable energy storage is not just an environmental imperative but also an economic opportunity for those who position themselves early in this evolving market.`,
        authors: ["Thompson, A.", "Martinez, C.", "Lee, S."],
        doi: "10.1000/184",
        domain: "Materials Science",
        tags: ["Energy Storage", "Sustainability", "Materials"],
        version: "1.1",
        wordCount: 4156,
        estimatedReadingTime: 18,
        published: 1,
      }
    ];

    sampleReviews.forEach(review => {
      this.createReview(review);
    });
  }

  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReviewById(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getReviewByNidAndSlug(nid: string, slug: string): Promise<Review | undefined> {
    return Array.from(this.reviews.values()).find(
      review => review.nid === nid && review.slug === slug
    );
  }

  async getPublishedReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.published === 1);
  }

  async searchReviews(query: string, filters?: {
    domain?: string;
    year?: string;
    tags?: string[];
  }): Promise<Review[]> {
    let results = Array.from(this.reviews.values()).filter(review => review.published === 1);

    // Apply text search
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(review =>
        review.title.toLowerCase().includes(searchTerm) ||
        review.reviewSummary.toLowerCase().includes(searchTerm) ||
        review.content.toLowerCase().includes(searchTerm) ||
        review.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
        review.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        review.domain.toLowerCase().includes(searchTerm)
      );
    }

    // Apply domain filter
    if (filters?.domain) {
      results = results.filter(review => review.domain === filters.domain);
    }

    // Apply year filter
    if (filters?.year) {
      results = results.filter(review => {
        const reviewYear = new Date(review.lastUpdated).getFullYear().toString();
        return reviewYear === filters.year;
      });
    }

    // Apply tag filters
    if (filters?.tags && filters.tags.length > 0) {
      results = results.filter(review =>
        filters.tags!.some(tag => review.tags.includes(tag))
      );
    }

    return results;
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentId++;
    const review: Review = {
      id,
      nid: insertReview.nid,
      title: insertReview.title,
      slug: insertReview.slug,
      reviewSummary: insertReview.reviewSummary,
      content: insertReview.content,
      authors: ensureStringArray(insertReview.authors),
      doi: insertReview.doi,
      domain: insertReview.domain,
      tags: ensureStringArray(insertReview.tags),
      version: insertReview.version || "1.0",
      wordCount: insertReview.wordCount,
      estimatedReadingTime: insertReview.estimatedReadingTime,
      reviewAuthor: insertReview.reviewAuthor || null,
      impactMetrics: insertReview.impactMetrics || null,
      reuseLicense: insertReview.reuseLicense || null,
      sourceAttribution: insertReview.sourceAttribution || null,
      published: insertReview.published || 1,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  async updateReview(id: number, updateData: Partial<InsertReview>): Promise<Review | undefined> {
    const existing = this.reviews.get(id);
    if (!existing) return undefined;

    const updated: Review = {
      id: existing.id,
      nid: updateData.nid || existing.nid,
      title: updateData.title || existing.title,
      slug: updateData.slug || existing.slug,
      reviewSummary: updateData.reviewSummary || existing.reviewSummary,
      content: updateData.content || existing.content,
      authors: updateData.authors ? ensureStringArray(updateData.authors) : existing.authors,
      doi: updateData.doi || existing.doi,
      domain: updateData.domain || existing.domain,
      tags: updateData.tags ? ensureStringArray(updateData.tags) : existing.tags,
      version: updateData.version || existing.version,
      wordCount: updateData.wordCount || existing.wordCount,
      estimatedReadingTime: updateData.estimatedReadingTime || existing.estimatedReadingTime,
      reviewAuthor: updateData.reviewAuthor !== undefined ? updateData.reviewAuthor : existing.reviewAuthor,
      impactMetrics: updateData.impactMetrics !== undefined ? updateData.impactMetrics : existing.impactMetrics,
      reuseLicense: updateData.reuseLicense !== undefined ? updateData.reuseLicense : existing.reuseLicense,
      sourceAttribution: updateData.sourceAttribution !== undefined ? updateData.sourceAttribution : existing.sourceAttribution,
      published: updateData.published !== undefined ? updateData.published : existing.published,
      createdAt: existing.createdAt,
      lastUpdated: new Date(),
    };
    this.reviews.set(id, updated);
    return updated;
  }

  async deleteReview(id: number): Promise<boolean> {
    return this.reviews.delete(id);
  }

  async getReviewsByDomain(domain: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      review => review.domain === domain && review.published === 1
    );
  }

  async getReviewsByTag(tag: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      review => review.tags.includes(tag) && review.published === 1
    );
  }

  async getAllDomains(): Promise<string[]> {
    const domains = new Set<string>();
    Array.from(this.reviews.values()).forEach(review => {
      if (review.published === 1) {
        domains.add(review.domain);
      }
    });
    return Array.from(domains).sort();
  }

  async getAllTags(): Promise<string[]> {
    const tags = new Set<string>();
    Array.from(this.reviews.values()).forEach(review => {
      if (review.published === 1) {
        review.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }

  // User methods (stub implementations for interface compliance)
  async getUser(id: number): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    throw new Error("User creation not supported in MemStorage");
  }
}

export const storage = new DatabaseStorage();
