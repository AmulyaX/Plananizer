import React from 'react';
import {
  Drawer,
  IconButton,
  List,
  withStyles } from "@material-ui/core";
import {
  CloudUpload as Storage,
  ArrowBack as ArrowBackIcon,
  SlowMotionVideo as Present,
  Timer as Time,
} from "@material-ui/icons";
import classNames from 'classnames';

import SidebarLink from './components/SidebarLink/SidebarLinkContainer';

const structure = [
  { id: 0, label: 'Storage Area', link: '/app/StorageArea', icon: <Storage /> },
  {
    id: 1,
    label: 'Presentation Dock',
    link: '/app/PresentationDock',
    icon: <Present />,
    children: [
      { label: 'Weeklies', link: '/app/PresentationDock/Weeklies' },
      { label: 'Monthlies', link: '/app/PresentationDock/Monthlies' }
    ],
  },
  { id: 2, label: 'Summary', link: '/app/Summary', icon: <Time /> },
  { id: 3, type: 'divider' },
];

const SidebarView = ({ classes, theme, toggleSidebar, isSidebarOpened, isPermanent, location }) => {
  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton
          onClick={toggleSidebar}
        >
          <ArrowBackIcon classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => <SidebarLink key={link.id} location={location} isSidebarOpened={isSidebarOpened} {...link} />)}
      </List>
    </Drawer>
  );
}

const drawerWidth = 240;

const styles = theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 40,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 1,
  },
  sidebarList: {
    marginTop: theme.spacing.unit * 6,
    marginLeft: -20
  },
  mobileBackButton: {
    marginTop: theme.spacing.unit * .5,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing.unit * .625,
    },
    [theme.breakpoints.up("md")]: {
      display: 'none',
    }
  }
});

export default withStyles(styles, { withTheme: true })(SidebarView);
