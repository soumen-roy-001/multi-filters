import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Button,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        padding: 32
    },
    gridContainer: {
        alignItems: "center",
        marginBottom: 8
    },
    actionButtons: {
        display: "flex"
    },
    detailsRoot: {
        padding: 16,
        textAlign: "left"
    },
    topSpacing: {
        marginTop: 8
    }
}));

const categories = [
    {
        value: "properties",
        title: "Properties"
    }, {
        value: "formulation_components",
        title: "Formulation Components"
    }
]

const subcategories = {
    properties: ["hardness_ShoreA"],
    formulation_components: ["taic_100_pct_liquid"]
}

const operators = [
    {
        name: "=",
        value: "eq"
    },
    {
        name: ">",
        value: "gt"
    },
    {
        name: ">=",
        value: "gte"
    },
    {
        name: "<",
        value: "lt"
    },
    {
        name: "<=",
        value: "lte"
    },
];

const FormulaDetails = ({ details }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.detailsRoot}>
            <Typography variant="h6">{details.polymer_name}</Typography>
            <List >
                <ListItem>
                    <ListItemText primary="Base Material" />
                    <ListItemSecondaryAction>{details.base_material}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
            </List>
            <Typography variant="h6" className={classes.topSpacing}>Cure Conditions</Typography>
            <Divider />
            <List >
                <ListItem>
                    <ListItemText primary="Post Cure - Temperature( degree C)" />
                    <ListItemSecondaryAction>{details.cure_conditions.post_cure_degC}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Post Cure - Time( Hrs)" />
                    <ListItemSecondaryAction>{details.cure_conditions.post_cure_timeHrs}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Press Cure - Temperature( degree C)" />
                    <ListItemSecondaryAction>{details.cure_conditions.press_cure_degC}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Press Cure - Time( Min)" />
                    <ListItemSecondaryAction>{details.cure_conditions.press_cure_timeMin}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
            </List>
            <Typography variant="h6" className={classes.topSpacing}>Formulation Components</Typography>
            <Divider />
            <List >
                <ListItem>
                    <ListItemText primary="MT-Carbon(N990)" />
                    <ListItemSecondaryAction>{details.formulation_components.mt_carbon_n990}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Perkadox 14 (100%)" />
                    <ListItemSecondaryAction>{details.formulation_components.perkadox_14_100_pct}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Polymer" />
                    <ListItemSecondaryAction>{details.formulation_components.polymer}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Sodium Stearate" />
                    <ListItemSecondaryAction>{details.formulation_components.sodium_stearate}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="TAIC (100%) Liquid" />
                    <ListItemSecondaryAction>{details.formulation_components.taic_100_pct_liquid}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Formula ID" />
                    <ListItemSecondaryAction>{details.formulation_id}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
            </List>
            <Typography variant="h6" className={classes.topSpacing}>Properties</Typography>
            <Divider />
            <List>
                <ListItem>
                    <ListItemText primary="100% Modulus (MPa)" />
                    <ListItemSecondaryAction>{details.properties._100pct_modulus_MPa}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                    <ListItemText primary="Compression Set (%) (200 C and 70 Hrs)" />
                    <ListItemSecondaryAction>{details.properties.compression_set_pct_200degC_X_70hrs}</ListItemSecondaryAction>
                </ListItem>
                <Divider variant="middle" component="li" />
            </List>

        </Paper>
    )
}

