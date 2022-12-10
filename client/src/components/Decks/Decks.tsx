import { Card, CloseButton, Image, Text, Title } from '@mantine/core';

export function DeckCard({
  title,
  mutation,
}: {
  title: string;
  mutation: any;
}) {
  return (
    // <Paper withBorder p="md" radius="md">
    <Card
      shadow="sm"
      radius={14}
      p="xl"
      withBorder
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Card.Section px={2} py={2}>
        <Image
          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          height={80}
          alt="No way!"
          hidden
        />
        <div className="grid">
          <CloseButton
            type="button"
            size={'sm'}
            className="items-end place-self-end opacity-40 hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      </Card.Section>

      <Title order={2} size={'h5'} align="center">
        {title}
      </Title>

      <Text hidden mt="xs" color="dimmed" size="xs"></Text>
    </Card>
  );
}
