import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    Grid,
    Button,
    Box,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            alignItems: 'center',
        },
        box: {
            justifyContent: "center",
            alignItems: "center",
            padding: "1%",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: 0
        },
        details: {
            alignItems: 'center',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

export const SearchForm = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper>
                            <Box display="flex" className={classes.box}>
                                <TextField label="キーワード検索" />
                                <Button
                                    startIcon={<SearchIcon />}
                                >
                                    Search
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>絞り込み</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        Age
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        displayEmpty
                                        className={classes.selectEmpty}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    {/* <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="yyyy/MM/dd"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    /> */}
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default SearchForm;