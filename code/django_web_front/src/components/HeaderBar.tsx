import { Theme, makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import { windowDimension } from "../Interfaces";
import { useMediaQueryContext } from 'src/App';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { Action } from "../App";

type OwnProps = {
    dispatch: React.Dispatch<Action>
    state: any
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        link: {
            flexGrow: 1,
        },
    }),
);

const HeaderBar: React.FC<OwnProps> = (props: OwnProps) => {

    const classes = useStyles();

    const deviceType = useMediaQueryContext();

    //ウィンドウの大きさを変更するためのイベントを追加しておく
    window.addEventListener("resize", () => {
        const currentWindow: windowDimension = {
            height: window.innerHeight,
            width: window.innerWidth
        }
        //Stateを更新

    });

    //メニュー部用の配列
    const menuItems = ["Top", "Live", "Box", "Blog"];

    /** メニューを閉じる */
    const handleMenuViewClose = () => {

    }
    /** メニューを開ける */
    const handleMenuViewOpen = (event: React.MouseEvent<HTMLInputElement>) => {

    }

    const StyledMenu = withStyles({
        paper: {
            border: '1px solid #d3d4d5',
        },
    })(() => (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            id="header-menu"
            anchorEl={props.state.menunchorEl}
            keepMounted
            open={Boolean(props.state.menunchorEl)}
            onClose={handleMenuViewClose}
        />
    ));

    const StyledMenuItem = withStyles((theme) => ({
        root: {
            '&:focus': {
                backgroundColor: theme.palette.primary.main,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.common.white,
                },
            },
        },
    }))(MenuItem);

    /** Mobile用のエレメント */
    const renderMenu = (
        <React.Fragment>
            <IconButton color="inherit" className={classes.menuButton} onClick={handleMenuViewOpen}>
                <MenuIcon />
            </IconButton>
            <StyledMenu>
                {menuItems.map((value, index) =>
                    <MenuItem
                        onClick={handleMenuViewClose}
                        key={index}
                        component={Link}
                        to={`/${value}`}
                    >
                        {value}
                    </MenuItem>
                )}
            </StyledMenu>
        </React.Fragment>
    )

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit" aria-label="menu">
                <Toolbar>
                    {(deviceType.isPcSite) &&
                        <React.Fragment>
                            {menuItems.map((value, index) =>
                                <Button
                                    color="inherit"
                                    className={classes.link}
                                    onClick={handleMenuViewClose}
                                    key={index}
                                    component={Link}
                                    to={`/${value}`}
                                >
                                    {value}
                                </Button>
                            )}
                        </React.Fragment>
                    }
                    {(deviceType.isMobileSite || deviceType.isTabletSite) &&
                        <React.Fragment>
                            {renderMenu}
                            <Button color="inherit">Top</Button>
                        </React.Fragment>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default HeaderBar;