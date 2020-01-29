import React, { useState, Fragment } from 'react';
import { makeStyles, Container, List, Divider, ListItem, ListItemText, ListItemSecondaryAction, Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';

import db from "../../../firebase";
import ConnectingScene from '../../../components/ConnectingScene';
import ErrorScene from '../../../components/ErrorScene';


const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1)
  }
}));
interface StoreProps
  extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{ storeId: string }> {
  changePage(id: number): void
};
const Store: React.FC<StoreProps> = (props: StoreProps) => {
  const storeId = props.match.params.storeId;
  const classes = styles();
  const [storeConState, setStoreConState] = React.useState<"connecting" | "error" | "success">("connecting");
  const [remocon, setRemocon] = useState<any>(null);

  React.useEffect(() => {
    props.changePage(30002);
    db.doc(storeId).get().then(d => {
      setTimeout(() => {
        setRemocon(d.data());
        setStoreConState("success");
      }, 300);
    }).catch(error => {
      setStoreConState("error");
    });
  }, []);

  return (
    <>
      <Container className={classes.container}>
        {storeConState === "connecting" && (
          <ConnectingScene text={""} {...props} />
        )}
        {storeConState === "error" && (
          <ErrorScene
            text="通信に失敗しました"
            path={`/edit`}
            btnText="設定画面へ"
            {...props}
          />
        )}
        {storeConState === "success" && (
          <>
            <Typography variant="h5">{remocon.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              {remocon.description}
            </Typography>
          </>
        )}
      </Container>
    </>
  );
}

export default Store;
