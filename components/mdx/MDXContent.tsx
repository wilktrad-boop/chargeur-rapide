'use client';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { TableOfContents } from './TableOfContents';
import { ProsCons } from './ProsCons';
import { Callout } from './Callout';
import { SpecTable } from './SpecTable';
import { FAQ } from './FAQ';
import { BuyButtons } from './BuyButtons';

const components = {
  TableOfContents,
  ProsCons,
  Callout,
  SpecTable,
  FAQ,
  BuyButtons,
};

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
  headings?: Array<{ id: string; text: string; level: number }>;
}

export function MDXContent({ source, headings = [] }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote {...source} components={components} />
      {headings.length > 0 && <TableOfContents headings={headings} />}
    </div>
  );
}






