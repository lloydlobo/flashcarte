import { ReactNode, useState } from 'react';

import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  useDraggable,
  useDroppable,
  UseDroppableArguments,
} from '@dnd-kit/core';
import { Group, UnstyledButton } from '@mantine/core';

export type TContainerDnD = string;

/**
 * DnDList container for drag and drop.
 * @see https://docs.dndkit.com/introduction/getting-started
 */ // prettier-ignore
export function DndList({ containers, }: { containers: TContainerDnD[] }): JSX.Element {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const handleDragEnd = useSetParentOnDrag(setParent);

  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id, index) => (
        /**
         * Update Droppable component so it would accept an `id` prop and pass
         * it to `useDroppable`
         */
        <Droppable key={`${index}-${id}`} id={id}>
          {parent === id ? draggableMarkup : 'Drop here'}
        </Droppable>
      ))}
    </DndContext>
  );
}

type TSetParent<T = UniqueIdentifier | null> = React.Dispatch<React.SetStateAction<T>>; // prettier-ignore

/**
 * This Hook sets the parent state variable.
 * If the item is dropped over a container, set it as the parent otherwise reset
 * the parent to `null`.
 * @param setParent The function to set the `parent` stateful variable.
 */
function useSetParentOnDrag(
  setParent: TSetParent,
): (event: DragEndEvent) => void {
  return (event: DragEndEvent): void => {
    const { over } = event;
    setParent(over ? over.id : null);
  };
}

type TDroppableProps = {
  id: UseDroppableArguments['id'];
  children: ReactNode;
};

/**
 * Droppable.
 * @param props The properties to beDroppable.
 */
export function Droppable(props: TDroppableProps): JSX.Element {
  const args: UseDroppableArguments = { id: props.id };
  const { isOver, setNodeRef } = useDroppable(args);
  const style = { color: isOver ? 'green' : undefined };

  return (
    <Group ref={setNodeRef} style={style}>
      {props.children}
    </Group>
  );
}

type TDraggableProps = {
  id: UseDroppableArguments['id'];
  children: ReactNode;
};

/**
 * Draggable.
 * @param props The properties to be Draggable.
 */
export function Draggable(props: TDraggableProps): JSX.Element {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <UnstyledButton
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </UnstyledButton>
  );
}
