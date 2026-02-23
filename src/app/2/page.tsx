import type { Metadata } from 'next';
import { Background } from './components/background';
import { Menu } from './components/menu';
import { CONFIG } from './utils/consts';

export const metadata: Metadata = {
  title: `Chat With ${CONFIG.MODEL_AI}`
};

export default function Page() {
  return (
    <>
      <Background />
      <Menu />
    </>
  );
}
