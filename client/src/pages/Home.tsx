import { useState } from 'react';

import {
  Button,
  Center,
  Container,
  Flex,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { DeckCard, fetchAPI, IDeck, TResponseDecks } from '../components/Decks';
import { DndList, TContainerDnD } from '../components/DndList';
import { HeroSection } from '../components/ui/Hero';
import { BRAND } from '../constants/brand.constants';
import { Layout } from '../layout/Layout';
import { toastNotify } from '../helpers/toast-notify.helpers';

function postNewDeck(title: IDeck['title']): Promise<any> {
  return fetch('http://localhost:8080/api/decks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title }),
  }).then((response) => response.json());
} //// .then(async () => { await console.log(`Deck ${newDeckTitle} created`) });

export function Home() {
  const [title, setTitle] = useState<string>('');
  const containers: TContainerDnD[] = ['A', 'B', 'C'];

  /**  Access the client. */
  const queryClient = useQueryClient();

  /** Queries. */
  const query = useQuery({
    queryKey: ['decks'],
    queryFn: () => fetchAPI<TResponseDecks>(`/decks`),
  });

  /** Mutations.
   * @see https://tanstack.com/query/v4/docs/guides/mutations
   * mutationFn: (newTodo) => { return axios.post('/todos', newTodo) }
   */
  const mutationPostDeck = useMutation({
    mutationFn: postNewDeck,
    onSuccess: async (response: { deck: IDeck }) => {
      await queryClient.refetchQueries(['decks'], {});
      await toastNotify(`Deck ${response.deck.title} created`);
      setTitle('');
    },
    onError: async (error: Error) => {
      throw new Error(`Unable to create deck: ${error.message}`, {
        cause: error,
      });
    },
  });

  /**
   * Creates a new deck.
   *
   * @param e The form event.
   */
  async function handleCreateDeck(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Tell HTML to avoid clearing the form.
    mutationPostDeck.mutate(title);
  }

  return (
    <Layout>
      <HomeHero props={{ handleCreateDeck, title, setTitle }} />
      <HomeDecks props={{ query, mutation: mutationPostDeck }} />
      <HomeDnDList props={{ containers }} />
    </Layout>
  );
}

type THomeHeroProps = {
  handleCreateDeck: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

function HomeHero({ props }: { props: THomeHeroProps }): JSX.Element {
  const { handleCreateDeck, title, setTitle } = props;
  return (
    <section id="hero">
      <HeroSection>
        <Container mt={24}>
          <Title hidden order={1}>
            {BRAND.name}
          </Title>
          <form action="submit" onSubmit={(e) => handleCreateDeck(e)}>
            {/* clicking on label with A11Y htmlFor + id allows users to click on label and auto-focus the input. */}
            <Flex
              align={{ md: 'flex-end' }}
              gap={'sm'}
              direction={{ base: 'column', md: 'row' }}
            >
              <TextInput
                label="Deck Title"
                placeholder="Enter the title of your deck"
                className="w-full text-start"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} // prettier-ignore
              />
              <Button variant="gradient" type="submit">
                Create Deck
              </Button>
            </Flex>
          </form>
        </Container>
      </HeroSection>
    </section>
  );
}

// type THomeDecksProps = { };

function HomeDecks({ props }: { props: any }): JSX.Element {
  const { query, mutation } = props;

  return (
    <section id="decks">
      <Container>
        {query.data?.decks.length ? (
          <SimpleGrid
            cols={4}
            spacing="lg"
            breakpoints={[
              { maxWidth: 980, cols: 3, spacing: 'md' },
              { maxWidth: 755, cols: 2, spacing: 'sm' },
              { maxWidth: 600, cols: 2, spacing: 'sm' },
            ]}
          >
            {query.data.decks.map(
              (deck: IDeck, index: number): JSX.Element => (
                <DeckCard
                  key={`deck-${deck._id}}-${index}`}
                  title={deck.title}
                  mutation={mutation}
                />
              ),
            )}
          </SimpleGrid>
        ) : (
          <Text>No decks yet.</Text>
        )}
      </Container>
    </section>
  );
}

type THomeDnDListProps = {
  containers: string[];
};

function HomeDnDList({ props }: { props: THomeDnDListProps }): JSX.Element {
  const { containers } = props;
  return (
    <section>
      <Center>
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
            <DndList containers={containers} />
          </SimpleGrid>
        </Container>
      </Center>
    </section>
  );
}
