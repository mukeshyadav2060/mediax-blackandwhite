import Route, { routeMeta } from "@/components/Route";

type P = { searchParams: Promise<{ k?: string }> };

// every content page (/about, /pr/…, /blogs/…) is rewritten to /p?k=<path> in next.config.mjs
export async function generateMetadata({ searchParams }: P) {
  return routeMeta((await searchParams).k ?? "");
}

export default async function Page({ searchParams }: P) {
  return <Route k={(await searchParams).k ?? ""} />;
}
