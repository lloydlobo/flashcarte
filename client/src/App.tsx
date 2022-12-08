import {
  ActionIcon, Anchor, AppShell, Autocomplete, Burger, Button, Card, Center, CloseButton, Container, createStyles, Flex, Footer,
  Group, Header, Image, MantineProvider, MantineTheme, MediaQuery, Navbar, NavLink, SimpleGrid, Space,
  Text, TextInput, Title, useMantineTheme
} from '@mantine/core'; // prettier-ignore
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCards,
  IconSearch,
  IconStack2,
} from '@tabler/icons';
import { ChangeEvent, Dispatch, FormEvent, ReactNode, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [title, setTitle] = useState('');
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  // prettier-ignore
  async function handleCreateDeck(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Tell HTML to avoid clearing the form.

    const updated = await fetch('http://localhost:8080/api/decks', {
      method: 'POST', body: JSON.stringify({ title: title, }), headers: { 'Content-Type': 'application/json', },
    }).then((res: Response) => res.json()).catch((err: any) => console.error('Failed to create deck.', err));

    notify(`Created ${updated.deck.title}`)
  }

  return (
    <Layout>
      <section id="hero">
        <Container mt={24}>
          <Title hidden order={1}>
            {BRAND.name}
          </Title>

          <form action="submit" onSubmit={(e) => handleCreateDeck(e)}>
            {/* clicking on label with A11Y htmlFor + id allows users to click on label and auto-focus the input. */}
            <Flex
              align={'end'}
              gap={'sm'}
              direction={{ base: 'column', md: 'row' }}
            >
              <TextInput
                label="Deck Title"
                placeholder="Enter the title of your deck"
                className="w-full text-start"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value) } // prettier-ignore
              />

              <Button variant="outline" type="submit">
                Create Deck
              </Button>
            </Flex>
          </form>
        </Container>
      </section>

      <Space h="xl" />

      <section id="decks">
        <Container>
          <SimpleGrid
            cols={4}
            spacing="lg"
            breakpoints={[
              { maxWidth: 980, cols: 3, spacing: 'md' },
              { maxWidth: 755, cols: 2, spacing: 'sm' },
              { maxWidth: 600, cols: 1, spacing: 'sm' },
            ]}
          >
            <DeckCard title={title} />
            <DeckCard title={title} />
            <DeckCard title={title} />
            <DeckCard title={title} />
            <DeckCard title={title} />
          </SimpleGrid>
        </Container>
      </section>
    </Layout>
  );
}

export default App;

export function DeckCard({ title }: { title: string }) {
  return (
    // <Paper withBorder p="md" radius="md">
    <Card
      shadow="sm"
      p="xl"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          height={80}
          alt="No way!"
          hidden
        />
        <Group position="apart">
          <Text size="xs" color="dimmed"></Text>
          <CloseButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </Group>
      </Card.Section>

      <Text weight={500} size="sm">
        {title}
      </Text>

      <Text hidden mt="xs" color="dimmed" size="xs"></Text>
    </Card>
  );
}

const useStyles = createStyles((theme) => ({
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

interface HeaderSearchProps {
  links: { link: string; label: string }[];
}

export function HeaderSearch({
  links,
  setOpened,
  theme,
}: {
  links: HeaderSearchProps['links'];
  setOpened: Dispatch<React.SetStateAction<boolean>>;
  theme: MantineTheme;
}) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

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
            // mr="xl"
          />
        </MediaQuery>

        <Anchor<'a'>
          color="dimmed"
          href={'/'}
          underline={false}
          sx={{ lineHeight: 1 }}
          // onClick={(event) => event.preventDefault()}
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
      </Group>
    </div>
  );
}

/** Layout AppShell.
 *
 * * Alt layout -
 *   To place Navbar and Aside components above Header and Footer, set layout="alt" on AppShell.
 *
 * @see https://mantine.dev/core/app-shell/#responsive-styles
 */
export function Layout({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: 'dark' }}
    >
      {/* To place Navbar and Aside components above Header and Footer, set layout="alt" on AppShell. */}
      <AppShell // https://mantine.dev/core/app-shell/#responsive-styles
        padding="md"
        navbarOffsetBreakpoint="sm"
        layout="default"
        // asideOffsetBreakpoint="sm"
        // style={{ backgroundImage: 'url(/myGrayBackgroundImage.png)' }}
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          }, // prettier-ignore
        })}
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div className="item-center flex h-full">
              <HeaderSearch
                links={[{ label: 'Docs', link: '/docs' }]}
                theme={theme}
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
        }
        navbar={
          <Navbar
            p="xs"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 150, lg: 250 }}
            // className={opened ? '' : 'hidden'}
          >
            <NavLink
              label="Decks"
              icon={<IconStack2 size={16} stroke={1.5} />}
            />
            <NavLink
              label="Cards"
              icon={<IconCards size={16} stroke={1.5} />}
            />
          </Navbar>
        }
        // aside={
        //   <MediaQuery className="hidden" smallerThan="sm" styles={{ display: 'none' }} >
        //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //       <Text>Application sidebar</Text>
        //     </Aside>
        //   </MediaQuery>
        // }
        footer={
          <Footer p="md" height={{ base: '90', sm: '70' }}>
            <FooterCentered
              links={[ { link: '#', label: 'Contact' }, { link: '#', label: 'Privacy' }, { link: '#', label: 'Blog' }, { link: '#', label: 'Store' }, { link: '#', label: 'Careers' }, ]} // prettier-ignore
            />
          </Footer>
        }
      >
        {children}
      </AppShell>
    </MantineProvider>
  );
}

export const BRAND = {
  name: 'flashcarte',
};

const notify = (content: string) =>
  toast(content, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });

const useStylesFooter = createStyles((theme) => ({
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

interface FooterCenteredProps {
  links: { link: string; label: string }[];
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
      {/* <div className={classes.footer}> */}
      <div className={classes.inner}>
        <Flex align="center" justify="center" gap="sm">
          <Anchor<'a'>
            color="dimmed"
            href={'/'}
            sx={{ lineHeight: 1 }}
            // onClick={(event) => event.preventDefault()}
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
      {/* </div> */}
    </>
  );
}
