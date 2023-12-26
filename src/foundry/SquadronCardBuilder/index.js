import robotoCondensed from "config/font";
export default function SquadronCardBuilder() {
    return (
        <div style={{ width: '100%', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', marginTop: 36 }}>
            <span className={robotoCondensed.className} style={{ fontSize: 36 }}>Coming soon!</span>
        </div>
    );
}