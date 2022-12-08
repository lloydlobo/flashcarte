import {
    AppShell, Autocomplete, Burger, Button, Card, CloseButton, Container, createStyles, Flex, Footer,
    Group, Header, Image, MantineProvider, MantineTheme, MediaQuery, Navbar, NavLink, SimpleGrid, Space,
    Text, TextInput, Title, useMantineTheme
} from '@mantine/core'; // prettier-ignore
import { useDisclosure } from '@mantine/hooks';
import { IconCards, IconSearch, IconStack2 } from '@tabler/icons';
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
      <Group>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => {
              setOpened((o) => !o);
              toggle();
            }}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Flex gap={2} align="start">
          <IconCards size={20} />
          <Text fz={theme.fontSizes.md} fw={700}>
            {BRAND.name}
          </Text>
        </Flex>
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
        // asideOffsetBreakpoint="sm"
        // style={{ backgroundImage: 'url(/myGrayBackgroundImage.png)' }}
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          }, // prettier-ignore
        })}
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
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              <HeaderSearch
                links={[{ label: 'Docs', link: '/docs' }]}
                theme={theme}
                setOpened={setOpened}
              />
              {/* <Text>{BRAND.name}</Text> */}
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
        // aside={
        //   <MediaQuery className="hidden" smallerThan="sm" styles={{ display: 'none' }} >
        //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        //       <Text>Application sidebar</Text>
        //     </Aside>
        //   </MediaQuery>
        // }
        footer={
          <Footer height={60} p="md">
            <Flex align={'center'} gap={4}>
              <Text fz={'xs'}>&copy;</Text>
              <Text>{new Date().getFullYear()}</Text>
              <Text>{BRAND.name}</Text>
            </Flex>
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
