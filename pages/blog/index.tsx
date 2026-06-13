import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/blog.module.css";

const categories = ["All", "Academic Success", "Graduate Employability", "Research Skills", "AI & Higher Education"];

const posts = [
  {
    id: "how-to-write-a-first-class-dissertation",
    category: "Academic Success",
    title: "How to Write a First-Class Dissertation: A Step-by-Step Guide",
    excerpt: "A first-class dissertation doesn't happen by accident. Learn the strategies, structures, and habits that consistently separate top-graded work from the rest.",
    author: "GradElevate Team",
    date: "2 Jun 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    featured: true,
  },
  {
    id: "ai-tools-for-academic-research",
    category: "AI & Higher Education",
    title: "The Best AI Tools for Academic Research in 2026",
    excerpt: "From literature discovery to research synthesis, AI is changing how researchers work. Here are the tools worth using — and how to use them responsibly.",
    author: "GradElevate Team",
    date: "26 May 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    featured: false,
  },
  {
    id: "graduate-job-market-2026",
    category: "Graduate Employability",
    title: "The Graduate Job Market in 2026: What You Need to Know",
    excerpt: "Competition for graduate roles is fiercer than ever. We break down the skills, sectors, and strategies that will give you the best chance of landing the role you want.",
    author: "GradElevate Team",
    date: "18 May 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80",
    featured: false,
  },
  {
    id: "literature-review-guide",
    category: "Research Skills",
    title: "How to Write a Literature Review That Impresses Examiners",
    excerpt: "A strong literature review is the foundation of any good research project. Learn how to find, synthesise, and critically evaluate sources like an expert.",
    author: "GradElevate Team",
    date: "10 May 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80",
    featured: false,
  },
  {
    id: "phd-application-tips",
    category: "Research Skills",
    title: "10 Things PhD Applicants Get Wrong (And How to Fix Them)",
    excerpt: "PhD applications are highly competitive and unforgiving. These are the most common mistakes we see — and exactly how to avoid them.",
    author: "GradElevate Team",
    date: "1 May 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    featured: false,
  },
  {
    id: "academic-writing-skills",
    category: "Academic Success",
    title: "7 Academic Writing Habits That Will Transform Your Grades",
    excerpt: "Academic writing is a skill that can be learned. These seven evidence-based habits will measurably improve the quality and clarity of your work.",
    author: "GradElevate Team",
    date: "22 Apr 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
    featured: false,
  },
];

export default function Blog() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      <Head>
        <title>Blog — GradElevate</title>
        <meta name="description" content="Academic success, graduate employability, and research skills — expert insights from the GradElevate team." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        <PageHero
          variant="dark"
          eyebrow="Insights & Advice"
          title="Expert Guidance for Students, Researchers & Graduates"
          subtitle="In-depth articles on academic success, research skills, graduate employability, and the future of higher education."
        />

        <section className={styles.blogSection}>
          <div className="container">
            {/* Category filter */}
            <div className={styles.cats}>
              {categories.map((c) => (
                <span key={c} className={styles.cat}>{c}</span>
              ))}
            </div>

            {/* Featured post */}
            {featured && (
              <Link href={`/blog/${featured.id}`} className={styles.featured}>
                <div className={styles.featuredImage}>
                  <img src={featured.image} alt={featured.title} />
                </div>
                <div className={styles.featuredContent}>
                  <span className={styles.featuredTag}>{featured.category}</span>
                  <h2 className={styles.featuredTitle}>{featured.title}</h2>
                  <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                  <div className={styles.postMeta}>
                    <span>{featured.author}</span>
                    <span className={styles.dot}>·</span>
                    <span>{featured.date}</span>
                    <span className={styles.dot}>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <span className={styles.readMore}>Read Article →</span>
                </div>
              </Link>
            )}

            {/* Post grid */}
            <div className={styles.grid}>
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className={styles.card}>
                  <div className={styles.cardImage}>
                    <img src={post.image} alt={post.title} />
                    <span className={styles.cardTag}>{post.category}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <div className={styles.cardMeta}>
                      <span>{post.date}</span>
                      <span className={styles.dot}>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
