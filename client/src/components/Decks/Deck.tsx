import { MouseEvent } from 'react';

import {
  Anchor,
  Card,
  Center,
  CloseButton,
  Flex,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';

import { toastNotify } from '../../helpers/toast-notify.helpers';
import { UseMutationResult } from '@tanstack/react-query';
import { TDeck } from './Decks.interface';

//// useCallback( (e) => { e.preventDefault(); mutation(); }, [mutation],)
export function Deck({
  deck,
  mutation,
}: {
  deck: TDeck;
  mutation: UseMutationResult<any, unknown, string, unknown>;
}): JSX.Element {
  function handleCloseClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: TDeck['_id'],
  ): void {
    e.preventDefault();
    mutation.mutate(id);
  }

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
          <CloseButton
            size="xs"
            onClick={(e) => handleCloseClick(e, deck._id)}
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
