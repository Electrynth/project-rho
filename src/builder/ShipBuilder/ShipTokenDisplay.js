import { useState } from 'react';
import {
    Slider,
    Typography
} from '@mui/material';

export default function ShipTokenDisplay() {
    const [frontArcVertex, setFrontArcVertex] = useState(145);
    const [frontArcDegrees, setFrontArcDegrees] = useState(35);
    const [rearArcVertex, setRearArcVertex] = useState(145);
    const [rearArcDegrees, setRearArcDegress] = useState(35);

    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <div style={{ display: 'flex', flexFlow: 'row wrap', gap: 8 }}>
                Front Arc Vertex Position
                <Slider
                    valueLabelDisplay="on"
                    step={1}
                    min={0}
                    max={150}
                    value={frontArcVertex}
                    onChange={e => setFrontArcVertex(e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', flexFlow: 'row wrap', gap: 8 }}>
                Front Arc Degrees
                <Slider
                    valueLabelDisplay="on"
                    step={5}
                    min={10}
                    max={180}
                    value={frontArcDegrees}
                    onChange={e => setFrontArcDegrees(e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', flexFlow: 'row wrap', gap: 8 }}>
                Rear Arc Vertex Position
                <Slider
                    valueLabelDisplay="on"
                    step={1}
                    min={0}
                    max={150}
                    value={rearArcVertex}
                    onChange={e => setRearArcVertex(e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', flexFlow: 'row wrap', gap: 8 }}>
                Rear Arc Degrees
                <Slider
                    valueLabelDisplay="on"
                    step={5}
                    min={10}
                    max={180}
                    value={rearArcDegrees}
                    onChange={e => setRearArcDegress(e.target.value)}
                />

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ border: '1px solid white', width: 200, height: 300, position: 'relative' }}>
                    <div style={{ border: '1px solid white', width: 20, height: 60, position: 'absolute', left: 90, top: 120  }} />
                    <div style={{ width: 10, height: 10, backgroundColor: 'red', position: 'absolute', left: 95, top: frontArcVertex, borderRadius: 50 }} />
                    <div style={{ width: 10, height: 10, backgroundColor: 'red', position: 'absolute', left: 95, top: rearArcVertex, borderRadius: 50 }} />
                </div>
            </div>
        </div>
    );
}