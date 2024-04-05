import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from '@mui/material';
import { armadaFontIcons } from 'src/utility';
import TabbedContent from '../common/TabbedContent';

function TableCellWithArmadaIcons({ children }) {
    return (
        <TableCell style={{ fontFamily: 'Armada Icons', fontSize: 32 }}>
            {children}
        </TableCell>
    );
}

function TableCellWithAeroMaticsFont({ children }) {
    return (
        <TableCell align="left" style={{ fontFamily: 'Aero Matics Display Bold' }}>
            {children}
        </TableCell>
    );
}

function ArmadaTable({ label, rowData }) {
    return (
        <TableContainer key={label} component={Paper}>
            <Table size="small">
                <TableBody>
                    {rowData.map(rowDatum => (
                        <TableRow key={rowDatum}>
                            <TableCell>{`\`${rowDatum}\``}</TableCell>
                            <TableCellWithArmadaIcons>{armadaFontIcons[rowDatum]}</TableCellWithArmadaIcons>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function MarkupLegend() {

    const legendTables = [
        {
            label: 'Command Icons',
            rowData: ['nav', 'con fire', 'squad', 'repair', 'nav raid', 'con fire raid', 'squad raid', 'repair raid']
        },
        {
            label: 'Squadron Keyword Icons',
            rowData: ['counter', 'grit', 'heavy', 'bomber', 'escort', 'rogue', 'swarm', 'snipe', 'slam', 'adept', 'dodge', 'intel', 'cloak', 'relay', 'assault', 'scout', 'ai', 'screen', 'strategic']
        },
        {
            label: 'Upgrade Icons',
            rowData: ['title', 'commander', 'officer', 'weapons team', 'support team', 'offensive retrofit', 'defensive retrofit', 'turbolasers', 'ion cannons', 'ordnance', 'fleet support', 'fleet command', 'experimental retrofit', 'super weapon']
        },
        {
            label: 'Defense Tokens',
            rowData: ['brace', 'redirect', 'evade', 'contain', 'scatter', 'salvo']
        },
        {
            label: 'Dice Icons',
            rowData: ['hit', 'crit', 'acc']
        }
    ];

    return (
        <TabbedContent
            orientation="vertical"
            tabHeaderItems={[
                { label: 'Basic Markdown' },
                ...legendTables.map(({ label }) => ({ label }))
            ]}
            tabBodyComponents={[
                (
                    <TableContainer key="normal-markdown-table" component={Paper} style={{ width: '100%' }}>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell>*Italic*</TableCell>
                                    <TableCell><em>Italic</em></TableCell>
                                </TableRow>
                                <TableRow> 
                                    <TableCell>**Bold**</TableCell>
                                    <TableCellWithAeroMaticsFont>Bold</TableCellWithAeroMaticsFont>
                                </TableRow>
                                <TableRow> 
                                    <TableCell>***Bolded Italic***</TableCell>
                                    <TableCellWithAeroMaticsFont><em>Bolded Italic</em></TableCellWithAeroMaticsFont>
                                </TableRow>
                                <TableRow> 
                                    <TableCell>* List Item 1 <br/>* List Item 2 <br />* List Item 3</TableCell>
                                    <TableCell><li>List Item 1</li><li>List Item 2</li><li>List Item 3</li></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>`newline##`</TableCell>
                                    <TableCell>Empty new line with line height % (newline10, newline20, newline30, etc)</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>There must be an empty line above and below the line with `newline##`</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>TIP: Use `newline100` for upgrades and `newline50` for squadron cards</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ),
                ...legendTables.map(({ label, rowData }) => <ArmadaTable key={label} label={label} rowData={rowData} />)
            ]}
        />
    );
}