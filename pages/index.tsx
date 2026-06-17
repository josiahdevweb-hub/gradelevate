import Head from "next/head";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Services from "@/components/home/Services";
import Events from "@/components/home/Events";
import Differentiator from "@/components/home/Differentiator";
import HowItWorks from "@/components/home/HowItWorks";
import Founder from "@/components/home/Founder";
import CtaBanner from "@/components/home/CtaBanner";
import Footer from "@/components/home/Footer";
import AnnouncementPopup from "@/components/home/AnnouncementPopup";

export async function getServerSideProps() {
  try {
    const API = "https://gradeelevate-backend-production.up.railway.app";
    const res = await fetch(`${API}/api/announcements`);
    const announcement = res.ok ? await res.json() : null;
    return { props: { announcement } };
  } catch {
    return { props: { announcement: null } };
  }
}

export default function Home({ announcement }: { announcement: unknown }) {
  return (
    <>
      <Head>
        <title>GradElevate — Elevate Your Academic Journey. Accelerate Your Career.</title>
        <meta
          name="description"
          content="Expert academic, research, and career support for students, graduates, and early-career researchers ready to achieve more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnnouncementPopup announcement={announcement as never} />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Events />
        <Differentiator />
        <HowItWorks />
        <Founder />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
