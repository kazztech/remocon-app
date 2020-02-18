import React, { useState, useEffect, Fragment } from "react";
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
  Typography,
  Grid,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Box
} from "@material-ui/core";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link, RouteComponentProps } from "react-router-dom";
import Axios from "axios";

import ErrorScene from "../../components/ErrorScene";
import ConnectingScene from "../../components/ConnectingScene";
import SuccessScene from "../../components/SuccessScene";

import { API_BASE_URL } from "../../utils/vars";

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
  },
  remoconTitle: {
    marginTop: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    width: "100%",
    borderRadius: 0
  },
  editButtonsGrid: {
    marginTop: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1 / 2)
  }
}));

const DragHandle = SortableHandle(() => <DragHandleIcon />);

const SortableItem = SortableElement(
  ({
    mainText,
    subText,
    item
  }: {
    mainText: string;
    subText: string;
    item: any;
  }) => {
    const [selectDeleteItemId, setSelectDeleteItemId] = useState<number | null>(
      null
    );
    const [isOpen, setIsOpen] = useState(false);
    const [isDecision, setIsDecision] = useState(false);
    const [isDialogCon, setIsDialogCon] = useState<
      "connecting" | "error" | "success"
    >("connecting");

    const sendRemoveBatchApi = () => {
      Axios.delete(`${API_BASE_URL}/batches/widgets/${item.batchesWidgetsId}`)
        .then(response => {
          setTimeout(() => {
            setIsDialogCon("success");
          }, 300);
        })
        .catch(error => {
          setIsDialogCon("error");
        });
    };

    return (
      <Fragment>
        <ListItem>
          <ListItemIcon>
            <DragHandle />
          </ListItemIcon>
          <ListItemText primary={mainText} secondary={subText} />
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                setSelectDeleteItemId(item.id);
                setIsOpen(true);
              }}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          aria-labelledby="confirmation-dialog-title"
          open={isOpen}
        >
          {!isDecision ? (
            <Fragment>
              <DialogContent dividers>
                {selectDeleteItemId && item && (
                  <Fragment>ウィジェット: {item.label.text}</Fragment>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  color="default"
                >
                  戻る
                </Button>
                <Button
                  onClick={() => {
                    setIsDecision(true);
                    sendRemoveBatchApi();
                  }}
                  color="primary"
                  variant="contained"
                >
                  決定
                </Button>
              </DialogActions>
            </Fragment>
          ) : (
            <Fragment>
              {isDialogCon === "connecting" && (
                <Box
                  style={{
                    width: 260,
                    height: 220
                  }}
                >
                  <ConnectingScene text={"通信中"} />
                </Box>
              )}
              {isDialogCon === "error" && (
                <Box
                  style={{
                    width: 190,
                    height: 140
                  }}
                >
                  <ErrorScene
                    text="通信に失敗しました"
                    path={`/edit/batches`}
                    btnText="一括操作一覧へ"
                  />
                </Box>
              )}
              {isDialogCon === "success" && (
                <Box
                  style={{
                    width: 260,
                    height: 220
                  }}
                >
                  <SuccessScene
                    text="操作削除が完了しました"
                    path={`/edit/batches/`}
                    btnText="一括操作一覧へ"
                  />
                </Box>
              )}
            </Fragment>
          )}
        </Dialog>
      </Fragment>
    );
  }
);

const XSortableContainer = SortableContainer(
  ({ children }: { children: any }) => {
    return (
      <List component="nav" style={{ width: "100%" }}>
        {children}
      </List>
    );
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
    Axios.get(`${API_BASE_URL}/batches/${batchId}`, {
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
            <Typography className={classes.remoconTitle} variant="h5">
              {batch.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              表示優先度({batch.priority}) ウィジェットの数(
              {batch.widgets.length})
            </Typography>
            <Grid container spacing={1} className={classes.editButtonsGrid}>
              <Grid item xs={6}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  size="large"
                  to={{
                    pathname: `/edit/batches/${batchId}/update/input`,
                    state: {}
                  }}
                  component={Link}
                >
                  <EditIcon className={classes.icon} />
                  {"編集"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  size="large"
                  to={{
                    pathname: `/edit/batches/${batchId}/delete/confirm`,
                    state: {
                      batchName: batch.name,
                      batchPriority: batch.priority,
                      batchWidgetCount: batch.widgets.length
                    }
                  }}
                  component={Link}
                >
                  <DeleteIcon className={classes.icon} />
                  {"削除"}
                </Button>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Typography variant="body1">{batch.name} の操作一覧</Typography>
            <Button
              className={classes.button}
              style={{ marginTop: 4 }}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to={`/edit/batches/${batchId}/add/select`}
            >
              <AddIcon className={classes.icon} />
              操作追加
            </Button>
            <Grid container spacing={1} className={classes.editButtonsGrid}>
              <XSortableContainer onSortEnd={onSortEnd} useDragHandle>
                {items.map((item, index) => (
                  <SortableItem
                    key={`item-${item.id}`}
                    index={index}
                    mainText={item.label.text}
                    subText={item.remocon.name}
                    item={item}
                  />
                ))}
              </XSortableContainer>
            </Grid>
          </>
        )}
    </Container>
  );
};

export default Component;
