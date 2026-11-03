import Route, { routeMeta } from "@/components/Route";

export const metadata = routeMeta("blogs");

export default function Page() {
  return <Route k="blogs" />;
}
