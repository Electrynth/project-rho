import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

function TabPanel({ children, ...other  }) {
    return (
        <div role="tabpanel" {...other}>
            <div style={{ marginTop: 20 }} />
            {children}
        </div>
    );
}

export default function TabbedContent({
    orientation = 'horizontal',
    tabHeaderItems = [], // { key, label }
    tabBodyComponents = [] // components
}) {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: orientation === 'horizontal' ? 'block' : 'flex' }}>
                <Tabs
                    visibleScrollbar
                    allowScrollButtonsMobile
                    variant="scrollable"
                    orientation={orientation}
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                >
                    {tabHeaderItems.map(({ key, label }) => (
                        <Tab key={key ? key : label} label={label} />
                    ))}
                </Tabs>
                <TabPanel style={{ width: '100%' }}>
                    {tabBodyComponents.filter((_, i) => (i === activeTab))}
                </TabPanel>
            </Box>
        </Box>
    );
}