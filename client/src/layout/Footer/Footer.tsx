import {
  ActionIcon,
  Anchor,
  createStyles,
  Flex,
  Footer,
  Group,
  Text,
} from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCards,
} from '@tabler/icons';

import { BRAND } from '../../constants/brand.constants';
import { FooterCenteredProps, TLink } from './Footer.interface';

/**
 * FooterShell component.
 * @param links List of links to be displayed in footer.
 */
export function FooterShell({ links }: { links: TLink[] }): JSX.Element {
  return (
    <Footer p="md" height={{ base: '90', sm: '70' }}>
      <FooterCentered links={links} />
    </Footer>
  );
}

export function FooterCentered({
  links,
}: {
  links: FooterCenteredProps['links'];
}) {
  const { classes } = useStylesFooter();
  const items = links.map((link) => (
    <Anchor<'a'>
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <>
      <div className={classes.inner}>
        <Flex align="center" justify="center" gap="sm">
          <Anchor<'a'>
            color="dimmed"
            href={'/'}
            sx={{ lineHeight: 1 }}
            size="sm"
          >
            <ActionIcon variant="subtle">
              <IconCards size={28} />
            </ActionIcon>
          </Anchor>
          <Flex className="opacity-70" align="center" pt={2} gap={4}>
            <Text>&copy;</Text>
            <Text>{new Date().getFullYear()}</Text>
            <Text>{BRAND.name}</Text>
          </Flex>
        </Flex>

        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap className={classes.social}>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </>
  );
}

export const useStylesFooter = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: `${theme.spacing.md}px ${theme.spacing.md}px`,
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },
  social: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));
