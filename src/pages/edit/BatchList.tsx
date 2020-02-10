import React from "react";
import {
  makeStyles,
  Container,
  Button,
  ListItem,
  ListItemText,
  Divider,
  List
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link, RouteComponentProps } from "react-router-dom";
import Axios from "axios";
import ErrorScene from "../../components/ErrorScene";
import ConnectingScene from "../../components/ConnectingScene";

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1)
  },
  lists: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  addButton: {
    width: "100%",
    borderRadius: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1 / 2)
  }
}));

interface RemoconListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps {
  changePage(id: number): void;
}
interface RemoconsProps {
  id: number;
  name: string;
  priority: number;
  widgets: {}[];
}
const RemoconList: React.FC<RemoconListProps> = (props: RemoconListProps) => {
  const classes = styles();
  const [apiState, setApiState] = React.useState<
    "connecting" | "error" | "success"
  >("connecting");
  const [batches, setBatches] = React.useState<Array<RemoconsProps>>([]);

  React.useEffect(() => {
    props.changePage(22001);

    Axios.get("http://192.168.3.200:3000/api/v1/batches", { timeout: 5000 })
      .then(response => {
        setTimeout(() => {
          setBatches(response.data.content.batches);
          setApiState("success");
        }, 300);
      })
      .catch(error => {
        setApiState("error");
      });
  }, []);

  return (
    <>
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
        {apiState === "success" && (
          <>
            <Button
              className={classes.addButton}
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/edit/batches/create/input"
            >
              <AddIcon className={classes.icon} />
              新規作成
            </Button>
            <List>
              {batches.map((batch, index) => (
                <React.Fragment key={index}>
                  <Divider />
                  <ListItem
                    alignItems="flex-start"
                    button
                    component={Link}
                    to={"/edit/batches/" + batch.id}
                  >
                    <ListItemText
                      primary={batch.name}
                      secondary={
                        <React.Fragment>
                          表示優先度({batch.priority}) 操作数(
                          {batch.widgets.length})
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
              <Divider />
            </List>
          </>
        )}
      </Container>
    </>
  );
};

export default RemoconList;
