import { Anchor, Card, CloseButton, Flex, Title } from '@mantine/core'; //prettier-ignore
import { UseMutationResult } from '@tanstack/react-query';

import { TDeck } from './Deck.interface';
import { useMutationDelete } from './Deck.helpers';

export type TButtonMouseEvent = React.MouseEvent<
  HTMLButtonElement,
  globalThis.MouseEvent
>;

/**
 * Component that displays title of deck, and cards.
 * @param mutation The useMutation object.
 * @param deck The deck to delete.
 */
export function Deck<
  T extends TDeck,
  U extends UseMutationResult<any, unknown, string, unknown>,
>({ deck, mutation }: { deck: T; mutation: U }): JSX.Element {
  /**
   * Hook to handle onClick event to delete deck.
   * @param mutation The useMutation object.
   * @param deck The deck to delete.
   */
  const onClick = useMutationDelete(mutation, deck);

  return (
    <Card
      h="100%"
      radius="md"
      shadow="sm"
      p={0} // Helps fix aspect-video.
      className="
      aspect-video
      transition
      duration-100
      ease-out
      hover:shadow-sm
      hover:shadow-blue-400/30
      "
    >
      <Card.Section pos="relative">
        <Flex p={4} pos="absolute" w="100%" justify="end">
          <CloseButton size="xs" onClick={onClick} />
        </Flex>
      </Card.Section>

      <Flex justify="center" h="100%" align="center">
        <Anchor href={`/decks/${deck.title}`} p="sm" miw="41.8%">
          <Title
            order={2}
            size={'h6'}
            align="center"
            className="place-self-center"
          >
            {deck.title}
          </Title>
        </Anchor>
      </Flex>
    </Card>
  );
}
