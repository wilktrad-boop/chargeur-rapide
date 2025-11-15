'use client';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ProsCons } from './ProsCons';
import { Callout } from './Callout';
import { SpecTable } from './SpecTable';
import { FAQ } from './FAQ';
import { BuyButtons } from './BuyButtons';

const components = {
  ProsCons,
  Callout,
  SpecTable,
  FAQ,
  BuyButtons,
};

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  );
}









