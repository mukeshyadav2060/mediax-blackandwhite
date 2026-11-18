export type Item = { t: string; b: string; href?: string };
export type Sec =
  | { k: "cards"; title: string; items: Item[]; dark?: boolean }
  | { k: "rows"; title: string; items: Item[] }
  | { k: "stats"; items: [string, string][] }
  | { k: "text"; title?: string; paras: string[] }
  | { k: "feed" | "steps" | "quotes" | "outlets" | "faq" | "pricing" | "compare" | "contact" | "verify" | "posts" | "publishers" };

export type Page = { eyebrow: string; title: string; lead: string; cta?: [string, string][]; secs: Sec[] };

const SUBMIT: [string, string][] = [["Submit your release", "/submit-press-release"], ["See pricing", "/pricing"]];

const why: Item[] = [
  { t: "Crypto-native newsrooms", b: "Placements on the outlets Web3 readers, traders and investors actually follow." },
  { t: "Mainstream credibility", b: "Syndication to Yahoo Finance, AP News and Business Insider for reach beyond crypto." },
  { t: "Guaranteed placements", b: "Every package guarantees a minimum number of live publications, in writing." },
  { t: "Metric reports", b: "Coverage, estimated views, audience and engagements delivered after every campaign." },
];

/* -------- generated landing pages: /pr, /mk, /sc -------- */
function landing(eyebrow: string, title: string, lead: string, gets: Item[], uses: string[]): Page {
  return {
    eyebrow, title, lead, cta: SUBMIT,
    secs: [
      { k: "cards", title: "What you get", items: gets },
      { k: "rows", title: "How it works", items: [
        { t: "Pick a package", b: "Choose the reach and outlets that fit your budget, or ask for a custom quote." },
        { t: "Share your story", b: "Send a draft or a brief. Our editors shape it into a release that earns pickup." },
        { t: "Go live in 24–48 hours", b: "We distribute across the network and send you a metric report when it’s done." },
      ] },
      { k: "text", title: "Best for", paras: [uses.join(" · ")] },
      { k: "outlets" },
      { k: "quotes" },
      { k: "faq" },
    ],
  };
}
const g = (a: string, b: string, c: string): Item[] => [
  { t: "Story angle", b: a }, { t: "Distribution", b }, { t: "Reporting", b: c },
];

