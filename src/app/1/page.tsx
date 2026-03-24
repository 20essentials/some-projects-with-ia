import type { Metadata } from 'next';
import { Background } from './components/background';
import { Menu } from './components/menu';

export const metadata: Metadata = {
  title: 'Groq + StreamDown'
};

export default function Page() {
  return (
    <>
      <Background />
      <Menu />
    </>
  );
}
