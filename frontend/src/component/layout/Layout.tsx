import { Outlet } from 'react-router-dom';
import { LayoutHeader } from '@/component/layout/header/LayoutHeader.tsx';
import { LayoutHeaderProvider } from '@/component/layout/header/LayoutHeaderProvider.tsx';
import { LayoutFooterProvider } from '@/component/layout/footer/LayoutFooterProvider';
import { LayoutFooter } from './footer/LayoutFooter';

export const Layout = () => {
  return (
    <LayoutHeaderProvider>
      <main>
        {/* LayoutHeader는 HeaderContext를 사용하므로 LayoutHeaderProvider로 감쌈 */}
        <LayoutHeader />

        {/* LayoutFooterProvider로 Outlet을 감싸서 FooterContext도 제공 */}
        <LayoutFooterProvider>
          <Outlet />
          <LayoutFooter />
        </LayoutFooterProvider>
      </main>
    </LayoutHeaderProvider>
  );
};