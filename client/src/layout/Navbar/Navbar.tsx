import { Navbar, NavLink } from '@mantine/core';
import { IconStack2, IconCards } from '@tabler/icons';

/**
 * NavbarShell component.
 * @param opened Stateful value which toggles navbar visibility.
 */
export function NavbarShell(opened: boolean): JSX.Element {
  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 150, lg: 250 }}>
      <NavLink label="Decks" icon={<IconStack2 size={16} stroke={1.5} />} />
      <NavLink label="Cards" icon={<IconCards size={16} stroke={1.5} />} />
    </Navbar>
  );
}
