import { defineArrayMember, defineField, defineType } from "sanity";
import { businessTypes } from './business';

const image = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({name:'localPath',type:'string',hidden:true}),
      defineField({name:'width',type:'number',hidden:true}),
      defineField({name:'height',type:'number',hidden:true}),
      defineField({
        name: "alt",
        title: "Alternative text",
        type: "string",
        validation: (r) => r.required(),
      }),
      defineField({ name: "caption", type: "string" }),
    ],
  });

const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});
const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});
const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) =>
        r
          .required()
          .custom(
            (value) =>
              !value?.current ||
              /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) ||
              "Use lowercase letters, numbers, and single hyphens.",
          ),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(300),
    }),
    image("coverImage", "Cover image"),
    defineField({name:'showCover',title:'Show cover above article',type:'boolean',initialValue:true,description:'Turn off to use the cover only on the blog listing and social previews.'}),
    defineField({name:'seoTitle',title:'Search title',type:'string',description:'Optional shorter title for search and social sharing.'}),
    defineField({name:'relatedServices',type:'array',of:[defineArrayMember({type:'reference',to:[{type:'service'}]})]}),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      description:
        "Display date, not a publishing scheduler. Click Publish to publish.",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "category" }] }),
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (r) =>
                      r
                        .required()
                        .uri({
                          scheme: ["http", "https", "mailto", "tel"],
                          allowRelative: true,
                        }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ ...image("image", "Image") }),
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
      validation: (r) => r.max(160),
    }),
  ],
  preview: { select: { title: "title", media: "coverImage" } },
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

export const schemaTypes = [post, author, category, ...businessTypes];
