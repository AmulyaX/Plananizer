import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import classnames from 'classnames';

import Header from '../Header';
import Sidebar from '../Sidebar';

// pages
import StorageArea from '../../pages/StorageArea';
import Weeklies from '../../pages/Weeklies';
import Monthlies from '../../pages/Monthlies';
import Summary from '../../pages/Summary';

const Layout = ({ classes, isSidebarOpened, toggleSidebar }) => (
  <div className={classes.root}>
    <CssBaseline />
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Sidebar />
        <div className={classnames(classes.content, { [classes.contentShift]: isSidebarOpened })}>
          <div className={classes.fakeToolbar} />
          <Switch>
          <Route path="/app/StorageArea" component={StorageArea} />
          <Route exact path="/app/PresentationDock" render={() => <Redirect to="/app/PresentationDock/Weeklies" />} />
            <Route path="/app/PresentationDock/Weeklies" component={Weeklies} />
            <Route path="/app/PresentationDock/Monthlies" component={Monthlies} />
          <Route path="/app/Summary" component={Summary} />
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  </div>
);

const styles = theme => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    width: `calc(100vw - 240px)`,
    minHeight: '100vh',
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing.unit * 6}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  }
});

export default withStyles(styles)(Layout);
