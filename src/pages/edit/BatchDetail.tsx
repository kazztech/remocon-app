import React from 'react';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ListItem, ListItemText, ListItemIcon, Container, makeStyles, List } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    }
}));

const DragHandle = SortableHandle(() => <DragHandleIcon />);

const SortableItem = SortableElement(({ value }: { value: any }) => (
    <ListItem>
        <ListItemIcon>
            <DragHandle />
        </ListItemIcon>
        <ListItemText
            primary={value}
            secondary={"secondary"}
        />
    </ListItem>
));

const XSortableContainer = SortableContainer(({ children }: { children: any }) => {
    return <List component="nav">{children}</List>;
});

interface EditProps {
    changePage(id: number): void
};

const App: React.FC<EditProps> = (props: EditProps) => {
    const classes = styles();
    const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

    const onSortEnd = (() => {
        console.log(items)
        return ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
            setItems(arrayMove(items, oldIndex, newIndex));
        };
    })();

    React.useEffect(() => {
        props.changePage(22002);
    }, []);

    return (
        <Container className={classes.container}>
            <XSortableContainer onSortEnd={onSortEnd} useDragHandle>
                {items.map((value, index) => (
                    <SortableItem key={`item-${value}`} index={index} value={value} />
                ))}
            </XSortableContainer>
        </Container>
    );
}

export default App;
