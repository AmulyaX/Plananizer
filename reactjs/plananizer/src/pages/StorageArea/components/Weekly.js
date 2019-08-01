import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import { TextField, Grid } from '@material-ui/core';
import Axios from 'axios'
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import getDay from "date-fns/getDay";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(10),
    minWidth: 300,
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function DialogSelect() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    type: '',
    startDate: new Date(),
    endDate: new Date(),
    startDT: [],
    endDT: [],
    amt: '',
    totalSalary: '',
    grocery:'',
    emi: '',
    shopping: '',
    personal: '',
    extraSavings: ''
  });

  const dynamicParm = ["totalSalary", "grocery", "emi", "shopping", "personal", "extraSavings"]
  const handleChange = name => event => {
    setState({ ...state, [name]: Number(event.target.value) });
    console.log(event.target.value)
  };

  function handleClickOpen() {
    setState({ ...state, open: true });
  }

  function handleClose() {
    setState({ ...state, open: false });
  }

  function pushData(){
    var dt = []
    dt = {"id": state.startDT+"-"+state.endDT, "amt": state.totalSalary, "grocery": state.grocery, "emi":state.emi, "shopping": state.shopping, "personal": state.personal, "extraSavings": state.extraSavings}
    Axios.post('http://localhost:8080', dt)
    .then(function(res){
      console.log(res)
    })
  }

  function handleCloseOk() {
    setState({ ...state, open: false });
    pushData()
  }

  function handleStartDateChange(date){
    var tmp = format(date, "dd/MM/yyyy", { awareOfUnicodeTokens: true })
    setState({
      ...state,
      open: true,
      startDate: date,
      startDT: tmp
    })
  }

    function handleEndDateChange(date){
        var tmp = format(date, "dd/MM/yyyy", { awareOfUnicodeTokens: true })
        setState({
          ...state,
          open: true,
          endDate: date,
          endDT: tmp
        })
    }

    function handleInput(tmp){
        setState({
          ...state,
          amt: tmp
        })
    }

    function handleFabClick(){
      var tmp = dynamicParm[state.type]
      setState({
        ...state,
        type:'',
        [tmp]: state.amt,
      })
      }

      function WeekStart(date){
        const day = getDay(date);
        return day === 0;
      };

      function WeekEnd(date){
        const day = getDay(date);
        return day === 6;
      };

  return (
    <div>
      <Button onClick={handleClickOpen}><Typography variant="h5" component="h2" gutterBottom='true'>Store Data for a particular <strong>Week</strong></Typography></Button>
      <Dialog disableBackdropClick disableEscapeKeyDown fullScreen open={state.open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <Grid container spacing={32} alignItems="center" justify="center">
              <Grid item xs={12} md={6} lg={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="type-native-simple">Start Date</InputLabel>
                  <DatePicker 
                    selected={state.startDate}
                    onChange={handleStartDateChange}
                    dateFormat="dd/MM/yyyy"
                    filterDate={WeekStart} />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="type-native-simple">End Date</InputLabel>
                  <DatePicker 
                    selected={state.endDate}
                    onChange={handleEndDateChange}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="dd/MM/yyyy"
                    filterDate={WeekEnd} />
                </FormControl>
              </Grid>
            </Grid>
          <Grid container spacing={32} alignItems="center" justify="center">
            <Grid item xs={12} md={6} lg={4}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type-simple">Type</InputLabel>
              <Select
                value={state.type}
                onChange={handleChange('type')}
                input={<Input id="type-simple" />}
              >
                <MenuItem value={0}>Total Salary</MenuItem>
                <MenuItem value={1}>Grocery</MenuItem>
                <MenuItem value={2}>EMI</MenuItem>
                <MenuItem value={3}>Shopping</MenuItem>
                <MenuItem value={4}>Personal</MenuItem>
                <MenuItem value={5}>Extra Saving</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <FormControl className={classes.formControl}>
              <TextField
                id="input-amt"
                label="Enter amount"
                onChange={val => handleInput(val.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Fab onClick={handleFabClick} variant="extended" aria-label="Delete" className={classes.fab}>
                <NavigationIcon className={classes.extendedIcon} />
                  Push
                </Fab></Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }