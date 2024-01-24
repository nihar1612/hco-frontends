import { sanityClientPreview } from 'lib/sanity.server';
import { pageQuery } from 'groq-queries/page';
import { blogPostQuery } from 'groq-queries/blogPost';

export default async function preview(req: any, res: any) {
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  switch (req.query.type) {
    case 'page':
    case 'adPage': {
      const page = await sanityClientPreview.fetch(pageQuery, {
        slug: req.query.slug,
      });

      if (!page) {
        return res.status(401).json({ message: 'Invalid slug' });
      }

      res.setPreviewData({});

      res.writeHead(307, { Location: `/${page.slug.current}` });
      res.end();
    }

    case 'post': {
      const post = await sanityClientPreview.fetch(blogPostQuery, {
        slug: req.query.slug,
      });

      if (!post) {
        return res.status(401).json({ message: 'Invalid slug' });
      }

      res.setPreviewData({});

      res.writeHead(307, { Location: `/blog/${post.slug.current}` });
      res.end();
    }

    default:
      return res.status(401).json({ message: 'Invalid type' });
  }
}
