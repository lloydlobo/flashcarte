import { Anchor, Card, CloseButton, Flex, Title } from '@mantine/core'; //prettier-ignore
import { UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { TDeck } from './Deck.interface';
import { useDeleteDeck } from '../../hooks/api/use-delete-deck-api.hooks';

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
  /** The QueryClient onject used to interact with the cache: */
  const queryClient = useQueryClient();
  /**
   * Hook to handle onClick event to delete deck.
   * @param queryClient The QueryClient object for cache interaction.
   */
  const onClick = useDeleteDeck(queryClient);

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
          {/* <CloseButton size="xs" onClick={onClick} /> */}
          <CloseButton
            size="xs"
            onClick={(e: TButtonMouseEvent) => {
              onClick(e, deck._id);
            }}
          />
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