const FilterBox = () => {
    const classes = useStyles();
    const inputs = { category: "", subcategory: "", operator: "", uservalue: "" };
    const [filterRows, setFilterRows] = useState([inputs]);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [resultErr, setResultErr] = useState("");
    const [currRow, setCurrRow] = useState(null);
    const [isSelected, setIsSelected] = useState("");

    const handleClickRow = (details) => {
        // console.log(details);
        setCurrRow(details);
        setIsSelected(details.formulation_id);
    }

    const handleAddFilter = () => {
        setFilterRows([...filterRows, inputs])
    }
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const rows = [...filterRows];
        rows[index][name] = value;
        setFilterRows(rows);
    };
    const handleRemoveRow = (index) => {
        const rows = [...filterRows];
        rows.splice(index, 1);
        setFilterRows(rows);
    }
    const handleSearch = () => {
        // console.log(filterRows);
        setIsLoading(true);
        setCurrRow(null);
        setResults([]);
        const filter_array = filterRows.map(rowInput => {
            // if (rowInput.category && rowInput.subcategory && rowInput.operator && rowInput.uservalue)
            return `${rowInput.category}.${rowInput.subcategory},${rowInput.operator},${rowInput.uservalue}`;

        });
        const payload = {
            // filter_array: ["properties.hardness_ShoreA,eq,76", "formulation_components.taic_100_pct_liquid,gt,1"],
            filter_array: filter_array,
            token: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiUGxFbnRfMzJTMVg0SVBETSJ9.AeyvpOYjOJrcsZasgno71jJ3pxlRAetYzn_y74feSbXsYWJzJADnhLP9mJ6T-DjbnwmWZgwXrG0vQNDXSx7GyA",
            user_id: "PlEnt_32S1X4IPDM"
        };
        fetch("https://api.sandbox.polymerize.io/v1/data/_filter", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(payload) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setIsLoading(false);
                if (data.result.error)
                    setResultErr(data.result.error);
                else {
                    setResultErr("");
                    if (data.result.formulation_data === null)
                        setResultErr(data.result.message);
                    if (data.result.formulation_data.length === 0)
                        setResultErr("No data found.");
                    else
                        setResults(data.result.formulation_data);
                }
            })
            .catch(err => {
                // console.log(err);
                setResultErr(err);

            })
    }


    return (
        <div className={classes.root}>
            {filterRows.map((input, i) =>
                <Grid container key={`row-${i}`} spacing={0} className={classes.gridContainer}>
                    <Grid item xs={2}>
                        <TextField
                            select
                            fullWidth
                            label="Category"
                            name="category"
                            value={input.category}
                            onChange={e => handleChange(e, i)}
                            variant="outlined"
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            select
                            fullWidth
                            label="Sub Category"
                            name="subcategory"
                            value={input.subcategory}
                            onChange={e => handleChange(e, i)}
                            variant="outlined"
                        >
                            {subcategories[input.category] && subcategories[input.category].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            select
                            fullWidth
                            label="Operator"
                            name="operator"
                            value={input.operator}
                            onChange={e => handleChange(e, i)}
                            variant="outlined"
                        >
                            {operators.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            label="Value"
                            name="uservalue"
                            value={input.uservalue}
                            onChange={e => handleChange(e, i)}
                            type="text"
                            fullWidth variant="outlined" />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={() => handleRemoveRow(i)}>Remove</Button>
                    </Grid>
                </Grid>

            )}
            <div className={classes.actionButtons}>
                <Button variant="contained" color="primary" onClick={handleAddFilter} style={{ marginRight: 5 }}>Add Filter</Button>
                {filterRows.length > 0 &&
                    <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
                }
            </div>
            {isLoading
                ? <div>Loading...</div>
                :
                <div>
                    <Typography>
                        {resultErr}
                    </Typography>


                    {results.length > 0 &&
                        <Grid container spacing={1}>
                            <Grid item xs={7}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Formulation Id</TableCell>
                                                <TableCell align="right">Polymer Brand</TableCell>
                                                <TableCell align="right">Grade</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {results.map((row) => (
                                                <TableRow
                                                    key={row.formulation_id}
                                                    onClick={() => handleClickRow(row)}
                                                    hover

                                                    selected={isSelected === row.formulation_id ? true : false}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.formulation_id}
                                                    </TableCell>
                                                    <TableCell align="right">{row.polymer_name}</TableCell>
                                                    <TableCell align="right">{row.base_material}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={5}>
                                {currRow !== null &&
                                    <FormulaDetails details={currRow} />
                                }
                            </Grid>
                        </Grid>

                    }
                </div>

            }

        </div>
    )
}
export default FilterBox;