export const landings: Record<string, Page> = {
  "pr/crypto-exchange-pr": landing("PR services", "Crypto exchange **PR**", "Listings, new markets, security updates and campaigns — announced where traders look first.",
    g("We frame every listing or product update around what traders and issuers care about.", "Syndication to crypto-native and mainstream finance outlets within 24–48 hours.", "Coverage links, views and audience figures after go-live."), ["New listings", "Product launches", "Trading competitions", "Licensing news"]),
  "pr/crypto-press-release": landing("PR services", "Crypto press **release**", "News-style announcements for token launches, funding rounds, partnerships and rebrands.",
    g("Editors turn your news into a clear, factual release with a strong headline.", "Guaranteed publications on top-tier crypto and mainstream media.", "A metric report with pieces of coverage, views, audience and engagements."), ["Token launches", "Funding rounds", "Partnerships", "Rebrands"]),
  "pr/de-fi-press-release": landing("PR services", "DeFi press **release**", "Explain protocols, audits and upgrades to the people who provide liquidity.",
    g("Plain-language framing for complex protocol news — TVL, audits, governance.", "Outlets read by DeFi users, DAOs and funds.", "Placement report plus SEO-ready backlinks."), ["Protocol launches", "Audits", "Governance", "Liquidity programs"]),
  "pr/fintech-pr": landing("PR services", "Fintech **PR**", "Bridge crypto and traditional finance with stories that mainstream editors accept.",
    g("Positioning for regulators, banks and retail users alike.", "Mainstream finance and business outlets alongside crypto media.", "Clear reporting you can forward to partners and investors."), ["Payments", "Neobanks", "Stablecoins", "Tokenised assets"]),
  "pr/web3-press-release": landing("PR services", "Web3 press **release**", "From gaming to infrastructure — get your Web3 milestone in front of builders and backers.",
    g("Narratives built around your community and your roadmap.", "Wide distribution across Web3 and mainstream media.", "Reports that show reach, audience and engagement."), ["Infrastructure", "Gaming", "NFTs", "Wallets"]),
  "mk/crypto-influencer-marketing": landing("Marketing services", "Crypto influencer **marketing**", "Vetted KOLs and creators who move real audiences — not bought followers.",
    g("Creator shortlist matched to your audience, region and budget.", "Briefing, content approval and scheduling handled by our team.", "Post-campaign report on reach, clicks and engagement."), ["Launch hype", "Community growth", "Exchange listings"]),
  "mk/crypto-link-building": landing("Marketing services", "Crypto link **building**", "Editorial backlinks from reputable crypto and finance sites to lift your search visibility.",
    g("Topics chosen for search demand and editorial fit.", "Contextual links placed inside genuine articles.", "Link-by-link report with domain and traffic data."), ["SEO growth", "Brand searches", "New domains"]),
  "mk/press-release-distributions": landing("Marketing services", "Press release **distribution**", "Already have a release? We’ll put it on the right outlets, fast.",
    g("Light editorial review so your release is pickup-ready.", "Instant distribution through our publisher network.", "Live links and metrics once published."), ["Ready-made releases", "Agency partners", "Time-sensitive news"]),
  "mk/twitter-influencers": landing("Marketing services", "Twitter influencers", "Reach crypto Twitter through accounts that traders and builders already trust.",
    g("Account selection by niche, engagement quality and past results.", "Threads, quote posts and campaigns coordinated end to end.", "Impressions, engagement and click data afterwards."), ["Token launches", "Airdrops", "Event promotion"]),
  "mk/you-tube-influencers-for-crypto": landing("Marketing services", "YouTube influencers for crypto", "Long-form reviews and walkthroughs from creators with engaged crypto audiences.",
    g("Creators matched to your product and audience maturity.", "Scripting guidance, disclosure and publishing schedule managed for you.", "View, watch-time and conversion reporting."), ["Product explainers", "Exchange reviews", "Educational series"]),
  "sc/de-fi-marketing": landing("Sectors", "DeFi **marketing**", "Credibility and clarity for protocols competing for liquidity and attention.", g("Messaging that makes yield, risk and security understandable.", "PR, KOLs and content aligned to one calendar.", "Dashboards of reach and community lift."), ["Protocols", "DEXs", "Lending", "Yield"]),
  "sc/game-fi-marketing": landing("Sectors", "GameFi **marketing**", "Grow players and token holders with launch-ready PR and creator campaigns.", g("Storytelling around gameplay, tokenomics and partnerships.", "Media, creators and community channels in one plan.", "Player and audience growth reporting."), ["Game launches", "Seasons", "Tournaments"]),
  "sc/ico-marketing": landing("Sectors", "ICO **marketing**", "Trusted exposure for token sales, from announcement to close.", g("A narrative that builds confidence in the team, product and token.", "Phased PR and influencer pushes through the sale window.", "Weekly reach and engagement snapshots."), ["Token sales", "Presales", "Listings"]),
  "sc/ido-marketing": landing("Sectors", "IDO **marketing**", "Reach launchpad communities and mainstream investors before your IDO opens.", g("Launch narrative, FAQs and creative assets prepared in advance.", "Coordinated media and creator pushes around the IDO date.", "Post-IDO coverage and audience report."), ["Launchpad sales", "Community rounds"]),
  "sc/metaverse-marketing": landing("Sectors", "Metaverse **marketing**", "Make virtual worlds, assets and experiences easy to understand and hard to ignore.", g("Positioning around utility, not hype.", "Media, creators and event promotion for virtual launches.", "Coverage and community reporting."), ["Virtual worlds", "Digital land", "Experiences"]),
  "sc/p2-e-marketing": landing("Sectors", "P2E **marketing**", "Introduce play-to-earn economies to players, guilds and the press.", g("Clear explanations of earning mechanics and sustainability.", "Creator and media campaigns for guilds and gamers.", "Reach and sign-up reporting."), ["Play-to-earn", "Guilds", "In-game economies"]),
  "sc/web3-marketing-services": landing("Sectors", "Web3 marketing **services**", "A full-stack mix of PR, KOLs, content and SEO for Web3 teams.", g("One strategy across earned, owned and creator channels.", "Execution by a single team with transparent pricing.", "Unified reporting across every channel."), ["Startups", "Foundations", "Infrastructure", "Wallets"]),
};

