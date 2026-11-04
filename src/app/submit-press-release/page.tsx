import Header from "@/components/Header";
import SubmitForm from "@/components/SubmitForm";
import { SmoothScroll } from "@/components/Motion";

export const metadata = { title: "Submit your press release — MediaX" };

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="submit">
        <div className="wrap submit-in">
          <p className="eyebrow">Submit a press release</p>
          <h1 className="display h-xl">Submit your <strong>press release</strong></h1>
          <p className="lead">Send us your release, choose a package and go straight to checkout. No account needed.</p>
          <SubmitForm />
        </div>
      </main>
    </>
  );
}
