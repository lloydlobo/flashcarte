import {
  ActionIcon,
  Anchor,
  Autocomplete,
  Burger,
  createStyles,
  Flex,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCards, IconMoonStars, IconSearch, IconSun } from '@tabler/icons';
import { ToastContainer } from 'react-toastify';

import { BRAND } from '../../constants/brand.constants';
import { HeaderSearchProps } from './Header.interface';

export function HeaderSearch({
  links,
  setOpened,
}: {
  links: HeaderSearchProps['links'];
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStylesHeader();
  const theme = useMantineTheme();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <div className={classes.inner}>
      <Group align="center">
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => {
              setOpened((o) => !o);
              toggle();
            }}
            size="sm"
            color={theme.colors.gray[6]}
          />
        </MediaQuery>

        <Anchor<'a'>
          color="dimmed"
          href={'/'}
          underline={false}
          sx={{ lineHeight: 1 }}
          size="sm"
        >
          <Group align="center">
            <Flex
              title="brand-logo"
              gap={4}
              align="start"
              justify="center"
              pt={4}
            >
              <IconCards size={20} />
              <Text fz={theme.fontSizes.md} fw={700}>
                {BRAND.name}
              </Text>
            </Flex>
          </Group>
        </Anchor>
      </Group>

      <Group>
        <Group ml={50} spacing={5} className={classes.links}>
          {items}
        </Group>
        <Autocomplete
          className={classes.search}
          placeholder="Search"
          icon={<IconSearch size={16} stroke={1.5} />}
          data={[
            'React',
            'Angular',
            'Vue',
            'Next.js',
            'Riot.js',
            'Svelte',
            'Blitz.js',
          ]}
        />
        <Group position="center" my={30}>
          <ActionIcon
            variant="default"
            // color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Group>
      </Group>
    </div>
  );
}

/**
 * HeaderShell component.
 * @param setOpened Updates stateful value `opened`.
 */
export function HeaderShell({
  setOpened,
}: {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div className="item-center flex h-full">
        <HeaderSearch
          links={[{ label: 'Docs', link: '/docs' }]}
          setOpened={setOpened}
        />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Header>
  );
}

export const useStylesHeader = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    // height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));
