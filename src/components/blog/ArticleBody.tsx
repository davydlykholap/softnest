import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { blogImageUrl } from "@/sanity/image";
import type { Post } from "@/content/posts";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = blogImageUrl(value);
      return src ? (
        <figure>
          <Image
            src={src}
            alt={value.alt || ""}
            width={value.width || 1200}
            height={value.height || 800}
            unoptimized
            style={{ width: "100%", height: "auto" }}
          />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      ) : null;
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href.trim() : "";
      const safe = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(href);
      return safe ? <a href={href}>{children}</a> : <>{children}</>;
    },
  },
};

export default function ArticleBody({ body }: { body: Post["body"] }) {
  return <PortableText value={body} components={components} />;
}