/* -------- standalone pages -------- */
export const pages: Record<string, Page> = {
  pricing: { eyebrow: "Pricing", title: "Simple **pricing**, guaranteed placements", lead: "Four packages from $1,399. Every plan includes same-day distribution, editorial suggestions, customer support and SEO adjustments.", cta: [["Submit your release", "/submit-press-release"], ["Custom quote", "/contact"]],
    secs: [{ k: "pricing" }, { k: "compare" }, { k: "faq" }] },
  about: { eyebrow: "About MediaX", title: "The crypto PR agency for **Web3**", lead: "MediaX is a crypto marketing and PR agency helping NFT, DeFi, Web3 and Metaverse projects with press, branding and marketing — from Dubai to Kolkata.", cta: SUBMIT,
    secs: [
      { k: "stats", items: [["1,400+", "Web3 projects served"], ["500+", "Guaranteed publications per package"], ["24–48h", "Typical time to go live"], ["37", "Publishers in our network"]] },
      { k: "text", title: "Our story", paras: [
        "Crypto teams told us the same thing: great products, no coverage. Real newsrooms were hard to reach and ‘guaranteed’ PR rarely was.",
        "MediaX was built to fix that — a distribution network of crypto-native and mainstream outlets, editors who understand the space, and pricing you can read before you buy.",
      ] },
      { k: "cards", title: "What we stand for", dark: true, items: [
        { t: "Transparency", b: "Public pricing, named outlets and a report on every campaign." },
        { t: "Speed", b: "Live within 24–48 hours of approval — launches don’t wait." },
        { t: "Trust", b: "Verified outlets only, and an official way to verify our team." , href: "/verify-team" },
      ] },
      { k: "quotes" },
    ] },
  team: { eyebrow: "Team", title: "The people behind your **coverage**", lead: "A small, senior team of PR strategists, editors and media relations specialists working across Dubai, Kolkata and beyond.", cta: [["Book a call", "https://calendly.com/mediaxagency/30min"], ["Verify a team member", "/verify-team"]],
    secs: [
      { k: "cards", title: "Who you’ll work with", items: [
        { t: "PR strategists", b: "Shape your narrative, timing and package." },
        { t: "Editors & copywriters", b: "Turn your news into releases that earn pickup." },
        { t: "Media relations", b: "Manage relationships with publishers and editors." },
        { t: "Analysts", b: "Build your metric report: coverage, views, audience, engagement." },
        { t: "Creator partnerships", b: "Brief and manage KOLs and influencers." },
        { t: "Client success", b: "Your point of contact from submission to report." },
      ] },
      { k: "text", title: "Staying safe", paras: ["Scammers impersonate crypto agencies. Our team only contacts you from @mediax.agency email addresses and the official Telegram account @MediaxPR. Not sure? Use the verification page."] },
    ] },
  feed: { eyebrow: "Feed", title: "Fresh from the **network**", lead: "Client stories, guides and the outlets we publish on — one running feed of how crypto and Web3 teams get featured.", cta: [["Submit your release", "/submit-press-release"], ["See pricing", "/pricing"]],
    secs: [{ k: "feed" }] },
  publications: { eyebrow: "Publications", title: "Our media **network**", lead: "Crypto-native and mainstream publishers we distribute to. Which outlets you get depends on your package.", cta: [["Compare packages", "/pricing"], ["Submit your release", "/submit-press-release"]],
    secs: [{ k: "publishers" }] },
  blogs: { eyebrow: "Blog", title: "Guides for **crypto PR**", lead: "Practical playbooks on press releases, KOL marketing and Web3 content.", secs: [{ k: "posts" }] },
  newsroom: { eyebrow: "Newsroom", title: "MediaX **newsroom**", lead: "Company updates, resources and press contact.", cta: [["Press enquiries", "/contact"]],
    secs: [{ k: "posts" }, { k: "text", title: "Press contact", paras: ["For interviews, partnerships or media requests, email contact@mediax.agency or message @MediaxPR on Telegram."] }] },
  "verify-team": { eyebrow: "Verify team", title: "Is this really **MediaX**?", lead: "Check an email address or Telegram handle before you reply, pay or share anything.", secs: [{ k: "verify" }] },
  contact: { eyebrow: "Contact", title: "Let’s get you **featured**", lead: "Tell us about your project. We’ll reply within 24 hours.", secs: [{ k: "contact" }] },
  faq: { eyebrow: "FAQ", title: "Questions, **answered**", lead: "Everything about pricing, publishing times and how crypto press releases work.", cta: [["Book a call", "https://calendly.com/mediaxagency/30min"]], secs: [{ k: "faq" }] },
  industry: { eyebrow: "Industry", title: "PR for every corner of **Web3**", lead: "Pick your sector — we’ll show how we position projects like yours.", cta: SUBMIT,
    secs: [{ k: "cards", title: "Sectors", items: [
      { t: "DeFi", b: "Protocols, DEXs, lending.", href: "/sc/de-fi-marketing" }, { t: "GameFi", b: "Games, guilds, seasons.", href: "/sc/game-fi-marketing" },
      { t: "ICO", b: "Token sales and presales.", href: "/sc/ico-marketing" }, { t: "IDO", b: "Launchpad sales.", href: "/sc/ido-marketing" },
      { t: "Metaverse", b: "Virtual worlds and assets.", href: "/sc/metaverse-marketing" }, { t: "P2E", b: "Play-to-earn economies.", href: "/sc/p2-e-marketing" },
      { t: "Exchanges", b: "Listings and markets.", href: "/pr/crypto-exchange-pr" }, { t: "Fintech", b: "Crypto meets TradFi.", href: "/pr/fintech-pr" },
    ] }, { k: "outlets" }] },
  "drop-press-release": { eyebrow: "Drop a press release", title: "Drop your release, we **handle** the rest", lead: "Already have a finished release? Send it over and we’ll distribute it within 24–48 hours of approval.", cta: [["Submit now", "/submit-press-release"], ["See pricing", "/pricing"]],
    secs: [{ k: "steps" }, { k: "cards", title: "What happens next", dark: true, items: [
      { t: "Quick review", b: "An editor checks facts, headline and formatting." }, { t: "Distribution", b: "Your release goes out across your package’s outlets." }, { t: "Report", b: "You receive live links and a metric report." },
    ] }, { k: "faq" }] },
  "crypto-press-release": { eyebrow: "Crypto press release", title: "Crypto press release **distribution**", lead: "Trusted distribution on top-tier crypto and mainstream media for token launches, funding, listings and rebrands.", cta: SUBMIT,
    secs: [{ k: "cards", title: "Why MediaX", items: why }, { k: "outlets" }, { k: "pricing" }, { k: "quotes" }, { k: "faq" }] },
  "best-crypto-pr-agency": { eyebrow: "Crypto PR agency", title: "The best crypto PR **agency** for Web3", lead: "1,400+ projects have trusted MediaX for guaranteed placements, fast turnaround and transparent pricing.", cta: SUBMIT,
    secs: [{ k: "stats", items: [["1,400+", "Projects"], ["500+", "Publications per package"], ["24–48h", "To go live"], ["$1,399", "Starting price"]] }, { k: "cards", title: "What sets us apart", dark: true, items: why }, { k: "quotes" }, { k: "faq" }] },
  privacy: { eyebrow: "Legal", title: "Privacy **policy**", lead: "How MediaX collects, uses and protects your information.",
    secs: [{ k: "text", paras: [
      "Information we collect. When you submit a press release or contact us we collect your name, email address, Telegram ID, company and press release content so we can deliver our service.",
      "How we use it. We use your information to review and distribute your release, communicate with you, provide reports and improve our service. We do not sell your personal data.",
      "Sharing. Press release content is shared with publishers for the purpose of publication. We use trusted providers for payments and communications, who may only use your data to serve us.",
      "Retention and your rights. We keep data only as long as needed. You may request access, correction or deletion at any time by emailing contact@mediax.agency.",
      "Contact. MediaX Agency – FZCO, Al Mankhool, Bur Dubai, Dubai. contact@mediax.agency.",
    ] }] },
  "terms-condition": { eyebrow: "Legal", title: "Terms & **conditions**", lead: "The terms that apply when you use MediaX services.",
    secs: [{ k: "text", paras: [
      "Services. MediaX provides press release distribution and related marketing services as described on each package. Publication is guaranteed according to the package purchased; specific outlets may vary within the package.",
      "Client responsibilities. You confirm the content you submit is accurate, lawful and that you have the right to publish it. We may decline content that is misleading, unlawful or breaches publisher policies.",
      "Payment. Packages are paid in advance. Delivery begins after payment and approval of your release.",
      "No financial advice. Distribution of your release is not an endorsement. Nothing we publish is investment advice.",
      "Liability. To the extent permitted by law, MediaX is not liable for indirect losses. Questions? contact@mediax.agency.",
    ] }] },
};

