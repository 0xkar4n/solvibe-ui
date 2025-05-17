import Link from 'next/link';

export default function Footer() {
  return (
    <div className="fade-dashed-border-top fade-dashed-border-bottom py-4 mr-8   text-sm flex justify-end items-center space-x-2">
      <span>Built by</span>
      <Link href="https://x.com/0xkar4n" className="underline">Karan</Link>
    </div>
  );
}
