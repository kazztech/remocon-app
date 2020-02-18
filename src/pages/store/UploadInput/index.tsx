import React, { useState } from "react";
import {
  makeStyles,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link, RouteComponentProps } from "react-router-dom";
import Axios from "axios";
import ErrorScene from "../../../components/ErrorScene";
import ConnectingScene from "../../../components/ConnectingScene";
import { API_BASE_URL } from "../../../utils/vars";

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1)
  },
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formSubmit: {
    textAlign: "right"
  }
}));

interface RemoconListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ remoconId: string }> {
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
  const remoconId = props.match.params.remoconId;
  const [apiState, setApiState] = React.useState<
    "connecting" | "error" | "success"
  >("connecting");

  const remoconName = props.location.state.remoconName;

  const getPropState = <T extends unknown>(
    propsState: any | undefined,
    property: string,
    defaultValue: T
  ): T => {
    if (typeof propsState === "undefined") return defaultValue;
    if (typeof propsState[property] === "undefined") return defaultValue;
    return propsState[property];
  };

  // 入力値.製品番号
  const [inputProductId, setInputProductId] = useState<string>(
    getPropState<string>(props.location.state, "inputProductId", "")
  );
  const handleInputProductId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputProductId(e.target.value);
  };

  // 入力値.リモコン説明
  const [inputDiscription, setInputDiscription] = useState<string>(
    getPropState<string>(props.location.state, "inputProductId", "")
  );
  const handleInputDiscription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDiscription(e.target.value);
  };

  React.useEffect(() => {
    props.changePage(31002);
  }, []);

  return (
    <>
      <Container className={classes.container}>
        <Grid className={classes.form} container spacing={2}>
          <Grid item xs={12}>
            リモコン名：{remoconName}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="リモコン・製品の型番"
              variant="outlined"
              value={inputProductId}
              onChange={handleInputProductId}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows="4"
              label="リモコンの説明"
              variant="outlined"
              value={inputDiscription}
              onChange={handleInputDiscription}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} className={`${classes.formSubmit}`}>
            <Button
              component={Link}
              to={{
                pathname: `/store/upload/${remoconId}/confirm`,
                state: { remoconName, inputDiscription, handleInputDiscription }
              }}
              color="primary"
              variant="contained"
            >
              次へ
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RemoconList;
