import React from 'react';
import { makeStyles, Button, Box, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Link, LinkProps, withRouter, RouteComponentProps } from 'react-router-dom';
import { getRootPageById } from "../routes";

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import SettingsRemoteRoundedIcon from '@material-ui/icons/SettingsRemoteRounded';

const styles = makeStyles({
    content: {}
});

const RefLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref as any} {...props} />
));

interface AppFooterProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps {
    currentPageId: number
};

const AppFooter: React.FC<AppFooterProps> = (props: AppFooterProps) => {
    const classes = styles();
    const [currentPageId, setCurrentPageId] = React.useState<number>(props.currentPageId);

    React.useEffect(() => {
        const rootPageId = getRootPageById(props.currentPageId);
        setCurrentPageId(rootPageId)
    });

    return (
        <Box className={`${classes.content} ${props.className}`}>
            <BottomNavigation
                value={currentPageId}
                showLabels
                onChange={(e, v) => {
                    setCurrentPageId(v);
                }}
            >
                <BottomNavigationAction
                    label="リモコン"
                    value={10001}
                    icon={<SettingsRemoteRoundedIcon />}
                    component={RefLink}
                    to="/controller"
                />
                <BottomNavigationAction
                    label="編集"
                    value={20001}
                    icon={<EditRoundedIcon />}
                    component={RefLink}
                    to="/edit"
                />
                <BottomNavigationAction
                    label="ストア"
                    value={30001}
                    icon={<GetAppRoundedIcon />}
                    component={RefLink}
                    to="/store"
                />
                <BottomNavigationAction
                    label="設定"
                    value={40001}
                    icon={<SettingsRoundedIcon />}
                    component={RefLink}
                    to="/setting"
                />
            </BottomNavigation>
        </Box>
    );
}

export default withRouter(AppFooter);
