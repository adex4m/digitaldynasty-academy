import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

const Privacy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy | DigitalDynasty Imperium"
        description="Learn how DigitalDynasty Imperium collects, uses, and protects your personal data in compliance with NDPA."
        path="/privacy"
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Version 1.1 | Updated: January 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                In alignment with our core value of Integrity, DigitalDynasty Imperium is committed to protecting your personal data.
              </p>

              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  1. Compliance with Nigeria Data Protection Act (NDPA)
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  DDI processes all personal data in strict accordance with the Nigeria Data Protection Act (NDPA) and other relevant West African data regulations. We ensure that your data is collected for specific, legitimate purposes related to your digital education.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  2. Data Collection and Usage
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information to manage student affairs and deliver impactful curriculum. This includes:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Personal Identifiers:</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Collected during registration to streamline information delivery.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Academic Progress:</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Monitored to ensure you are receiving the best value for your money.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  3. Third-Party Data Handling (Selar)
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you click "Enroll," you are redirected to our Selar store. While DDI manages the curriculum, your payment data is governed by Selar's privacy policy. DDI only receives the necessary information (such as name and email) required to grant you access to our courses and LMS.
                </p>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  4. Data Sharing and Security
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Access:</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Your data is accessible only to authorized personnel, including the CEO, Program Manager, and Student Affairs Coordinator.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Partnerships:</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may share relevant student data with strategic partners for internship and job placement purposes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  5. Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Under the NDPA, you have the right to access your data, request corrections, or object to the processing of your information. For such requests, please contact our Finance & Admin Officer.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Privacy;
