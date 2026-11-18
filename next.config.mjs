const flat = "about best-crypto-pr-agency blogs contact crypto-press-release drop-press-release faq industry newsroom pricing privacy publications feed team terms-condition verify-team".split(" ");

export default {
  reactStrictMode: true,
  // keep clean URLs while serving all content pages from a single route (src/app/p)
  async redirects() {
    return [{ source: "/case-study", destination: "/feed", permanent: false }];
  },
  async rewrites() {
    return [
      ...flat.map((k) => ({ source: "/" + k, destination: "/p?k=" + k })),
      ...["pr", "mk", "sc", "blogs"].map((g) => ({ source: "/" + g + "/:slug", destination: "/p?k=" + g + "/:slug" })),
    ];
  },
};
