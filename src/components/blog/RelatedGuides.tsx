import Link from "next/link";
import { getRelatedPosts } from "@/content/posts";
import { blogUrl } from "@/seo/urls";

export default function RelatedGuides({ service }: { service: string }) {
  const guides = getRelatedPosts(service);
  if (!guides.length) return null;

  return (
    <section
      className="px-[6%] py-12 bg-creamLight"
      aria-label="Related fabric care guides"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-2xl text-forestGreen mb-5">
          Care advice for your furniture
        </h2>
        <ul className="space-y-3">
          {guides.map((post) => (
            <li key={post._id}>
              <Link
                className="underline underline-offset-4"
                href={blogUrl(post.slug)}
              >
                {post.title} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
