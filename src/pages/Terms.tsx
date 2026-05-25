import Layout from "@/components/layout/Layout";
import PageHero from "@/components/layout/PageHero";
import SEO from "@/components/SEO";

const Terms = () => {
  return (
    <Layout>
      <SEO
        title="Terms of Service | DigitalDynasty Imperium"
        description="Read the Terms of Service governing your use of DigitalDynasty Imperium's courses, content and services."
        path="/terms"
      />
      <div className="min-h-screen bg-background">
        <PageHero
          eyebrow="Version 1.1 · Updated January 2026"
          title={<>Terms of <em className="font-editorial">service.</em></>}
          subtitle="The terms governing your use of DigitalDynasty Imperium's courses, content and services."
          align="center"
          size="compact"
        />


        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Welcome to DigitalDynasty Imperium (DDI). By using our website and enrolling in our programs, you agree to the following terms:
              </p>

              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  1. Scope of Service
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  DDI provides digital skills training through industry experts to impact lives and increase digital literacy. Enrollment is facilitated through our website via a link to our official Selar store.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  2. Enrollment and Payments
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Payment Gateway:</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All financial transactions are processed securely through Selar. DDI does not store your credit card details on its primary website.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Refund Policy:</h3>
                    <p className="text-muted-foreground leading-relaxed">
                       A full refund shall be issued in the event that the registrant has not attended any classes or received any material benefit from the Academy's programs. In circumstances where the registrant has commenced participation and received instructional services, no monetary refund will be granted; however, the registrant shall retain the right to transfer their enrollment to a designated beneficiary of their choosing, at no additional cost, provided the original program term has not expired.
                     </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  3. Academic Integrity and Conduct
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Identification of Strength:</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We aim to help you identify and maximize your digital strengths.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Culture:</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Students must respect our blend of corporate professionalism and community-driven spirit.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Intellectual Property:</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All curriculum and materials developed by our content developers are the property of DDI.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  4. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to be the #1 digital academy in Nigeria and provide job placement opportunities, DDI is not liable for the individual employment outcomes of students.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Terms;
