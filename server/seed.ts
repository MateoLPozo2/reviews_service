import { db } from "./db";
import { reviews, users } from "@shared/schema";
import type { InsertReview, InsertUser } from "@shared/schema";

async function seedDatabase() {
  console.log("Seeding database...");

  // Sample academic reviews
  const sampleReviews: InsertReview[] = [
    {
      nid: "1",
      title: "Transformer Architecture in Large Language Models: A Comprehensive Review",
      slug: "transformer-architecture-llm-review",
      reviewSummary: "An in-depth analysis of Transformer architectures and their evolution in modern large language models, covering technical innovations, scalability challenges, and performance benchmarks.",
      content: `# Transformer Architecture in Large Language Models

## Introduction

The Transformer architecture, introduced by Vaswani et al. in "Attention Is All You Need" (2017), has fundamentally revolutionized the field of natural language processing and become the backbone of modern large language models.

## Key Innovations

### Self-Attention Mechanism
The self-attention mechanism allows models to weigh the importance of different words in a sequence when processing each word, enabling better capture of long-range dependencies.

### Positional Encoding
Since Transformers don't inherently understand sequence order, positional encoding provides crucial spatial information to the model.

### Multi-Head Attention
Multiple attention heads allow the model to focus on different types of relationships simultaneously, improving representational capacity.

## Scalability and Performance

Recent developments in Transformer scaling have shown remarkable improvements:
- GPT-3 (175B parameters)
- PaLM (540B parameters) 
- GPT-4 (estimated 1.7T parameters)

## Challenges and Future Directions

### Computational Complexity
The quadratic complexity of self-attention with respect to sequence length remains a significant challenge for processing very long sequences.

### Memory Requirements
Large models require substantial computational resources, limiting accessibility and deployment options.

## Conclusion

Transformer architectures continue to drive innovation in AI, with ongoing research addressing scalability, efficiency, and specialized applications across domains.`,
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Emily Watson"],
      doi: "10.1000/ml.2024.transformer.review",
      domain: "Machine Learning",
      tags: ["Deep Learning", "Natural Language Processing", "Transformers", "Large Language Models"],
      version: "1.2.0",
      lastUpdated: new Date("2024-01-15"),
      wordCount: 2800,
      estimatedReadingTime: 14,
      reviewAuthor: "Dr. Sarah Chen",
      impactMetrics: {
        citationCount: 89,
        downloadCount: 1247,
        altmetricScore: 23.4
      },
      reuseLicense: "CC BY 4.0",
      sourceAttribution: "Advanced AI Research Consortium",
      published: 1,
      createdAt: new Date("2023-12-01")
    },
    {
      nid: "2", 
      title: "Quantum Error Correction: Bridging Theory and Implementation",
      slug: "quantum-error-correction-theory-implementation",
      reviewSummary: "A critical examination of quantum error correction techniques, from theoretical foundations to practical implementation challenges in current quantum computing systems.",
      content: `# Quantum Error Correction: Bridging Theory and Implementation

## Abstract

Quantum error correction represents one of the most critical challenges in realizing fault-tolerant quantum computing. This review examines the current state of quantum error correction techniques, implementation challenges, and future prospects.

## Theoretical Foundations

### Quantum Error Models
Understanding the types of errors that affect quantum systems:
- Bit-flip errors
- Phase-flip errors  
- Depolarization errors

### Stabilizer Codes
The mathematical framework underlying most quantum error correction schemes, including:
- Surface codes
- Color codes
- Topological codes

## Implementation Challenges

### Physical Qubit Requirements
Current quantum error correction schemes require significant overhead:
- Surface codes need ~1000 physical qubits per logical qubit
- Threshold error rates must be below 10^-3

### Measurement and Feedback
Real-time error detection and correction requires:
- Fast, high-fidelity measurements
- Classical processing capabilities
- Feedback control systems

## Current Experimental Progress

### Superconducting Systems
IBM, Google, and other companies have demonstrated:
- Small-scale error correction
- Logical qubit implementations
- Threshold demonstrations

### Ion Trap Systems
IonQ and other ion trap implementations show promise for:
- High-fidelity gates
- Long coherence times
- Scalable architectures

## Future Directions

The field is moving toward:
- Improved error correction codes
- Better physical qubit implementations
- Integrated classical-quantum systems

## Conclusion

While significant challenges remain, recent progress suggests that fault-tolerant quantum computing may be achievable within the next decade.`,
      authors: ["Prof. David Kim", "Dr. Lisa Zhang", "Dr. Roberto Sanchez"],
      doi: "10.1000/qc.2024.error.correction",
      domain: "Quantum Computing",
      tags: ["Quantum Computing", "Error Correction", "Fault Tolerance", "Quantum Information"],
      version: "2.1.0",
      lastUpdated: new Date("2024-02-03"),
      wordCount: 3200,
      estimatedReadingTime: 16,
      reviewAuthor: "Prof. David Kim",
      impactMetrics: {
        citationCount: 156,
        downloadCount: 892,
        altmetricScore: 31.7
      },
      reuseLicense: "CC BY-SA 4.0", 
      sourceAttribution: "Quantum Research Institute",
      published: 1,
      createdAt: new Date("2023-11-15")
    },
    {
      nid: "3",
      title: "Solid-State Battery Technology: Materials Science and Commercial Viability", 
      slug: "solid-state-battery-materials-commercial",
      reviewSummary: "An analysis of solid-state battery technologies, examining materials innovations, manufacturing challenges, and the path to commercial deployment in electric vehicles and grid storage.",
      content: `# Solid-State Battery Technology: Materials Science and Commercial Viability

## Executive Summary

Solid-state batteries represent a promising next-generation energy storage technology, offering higher energy density, improved safety, and longer cycle life compared to conventional lithium-ion batteries.

## Materials Science Advances

### Solid Electrolytes
Key categories of solid electrolytes:
- Oxide-based (LLZO, NASICON)
- Sulfide-based (LGPS, Argyrodite)
- Polymer-based electrolytes

### Interface Engineering
Critical challenges in solid-state systems:
- Solid-solid interfaces
- Ionic conductivity optimization
- Mechanical stability

## Performance Characteristics

### Energy Density
Solid-state batteries offer potential improvements:
- 50-100% higher energy density
- Reduced packaging requirements
- Thinner cell designs

### Safety Improvements
Enhanced safety features include:
- Non-flammable electrolytes
- Reduced thermal runaway risk
- Mechanical robustness

## Manufacturing Challenges

### Scalability Issues
Current manufacturing hurdles:
- High-temperature processing
- Precision assembly requirements
- Cost considerations

### Quality Control
Ensuring consistent performance requires:
- Advanced characterization techniques
- Process optimization
- Defect minimization

## Commercial Applications

### Electric Vehicles
Automotive applications drive development:
- Extended range capabilities
- Fast charging potential
- Weight reduction benefits

### Grid Storage
Stationary storage applications:
- Long-duration energy storage
- Improved cycle life
- Reduced maintenance

## Market Outlook

Industry forecasts suggest:
- Commercial deployment by 2027-2030
- Initial premium market penetration
- Gradual cost reduction trajectory

## Conclusion

While technical challenges remain, solid-state battery technology shows strong potential for transforming energy storage across multiple applications.`,
      authors: ["Dr. Jennifer Liu", "Prof. Andreas Mueller", "Dr. Priya Patel"],
      doi: "10.1000/ms.2024.solid.state.battery",
      domain: "Materials Science",
      tags: ["Energy Storage", "Battery Technology", "Materials Science", "Electric Vehicles"],
      version: "1.0.0", 
      lastUpdated: new Date("2024-01-28"),
      wordCount: 2950,
      estimatedReadingTime: 15,
      reviewAuthor: "Dr. Jennifer Liu",
      impactMetrics: {
        citationCount: 73,
        downloadCount: 1834,
        altmetricScore: 18.9
      },
      reuseLicense: "CC BY-NC 4.0",
      sourceAttribution: "Materials Research Society",
      published: 1,
      createdAt: new Date("2024-01-10")
    }
  ];

  // Sample users
  const sampleUsers: InsertUser[] = [
    {
      username: "admin",
      email: "admin@mlpresearch.com",
      role: "admin"
    },
    {
      username: "reviewer1", 
      email: "reviewer@mlpresearch.com",
      role: "reviewer"
    }
  ];

  try {
    // Insert sample reviews
    await db.insert(reviews).values(sampleReviews);
    console.log(`Inserted ${sampleReviews.length} sample reviews`);

    // Insert sample users
    await db.insert(users).values(sampleUsers);
    console.log(`Inserted ${sampleUsers.length} sample users`);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
}

export { seedDatabase };