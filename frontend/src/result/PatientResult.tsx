import * as React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./PatientResult.css";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    isHidden: boolean;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className={"panel".concat(props.isHidden ? " hidden" : "")}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function PatientResult(props: {isOpen: boolean, setOpen: (o: boolean) => void, name: string}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
            <Box sx={{flexGrow: props.isOpen ? 1 : 0, bgcolor: 'background.paper', display: 'flex', height: "75vh"}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                onClick={() => props.name === "Open" ? props.setOpen(true) : props.setOpen(false)}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
                <Tab label="Item Five" {...a11yProps(4)} />
                <Tab label="Item Six" {...a11yProps(5)} />
                <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
            <TabPanel isHidden={!props.isOpen} value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel isHidden={!props.isOpen} value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel isHidden={!props.isOpen} value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel isHidden={!props.isOpen} value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel isHidden={!props.isOpen} value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel isHidden={!props.isOpen} value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel isHidden={!props.isOpen} value={value} index={6}>
                Item Seven
            </TabPanel>
        </Box>
    );
}