export const articles: Record<string, { title: string; tag: string; read: string; body: { h?: string; p: string }[] }> = {
  "web3-press-release-framework": { title: "Web3 Press Release Framework", tag: "Framework", read: "5 min read", body: [
    { p: "A good Web3 press release is not a tweet with extra steps. Editors need a clear news hook, verifiable facts and a reason their readers should care today." },
    { h: "1. Lead with the news", p: "Put what happened in the headline and first paragraph: the launch, the raise, the listing. Skip adjectives; use numbers and names." },
    { h: "2. Add proof", p: "Quote an executive, cite figures — TVL, users, funding, partners — and link to sources. Claims without evidence get cut." },
    { h: "3. Explain for outsiders", p: "Write the second paragraph for someone who has never heard of your project. Mainstream finance editors will rewrite jargon or drop the story." },
    { h: "4. Close with next steps", p: "Tell readers where to go: website, docs, community. Include a media contact so journalists can follow up." },
  ] },
  "kols-in-crypto": { title: "What Are KOLs in Crypto? A Complete Guide to KOL Marketing", tag: "Guide", read: "6 min read", body: [
    { p: "KOL stands for key opinion leader — creators and analysts whose audiences trust their views on crypto." },
    { h: "Why teams use KOLs", p: "KOLs deliver attention fast, bring social proof and translate technical products for retail audiences. Combined with press coverage they reinforce each other." },
    { h: "How to choose", p: "Look at engagement quality, audience region, past disclosures and niche fit rather than follower count alone." },
    { h: "How to measure", p: "Track impressions, clicks, sign-ups and sentiment. Agree the metrics up front and request a report after the campaign." },
  ] },
  "crypto-trading-content-marketing-strategies": { title: "Best Crypto Trading Content Marketing Strategies", tag: "Strategy", read: "5 min read", body: [
    { p: "Trading audiences want speed, data and honesty. Content that respects that earns trust — and users." },
    { h: "Publish market-aware education", p: "Explain concepts such as order types, risk and liquidity in plain language and tie them to live market events." },
    { h: "Back it with data", p: "Original charts, volume statistics and product benchmarks get cited by outlets and shared by traders." },
    { h: "Distribute beyond your blog", p: "Syndicate through press releases, guest articles and creators so the content reaches readers who don’t know you yet." },
  ] },
};
