import React, { useState, useEffect } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  makeStyles,
  List,
  Button,
  Typography
} from "@material-ui/core";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { Link, RouteComponentProps } from "react-router-dom";
import Axios from "axios";

import ErrorScene from "../../components/ErrorScene";
import ConnectingScene from "../../components/ConnectingScene";

type BatchWidget = {
  id: number;
  label: {
    text: string;
    color: string;
  };
  icon: {
    style: string;
    color: string;
  };
  position: {
    x: number;
    y: number;
  };
  remocon: {
    name: string;
    priority: number;
  };
};

type Batch = {
  id: number;
  name: string;
  priority: number;
  widgets: BatchWidget[];
};

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1)
  }
}));

const DragHandle = SortableHandle(() => <DragHandleIcon />);

const SortableItem = SortableElement(
  ({ mainText, subText }: { mainText: string; subText: string }) => (
    <ListItem>
      <ListItemIcon>
        <DragHandle />
      </ListItemIcon>
      <ListItemText primary={mainText} secondary={subText} />
    </ListItem>
  )
);

const XSortableContainer = SortableContainer(
  ({ children }: { children: any }) => {
    return <List component="nav">{children}</List>;
  }
);

interface EditProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ batchId: string }> {
  changePage(id: number): void;
}

const Component: React.FC<EditProps> = props => {
  const batchId = props.match.params.batchId;
  const classes = styles();
  const [batch, setBatch] = useState<Batch | null>(null);
  const [apiState, setApiState] = React.useState<
    "connecting" | "error" | "success"
  >("connecting");
  const [items, setItems] = React.useState<BatchWidget[]>([]);

  const onSortEnd = (() => {
    console.log(items);
    return ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      setItems(arrayMove(items, oldIndex, newIndex));
    };
  })();

  React.useEffect(() => {
    props.changePage(22002);
    Axios.get(`http://192.168.3.200:3000/api/v1/batches/${batchId}`, {
      timeout: 5000
    })
      .then(response => {
        setTimeout(() => {
          setBatch(response.data.content);
          console.log(response.data.content);
          setApiState("success");
        }, 300);
      })
      .catch(error => {
        setApiState("error");
      });
  }, []);

  useEffect(() => {
    if (batch !== null) setItems(batch.widgets);
  }, [batch]);

  return (
    <Container className={classes.container}>
      {apiState === "connecting" && <ConnectingScene text={""} {...props} />}
      {apiState === "error" && (
        <ErrorScene
          text="通信に失敗しました"
          path={`/edit`}
          btnText="設定画面へ"
          {...props}
        />
      )}
      {apiState === "success" &&
        typeof batch !== "undefined" &&
        batch !== null && (
          <>
            <Typography variant="h5">{batch.name}</Typography>
            <Button
              component={Link}
              to={`/edit/batches/${batchId}/add/select/remocon`}
              color="primary"
              variant="contained"
              fullWidth
            >
              ADD
            </Button>
            <XSortableContainer onSortEnd={onSortEnd} useDragHandle>
              {items.map((item, index) => (
                <SortableItem
                  key={`item-${item.id}`}
                  index={index}
                  mainText={item.label.text}
                  subText={item.remocon.name}
                />
              ))}
            </XSortableContainer>
          </>
        )}
    </Container>
  );
};

export default Component;
