import Header from "./Header";
import Footer from "./Footer";
import HeroDoodles from "./HeroDoodles";
import HeroLeadForm from "./HeroLeadForm";

export default function Home() {
  return (
    <>
      <Header />
      <main className="snap-container">
        <div className="snap-page snap-page-hero">
          <section className="hero hero-light">
            <HeroDoodles />
            <div className="hero-split">
              <div className="hero-left">
                <h1>
                  <span className="headline-line">
                    Puffle finds <em>hidden</em> ways
                  </span>
                  <span className="headline-line">to get you customers</span>
                </h1>
                <p className="subheadline">
                  See what it finds for you
                </p>
                <HeroLeadForm />
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </>
  );
}
