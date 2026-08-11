import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Prose } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "What we have built into this site for accessibility, what we have not yet verified, and how to tell us when something does not work.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="What is built in, and what we have not yet verified."
        lede="We aim at WCAG 2.2 Level AA. We are not claiming to have reached it, because a genuine claim requires testing with assistive technology and an expert audit — neither of which we have completed."
      />

      <section className="hairline-t bg-paper">
        <div className="shell py-16 md:py-20">
          <Prose className="measure-wide">
            <h2>What is in place</h2>
            <ul>
              <li>
                Semantic headings in order, landmarks on every page, and a skip link
                to the main content as the first focusable element.
              </li>
              <li>
                Visible focus outlines on every interactive element, in a colour that
                meets contrast requirements against both our light and dark surfaces.
              </li>
              <li>
                Body text at a minimum of 15px with generous line height, and no text
                set in an image.
              </li>
              <li>
                Text and background combinations checked for contrast. Body copy on
                our bone and paper surfaces exceeds 7:1.
              </li>
              <li>
                All motion — reveals, image drift, menu transitions — is disabled
                automatically for anyone whose system requests reduced motion.
              </li>
              <li>
                Navigation, filters and disclosures work from the keyboard, and the
                collection filters are plain links that work with JavaScript
                disabled.
              </li>
              <li>
                Form fields have persistent visible labels rather than placeholder-only
                labels, and errors are announced as well as shown.
              </li>
              <li>
                Decorative imagery is hidden from screen readers; anything carrying
                meaning has a text description.
              </li>
            </ul>

            <h2>What we have not verified</h2>
            <ul>
              <li>
                Testing with screen readers — NVDA, JAWS and VoiceOver — has not been
                completed across the whole site.
              </li>
              <li>
                We have not had an independent accessibility audit.
              </li>
              <li>
                Zoom and reflow behaviour above 200% has been checked informally
                rather than systematically.
              </li>
              <li>
                Product photography does not yet carry full descriptive alt text,
                because the photography itself is not final.
              </li>
            </ul>

            <h2>Tell us when something does not work</h2>
            <p>
              If any part of this site is difficult or impossible for you to use,
              write to {site.contact.email} and describe what happened and what you
              were using. We will reply within one working day and fix it as a
              priority rather than adding it to a list.
            </p>
            <p>
              If you would rather not use the site at all, we will take an order by
              email or by telephone on {site.contact.phone} and read you anything you
              need from these pages.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
