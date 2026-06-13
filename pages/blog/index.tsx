import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import fs from "fs";
import path from "path";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/blog.module.css";

interface Post {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

const categories = ["All", "Academic Success", "Graduate Employability", "Research Skills", "AI & Higher Education"];

export default function Blog({ posts }: { posts: Post[] }) {
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
            <div className={styles.cats}>
              {categories.map((c) => (
                <span key={c} className={styles.cat}>{c}</span>
              ))}
            </div>

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

export const getServerSideProps: GetServerSideProps = async () => {
  const filePath = path.join(process.cwd(), "data", "blogs.json");
  const posts: Post[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return { props: { posts } };
};
