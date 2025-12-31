import { redirect } from 'next/navigation';
import Link from 'next/link';

const arrayOfProjecst = [{ label: 'GroqService + CerebraService' }];

export default function Page() {
  redirect('/1');
  return (
    <>
      {arrayOfProjecst.map(({ label }, i) => (
        <Link key={i} href={`/${i + 1}`}>
          {label}
        </Link>
      ))}
    </>
  );
}
