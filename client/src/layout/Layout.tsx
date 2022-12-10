import { ReactNode, useState } from 'react';

import { AppShell } from '@mantine/core';

import { FooterShell, TLink } from './Footer';
import { HeaderShell } from './Header';
import { NavbarShell } from './Navbar';

/** Layout AppShell.
 * Alt layout - To place Navbar and Aside components above Header and Footer,
 * set layout="alt" on AppShell.
 * @see https://mantine.dev/core/app-shell/#responsive-styles
 */
export function Layout({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <>
      <AppShell
        header={HeaderShell({ setOpened })}
        navbar={NavbarShell(opened)}
        footer={FooterShell({ links })}
        navbarOffsetBreakpoint="sm"
        layout="default"
        padding="md"
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </>
  );
}

export const links: TLink[] = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Store' },
  { link: '#', label: 'Careers' },
];
