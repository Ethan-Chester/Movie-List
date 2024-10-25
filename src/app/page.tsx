import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className='flex justify-center mt-12 text-4xl'><Link href={'/movies'}>View Movies ➔</Link></div>
    </div>
  );
}
