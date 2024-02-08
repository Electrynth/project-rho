import { useState } from 'react';
import TextInput from '../common/TextInput';
import { armadaSquadronFontIcons } from 'src/utility';
import SelectorInput from '../common/SelectorInput';

export default function SquadronBuilder({ breakpoints }) {
    const [points, setPoints] = useState(0);
    const [faction, setFaction] = useState('rebels');
    const [maxNumAllowed, setMaxNumAllowed] = useState(0);
    const [specificName, setSpecificName] = useState('');
    const [squadronName, setSquadronName] = useState('');
    const [squadronTemplate, setSquadronTemplate] = useState('');
    const [squadronSpeed, setSquadronSpeed] = useState(2);
    const [squadronHull, setSquadronHull] = useState(0);
    const [squadronIcon, setSquadronIcon] = useState();
    const [abilityText, setAbilityText] = useState('');
    const [vsSquadronArmament, setVsSquadronArmament] = useState([0, 0, 0]);
    const [vsShipArmament, setVsShipArmament] = useState([0, 0, 0]);
    const [firstDefenseToken, setFirstDefenseToken] = useState('');
    const [secondDefenseToken, setSecondDefenseToken] = useState('');

    return (
        <div style={{ display: 'flex', flexFlow: `${breakpoints.lg ? 'row' : 'column'} nowrap`, alignItems: `${breakpoints.lg ? 'flex-start' : 'center'}`, gap: 8 }}>
            <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: 16, margin: 8 }}>
                <SelectorInput
                    fullWidth
                    elementId="squadron-template-input"
                    label="Squadron Template"
                    value={squadronTemplate}
                    handleChange={e => setSquadronTemplate(e.target.value)}
                    items={Object.keys(armadaSquadronFontIcons).sort().map(sqdName => ({ label: sqdName, value: sqdName }))}
                    style={{ width: 240 }}
                />
                <TextInput
                    elementId="squadron-name-input"
                    label="Squadron Ace Name"
                    value={squadronName}
                    handleChange={e => setSquadronName(e.target.value)}
                    style={{ width: 260 }}
                />
                <TextInput
                    elementId="points-input"
                    label="Points"
                    value={points}
                    numberRange={[-999, 999]}
                    handleChange={e => setPoints(e.target.value)}
                    style={{ width: 60 }}
                />
                <SelectorInput
                    elementId="max-allowed-input"
                    label="Max # Allowed"
                    value={maxNumAllowed}
                    handleChange={e => setMaxNumAllowed(e.target.value)}
                    items={[
                        { label: 'Any', value: 0 },
                        { label: '1', value: 1 },
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                    ]}
                    style={{ width: 110 }}
                />
                <SelectorInput
                    elementId="faction-input"
                    label="Faction"
                    value={faction}
                    handleChange={e => setFaction(e.target.value)}
                    items={[
                        { label: 'Any', value: 'any' },
                        { label: 'Rebels', value: 'rebels' },
                        { label: 'Empire', value: 'empire' },
                        { label: 'Republic', value: 'republic' },
                        { label: 'Separatists', value: 'separatists' }
                    ]}
                    style={{ width: 130 }}
                />
                <SelectorInput
                    elementId="squadron-speed-input"
                    label="Speed"
                    value={squadronSpeed}
                    handleChange={e => setSquadronSpeed(e.target.value)}
                    items={[
                        { label: '1', value: 1 },
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                        { label: '5', value: 5 },
                    ]}
                    style={{ width: 60 }}
                />
                <SelectorInput
                    elementId="squadron-hull-input"
                    label="Hull"
                    value={squadronSpeed}
                    handleChange={e => setSquadronHull(e.target.value)}
                    items={[
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                        { label: '5', value: 5 },
                        { label: '6', value: 6 },
                        { label: '7', value: 7 },
                        { label: '8', value: 8 },
                    ]}
                    style={{ width: 60 }}
                />
            </div>
            <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: 16, margin: 8 }}>
                
                
            </div>
        </div>
    );
}