import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? "Brij Nandan";

  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { passwordHash, name: adminName },
      create: { email: adminEmail, passwordHash, name: adminName, role: "ADMIN" },
    });
    console.log(`Admin user ready: ${adminEmail}`);
  } else {
    console.warn("ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user creation.");
  }

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      tagline: "Software Development Engineer",
      bio: "Software Development Engineer building scalable services, evaluation frameworks, and fault-tolerant pipelines for production-grade LLM applications. Strong foundation in system design, APIs, and distributed, data-driven systems.",
    },
    create: {
      id: "singleton",
      tagline: "Software Development Engineer",
      bio: "Software Development Engineer building scalable services, evaluation frameworks, and fault-tolerant pipelines for production-grade LLM applications. Strong foundation in system design, APIs, and distributed, data-driven systems.",
      linkedinUrl: "https://www.linkedin.com/in/brij-nandan-99a392313/",
      githubUrl: "https://github.com/BrijNandan101",
      leetcodeUrl: "https://leetcode.com/u/brij14nandan99/",
      email: "brij14nandan99@gmail.com",
      seoTitle: "Brij Nandan — Software Developer",
      seoDescription: "Portfolio of Brij Nandan, Backend & Gen AI Engineer",
    },
  });

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        company: "Peoplestrong",
        role: "Software Development Engineer",
        location: "Gurugram, India",
        startDate: new Date("2026-03-01"),
        endDate: null,
        order: 0,
        bullets: [
          "Architected a Query Routing Service — a LangGraph agent resolving known intents via Elasticsearch vector search — cutting median latency ~35% and downstream compute cost ~25% on the common path.",
          "Engineered an automated Evaluation Framework (CLI + FastAPI/React) running 200+ test cases per run with async, bounded-concurrency execution and versioned MongoDB datasets.",
          "Implemented service observability (distributed tracing, structured logging) and a configuration versioning system enabling safe rollout/rollback with zero deployments, cutting change turnaround from days to under an hour.",
          "Developed A2UI, a schema-driven pipeline mapping backend API outputs to dynamic Flutter UI components.",
        ],
      },
      {
        company: "Peoplestrong",
        role: "Software Engineering Intern",
        location: "Gurugram, India",
        startDate: new Date("2025-12-01"),
        endDate: new Date("2026-02-28"),
        order: 1,
        bullets: [
          "Fixed the RAG indexing script to correctly index and prepare documents for the retrieval pipeline.",
          "Resolved code-quality and security vulnerabilities flagged by Snyk across Java, Python, and GCP Scheduler codebases, reducing open bugs and improving system reliability ahead of transitioning into a full-time SDE role.",
        ],
      },
    ],
  });

  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        institution: "United College of Engineering and Research",
        degree: "B.Tech, Electronics & Communication",
        detail: "GPA 6.9/10.0",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2026-01-01"),
        order: 0,
      },
      {
        institution: "Shree Mahaprabhu Public School",
        degree: "Intermediate (NIOS)",
        detail: "74.4%",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2021-01-01"),
        order: 1,
      },
      {
        institution: "BBS Vidya Mandir",
        degree: "High School (CBSE Board)",
        detail: "70%",
        startDate: new Date("2018-01-01"),
        endDate: new Date("2019-01-01"),
        order: 2,
      },
    ],
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Query Routing Service — LLM Agent Cost & Latency Optimization",
        slug: "query-routing-service",
        description:
          "An embedding-based semantic matcher that short-circuits a LangGraph agent's full planning loop for high-confidence, single-intent queries.",
        longDescription:
          "Every query — even trivial, single-intent ones — was routed through the LangGraph agent's full multi-step LLM planning and tool-selection loop, driving up token cost and latency for asks that mapped to one known API call.\n\nBuilt an embedding-based semantic matcher (pluggable OpenAI/Google GenAI embeddings) comparing incoming queries against pre-indexed route utterances in Elasticsearch via vector similarity search, short-circuiting the agent loop with a direct tool call at high confidence; added a lightweight LLM-based intent-classification gate with fail-closed behavior to catch compound/multi-intent queries; instrumented every decision point with tracing spans feeding Langfuse for data-driven threshold tuning.",
        techStack: ["Python", "FastAPI", "Elasticsearch", "LangGraph", "Langfuse"],
        featured: true,
        order: 0,
      },
      {
        title: "LLM Evaluation Framework",
        slug: "llm-evaluation-framework",
        description:
          "An end-to-end evaluation framework to continuously test and validate a tool-calling conversational agent, catching correctness regressions before production.",
        longDescription:
          "Designed a pluggable metrics architecture (exact tool-call correctness + LLM-as-judge answer correctness) with a dynamic registry so new metrics ship as a dropped-in file with zero config changes; implemented single-turn dataset evaluation and a scripted multi-turn conversation engine replaying realistic chat flows that faithfully reconstruct production tool-result context.\n\nIntroduced a strict applicable-vs-passed semantic excluding non-judging metrics from pass-rate math to prevent false regressions; delivered per-case latency/cost/token breakdowns, versioned datasets for reproducible regression analysis, and a CI-gating CLI exit code.",
        techStack: ["Python", "FastAPI", "MongoDB", "asyncio"],
        featured: true,
        order: 1,
      },
    ],
  });

  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
      { name: "Python", category: "LANGUAGES", proficiency: 5, order: 0 },
      { name: "Java", category: "LANGUAGES", proficiency: 4, order: 1 },
      { name: "SQL", category: "LANGUAGES", proficiency: 4, order: 2 },
      { name: "Spring Boot", category: "FRAMEWORKS", proficiency: 4, order: 0 },
      { name: "FastAPI", category: "FRAMEWORKS", proficiency: 5, order: 1 },
      { name: "Flask", category: "FRAMEWORKS", proficiency: 4, order: 2 },
      { name: "REST API", category: "FRAMEWORKS", proficiency: 5, order: 3 },
      { name: "React", category: "FRAMEWORKS", proficiency: 3, order: 4 },
      { name: "LangGraph", category: "GENAI", proficiency: 5, order: 0 },
      { name: "RAG", category: "GENAI", proficiency: 4, order: 1 },
      { name: "Prompt Engineering", category: "GENAI", proficiency: 4, order: 2 },
      { name: "LLM Evaluation", category: "GENAI", proficiency: 5, order: 3 },
      { name: "Langfuse", category: "GENAI", proficiency: 4, order: 4 },
      { name: "Elasticsearch", category: "TOOLS_CLOUD", proficiency: 4, order: 0 },
      { name: "MongoDB", category: "TOOLS_CLOUD", proficiency: 4, order: 1 },
      { name: "Docker", category: "TOOLS_CLOUD", proficiency: 4, order: 2 },
      { name: "GCP", category: "TOOLS_CLOUD", proficiency: 3, order: 3 },
      { name: "Redis", category: "TOOLS_CLOUD", proficiency: 3, order: 4 },
      { name: "Git", category: "TOOLS_CLOUD", proficiency: 5, order: 5 },
      { name: "Microservices", category: "FUNDAMENTALS", proficiency: 4, order: 0 },
      { name: "System Design", category: "FUNDAMENTALS", proficiency: 4, order: 1 },
      { name: "Data Structures & Algorithms", category: "FUNDAMENTALS", proficiency: 4, order: 2 },
      { name: "SOLID Principles", category: "FUNDAMENTALS", proficiency: 4, order: 3 },
    ],
  });

  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      {
        title: "Gen AI Systems",
        description: "Building LLM-powered agents, RAG pipelines, and evaluation/observability tooling for production.",
        icon: "Brain",
        order: 0,
      },
      {
        title: "Scalable Backend System",
        description: "Designing and building scalable, fault-tolerant backend services and APIs with FastAPI, Spring Boot, and Flask.",
        icon: "Server",
        order: 1,
      },
      {
        title: "Full Stack Development",
        description: "Shipping end-to-end web applications, from React/Next.js frontends to backend APIs and databases.",
        icon: "Layers",
        order: 2,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
