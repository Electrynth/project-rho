import { useRef } from 'react';
import Image from 'next/image.js';
import { toPng } from 'html-to-image';
import {
    armadaFontIcons,
    shipTemplates,
    upgradeTypeIcons,
    armadaShipFontIcons,
    armadaShipFontSizeFactor,
    armadaShipIconOffset
} from 'src/utility.js';
import ArmadaAbilityText from '../common/ArmadaAbilityText.js';
import ArmadaDiceGroup from '../common/ArmadaDiceGroup.js';

function ForegroundImageElement({ alt, src, height, width = 50, top = 0, left = 0, otherStyles }) {
    const style = {
        zIndex: 1,
        position: 'absolute',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: height ? height : undefined,
        width,
        top,
        left,
        ...otherStyles
    };
    return <img alt={alt} src={src.src} style={style} />;
}

function ForegroundWrapperElement({ children, height, width, top, left, otherStyles }) {
    const style = {
        top,
        left,
        width,
        height,
        position: 'absolute',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        ...otherStyles
    };
    return <div style={style}>{children}</div>;
}

export default function ShipCardDisplay({
    sizeMultiplier,
    nameFontSize,
    name,
    traitText,
    maxNumAllowed,
    points,
    faction,
    commandValue,
    squadronValue,
    engineeringValue,
    hullValue,
    squadArmament,
    frontShieldValue,
    frontArmamentValue,
    sideShieldValue,
    sideArmamentValue,
    rearShieldValue,
    rearArmamentValue,
    numTitleSlots,
    numOfficerSlots,
    numWeaponTeamSlots,
    numSupportTeamSlots,
    numOffRetrofitSlots,
    numDefRetrofitSlots,
    numOrdnanceSlots,
    numIonCannonSlots,
    numTurbolaserSlots,
    numFleetCommandSlots,
    numFleetSupportSlots,
    numExperimentalSlots,
    numSuperWeaponSlots,
    defenseTokens,
    maxSpeed,
    speed1Chart,
    speed2Chart,
    speed3Chart,
    speed4Chart,
    shipAvatar,
    uploadedShipPortrait,
    uploadedShipPortraitStyles
}){
    function BackgroundImageLayer({ src, otherStyles }) {
        const style = {
            zIndex: 0,
            width: 450 * sizeMultiplier,
            height: 640 * sizeMultiplier,
            position: 'absolute',
            backgroundSize: 'contain',
            backgroundImage: `url('${src.src}')`,
            ...otherStyles
        };
    
        return <div style={style} />;
    }

    let elementRef = useRef(null);
    const htmlToImageConvert = () => {
        toPng(elementRef.current, { cacheBust: false }).then(dataUrl => {
            const link = document.createElement('a');
            link.download = `${name ? name : 'Unnamed'}.png`;
            link.href = dataUrl;
            link.click();
        }).catch(err => {
            console.error(err);
        });
    }

    const cardElements = [];
    const baseImageKey = "base-image";

    // Ship Name
    cardElements.push(
        <ForegroundWrapperElement key="ship-name" height={40 * sizeMultiplier} width={380 * sizeMultiplier} top={180 * sizeMultiplier} left={60 * sizeMultiplier}>
            <span style={{ zIndex: 1, display: 'flex', flexFlow: 'row nowrap' }}>
                <span style={{ fontSize: (nameFontSize / 2) * sizeMultiplier, fontFamily: 'Armada Icons', color: 'black' }}>
                    {Array(maxNumAllowed).fill().map((_, i) => '\u0078' )}
                </span>
                <ArmadaAbilityText
                    isSquadronText={true}
                    textAlign="center"
                    cardText={name}
                    fontSize={nameFontSize * sizeMultiplier}
                />
            </span>
        </ForegroundWrapperElement>
    );

    // Traits
    cardElements.push(
        <ForegroundWrapperElement key="traits" height={25 * sizeMultiplier} width={210 * sizeMultiplier} top={219 * sizeMultiplier} left={230 * sizeMultiplier} otherStyles={{ justifyContent: 'flex-end' }}>
            <span style={{ zIndex: 1, fontStyle: 'italic' }}>
                <ArmadaAbilityText cardText={traitText} fontSize={13 * sizeMultiplier} />
            </span>
        </ForegroundWrapperElement>
    );

   // Points
   cardElements.push(
    <ForegroundWrapperElement key="points" height={20 * sizeMultiplier} width={50 * sizeMultiplier} top={742 * sizeMultiplier} left={388 * sizeMultiplier}>
        <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Regular', fontStyle: 'normal', fontSize: 20 * sizeMultiplier }}>
            {points}
        </span>
    </ForegroundWrapperElement>
);

    // Hull Value
    cardElements.push(
        <ForegroundWrapperElement key="hull-value" height={50 * sizeMultiplier} width={50 * sizeMultiplier} top={264 * sizeMultiplier} left={78 * sizeMultiplier}>
            <span style={{ zIndex: 1, color: '#e8e4c2', fontFamily: 'Armada Regular', fontStyle: 'normal', fontSize: 50 * sizeMultiplier, display: 'flex', textShadow: '2px 3px 1px #000' }}>
                {hullValue}
            </span>
        </ForegroundWrapperElement>
    );

    // Command Value
    cardElements.push(
        <ForegroundWrapperElement key="command-value" height={25 * sizeMultiplier} width={25 * sizeMultiplier} top={260 * sizeMultiplier} left={257 * sizeMultiplier}>
            <span style={{ zIndex: 1, fontFamily: 'Armada Regular', color: 'black', fontStyle: 'normal', fontSize: 30 * sizeMultiplier, display: 'flex' }}>
                {commandValue}
            </span>
        </ForegroundWrapperElement>
    );

    // Squadron Value
    cardElements.push(
        <ForegroundWrapperElement key="squadron-value" height={25 * sizeMultiplier} width={25 * sizeMultiplier} top={295 * sizeMultiplier} left={257 * sizeMultiplier}>
            <span style={{ zIndex: 1, fontFamily: 'Armada Regular', color: 'black', fontStyle: 'normal', fontSize: 30 * sizeMultiplier, display: 'flex' }}>
                {squadronValue}
            </span>
        </ForegroundWrapperElement>
    );

    // Engineering Value
    cardElements.push(
        <ForegroundWrapperElement key="engineering-value" height={25 * sizeMultiplier} width={25 * sizeMultiplier} top={330 * sizeMultiplier} left={257 * sizeMultiplier}>
            <span style={{ zIndex: 1, fontFamily: 'Armada Regular', color: 'black', fontStyle: 'normal', fontSize: 30 * sizeMultiplier, display: 'flex' }}>
                {engineeringValue}
            </span>
        </ForegroundWrapperElement>
    );

    // Anti Squadron armament
    cardElements.push(
        <ForegroundWrapperElement key="anti-squadron-armament" height={40 * sizeMultiplier} width={40 * sizeMultiplier} top={267 * sizeMultiplier} left={185.5 * sizeMultiplier} otherStyles={{ zIndex: 1 }}>
            <ArmadaDiceGroup diceCounts={squadArmament} height={33 * sizeMultiplier} width={41 * sizeMultiplier} sizeMultiplier={sizeMultiplier} />
        </ForegroundWrapperElement>
    );


    // defense tokens
    const orderedDefenseTokens = [...defenseTokens].sort((a, b) => {
        if (a === '') return 1;
        else if (a === 'scatter') return 1;
        else if (a === 'evade' && b === 'scatter') return 1;
        else if (a === 'brace' && (b === 'scatter' || b === 'evade')) return 1;
        else if (a === 'redirect' && (b === 'scatter' || b === 'evade' || b === 'brace')) return 1;
        else if (a === 'contain' && (b === 'redirect' || b === 'scatter' || b === 'evade' || b === 'brace')) return 1;
        return -1;
    });
    
    let defenseTokenYOffset = -4;
    orderedDefenseTokens.forEach((defenseToken, i) => {
        if (defenseToken === '') return;

        const defenseTokenY = 360 + Math.floor(i / 2) * 45;
        const defenseTokenX = i % 2 === 0 ? 43 : 116;

        cardElements.push(
            <ForegroundWrapperElement key={`${defenseToken}-${i}`} height={40 * sizeMultiplier} width={40 * sizeMultiplier} top={defenseTokenYOffset + defenseTokenY * sizeMultiplier} left={defenseTokenX * sizeMultiplier} otherStyles={{ zIndex: 1 }}>
                <span style={{ zIndex: 1, fontFamily: 'Armada Icons', color: 'white', fontSize: 38 * sizeMultiplier }}>
                    {armadaFontIcons[defenseToken]}
                </span>
            </ForegroundWrapperElement>
        );
    });

    // Shield values
    cardElements.push(
        <ForegroundWrapperElement key="front-shield-value" height={50 * sizeMultiplier} width={50 * sizeMultiplier} top={414 * sizeMultiplier} left={337 * sizeMultiplier}>
            <span style={{ zIndex: 1, color: '#2a5884', fontFamily: 'Armada Regular', fontStyle: 'normal', fontSize: 50 * sizeMultiplier }}>
                {frontShieldValue}
            </span>
        </ForegroundWrapperElement>
    );
    cardElements.push(
        <ForegroundWrapperElement key="left-shield-value" height={50 * sizeMultiplier} width={50 * sizeMultiplier} top={584 * sizeMultiplier} left={219 * sizeMultiplier}>
            <span style={{ zIndex: 1, color: '#2a5884', fontFamily: 'Armada Regular', fontStyle: 'normal', fontSize: 50 * sizeMultiplier }}>
                {sideShieldValue}
            </span>
        </ForegroundWrapperElement>
    );
    cardElements.push(
        <ForegroundWrapperElement key="right-shield-value" height={50 * sizeMultiplier} width={50 * sizeMultiplier} top={584 * sizeMultiplier} left={371 * sizeMultiplier}>
            <span style={{ zIndex: 1, color: '#2a5884', fontFamily: 'Armada Regular', fontStyle: 'normal', fontSize: 50 * sizeMultiplier }}>
                {sideShieldValue}
            </span>
        </ForegroundWrapperElement>
    );
    cardElements.push(
        <ForegroundWrapperElement key="rear-shield-value" height={50 * sizeMultiplier} width={50 * sizeMultiplier} top={653 * sizeMultiplier} left={337 * sizeMultiplier}>
            <span style={{ zIndex: 1, color: '#2a5884', fontFamily: 'Armada Regular', fontStyle: 'normal', fontSize: 50 * sizeMultiplier }}>
                {rearShieldValue}
            </span>
        </ForegroundWrapperElement>
    );


    // Front armament
    cardElements.push(
        <ForegroundWrapperElement key="front-armament" height={40 * sizeMultiplier} width={80 * sizeMultiplier} top={416.5 * sizeMultiplier} left={257 * sizeMultiplier} otherStyles={{ zIndex: 1 }}>
            <ArmadaDiceGroup diceCounts={frontArmamentValue} height={33 * sizeMultiplier} width={41 * sizeMultiplier} sizeMultiplier={sizeMultiplier} />
        </ForegroundWrapperElement>
    );
    // Left armament
    cardElements.push(
        <ForegroundWrapperElement key="left-armament" height={40 * sizeMultiplier} width={80 * sizeMultiplier} top={520 * sizeMultiplier} left={205 * sizeMultiplier} otherStyles={{ zIndex: 1, transform: 'rotate(90deg)' }}>
            <ArmadaDiceGroup diceCounts={sideArmamentValue} height={33 * sizeMultiplier} width={41 * sizeMultiplier} sizeMultiplier={sizeMultiplier} />
        </ForegroundWrapperElement>
    );
    // Right armament
    cardElements.push(
        <ForegroundWrapperElement key="right-armament" height={40 * sizeMultiplier} width={80 * sizeMultiplier} top={520 * sizeMultiplier} left={357 * sizeMultiplier} otherStyles={{ zIndex: 1, transform: 'rotate(90deg)' }}>
            <ArmadaDiceGroup diceCounts={sideArmamentValue} height={33 * sizeMultiplier} width={41 * sizeMultiplier} sizeMultiplier={sizeMultiplier} />
        </ForegroundWrapperElement>
    );
    // Rear armament
    cardElements.push(
        <ForegroundWrapperElement key="rear-armament" height={40 * sizeMultiplier} width={80 * sizeMultiplier} top={655 * sizeMultiplier} left={257 * sizeMultiplier} otherStyles={{ zIndex: 1 }}>
            <ArmadaDiceGroup diceCounts={rearArmamentValue} height={33 * sizeMultiplier} width={41 * sizeMultiplier} sizeMultiplier={sizeMultiplier} />
        </ForegroundWrapperElement>
    );

    // Ship icon
    cardElements.push(
        <ForegroundWrapperElement key="ship-icon" height={25 * sizeMultiplier} width={50 * sizeMultiplier} top={(armadaShipIconOffset[shipAvatar] ? armadaShipIconOffset[shipAvatar] : 0) + 740 * sizeMultiplier} left={30 * sizeMultiplier} otherStyles={{ zIndex: 1 }}>
            <span style={{ fontSize: armadaShipFontSizeFactor[shipAvatar] ? 33 * armadaShipFontSizeFactor[shipAvatar] * sizeMultiplier : 64 * sizeMultiplier, fontFamily: 'Armada Ship Icons', color: 'black' }}>
                {{
                    ...armadaShipFontIcons.rebels,
                    ...armadaShipFontIcons.empire,
                    ...armadaShipFontIcons.republic,
                    ...armadaShipFontIcons.separatists
                }[shipAvatar]}
            </span>
        </ForegroundWrapperElement>
    );

    function ticksToYaw(ticks) {
        if (ticks === 2) return armadaFontIcons['2 yaw'];
        else if (ticks === 1) return armadaFontIcons['1 yaw'];
        else return armadaFontIcons['0 yaw'];
    }

    // Speed chart
    if (maxSpeed === 4) {
        cardElements.push(
            <BackgroundImageLayer
                key="speed4"
                alt="speed4"
                src={shipTemplates.speed4}
                otherStyles={{
                    zIndex: 1,
                    width: sizeMultiplier * 450,
                    height: sizeMultiplier * 804.4
                }}
            />
        );
    } else if (maxSpeed === 3) {
        cardElements.push(
            <BackgroundImageLayer
                key="speed3"
                alt="speed3"
                src={shipTemplates.speed3}
                otherStyles={{
                    zIndex: 1,
                    width: sizeMultiplier * 450,
                    height: sizeMultiplier * 804.4
                }}
            />
        );
    } else if (maxSpeed === 2) {
        cardElements.push(
            <BackgroundImageLayer
                key="speed2"
                alt="speed2"
                src={shipTemplates.speed2}
                otherStyles={{
                    zIndex: 1,
                    width: sizeMultiplier * 450,
                    height: sizeMultiplier * 804.4
                }}
            />
        );
    }

    let speedTickYOffset = -2;

    for (let i = 0; i < maxSpeed; i++) {
        if (i === 0) {
            cardElements.push(
                <ForegroundWrapperElement key="speed-1-1" height={35 * sizeMultiplier} width={35 * sizeMultiplier} top={speedTickYOffset + 623 * sizeMultiplier} left={30 * sizeMultiplier}>
                    <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Icons', fontSize: 21 * sizeMultiplier }}>
                        {ticksToYaw(speed1Chart[0])}
                    </span>
                </ForegroundWrapperElement>
            );
        } else if (i === 1) {
            cardElements.push(
                <ForegroundWrapperElement key="speed-2-1" height={35 * sizeMultiplier} width={35 * sizeMultiplier} top={speedTickYOffset + 583 * sizeMultiplier} left={67 * sizeMultiplier}>
                    <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Icons', fontSize: 21 * sizeMultiplier }}>
                        {ticksToYaw(speed2Chart[1])}
                    </span>
                </ForegroundWrapperElement>
            );
            cardElements.push(
                <ForegroundWrapperElement key="speed-2-2" height={35 * sizeMultiplier} width={35 * sizeMultiplier} top={speedTickYOffset + 623 * sizeMultiplier} left={67 * sizeMultiplier}>
                    <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Icons', fontSize: 21 * sizeMultiplier }}>
                        {ticksToYaw(speed2Chart[0])}
                    </span>
                </ForegroundWrapperElement>
            );
        } else if (i === 2) {
            cardElements.push(
                <ForegroundWrapperElement key="speed-3-1" height={35 * sizeMultiplier} width={35 * sizeMultiplier} top={speedTickYOffset + 543 * sizeMultiplier} left={104 * sizeMultiplier}>
                    <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Icons', fontSize: 21 * sizeMultiplier }}>
                        {ticksToYaw(speed3Chart[2])}
                    </span>
                </ForegroundWrapperElement>
            );
            cardElements.push(
                <ForegroundWrapperElement key="speed-3-2" height={35 * sizeMultiplier} width={35 * sizeMultiplier} top={speedTickYOffset + 583 * sizeMultiplier} left={104 * sizeMultiplier}>
                    <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Icons', fontSize: 21 * sizeMultiplier }}>
                        {ticksToYaw(speed3Chart[1])}
                    </span>
                </ForegroundWrapperElement>
            );
            cardElements.push(
                <ForegroundWrapperElement key="speed-3-2" height={35 * sizeMultiplier} width={35 * sizeMultiplier} top={speedTickYOffset + 623 * sizeMultiplier} left={104 * sizeMultiplier}>
                    <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Icons', fontSize: 21 * sizeMultiplier }}>
                        {ticksToYaw(speed3Chart[0])}
                    </span>
                </ForegroundWrapperElement>
            );
        } else if (i === 3) {
            cardElements.push(
                <ForegroundWrapperElement key="speed-4-1" height={35 * sizeMultiplier} width={35 * sizeMultiplier} top={speedTickYOffset + 503 * sizeMultiplier} left={141 * sizeMultiplier}>
                    <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Icons', fontSize: 21 * sizeMultiplier }}>
                        {ticksToYaw(speed4Chart[3])}
                    </span>
                </ForegroundWrapperElement>
            );
            cardElements.push(
                <ForegroundWrapperElement key="speed-4-2" height={35 * sizeMultiplier} width={35 * sizeMultiplier} top={speedTickYOffset + 543 * sizeMultiplier} left={141 * sizeMultiplier}>
                    <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Icons', fontSize: 21 * sizeMultiplier }}>
                        {ticksToYaw(speed4Chart[2])}
                    </span>
                </ForegroundWrapperElement>
            );
            cardElements.push(
                <ForegroundWrapperElement key="speed-4-3" height={35 * sizeMultiplier} width={35 * sizeMultiplier} top={speedTickYOffset + 583 * sizeMultiplier} left={141 * sizeMultiplier}>
                    <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Icons', fontSize: 21 * sizeMultiplier }}>
                        {ticksToYaw(speed4Chart[1])}
                    </span>
                </ForegroundWrapperElement>
            );
            cardElements.push(
                <ForegroundWrapperElement key="speed-4-4" height={35 * sizeMultiplier} width={35 * sizeMultiplier} top={speedTickYOffset + 623 * sizeMultiplier} left={141 * sizeMultiplier}>
                    <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Icons', fontSize: 21 * sizeMultiplier }}>
                        {ticksToYaw(speed4Chart[0])}
                    </span>
                </ForegroundWrapperElement>
            );
        }
    }

    // Upgrade icons
    const upgradeSlots = [];
    new Array(numOfficerSlots).fill(undefined).forEach(_ => upgradeSlots.push('officer'));
    new Array(numWeaponTeamSlots).fill(undefined).forEach(_ => upgradeSlots.push('weapons team'));
    new Array(numSupportTeamSlots).fill(undefined).forEach(_ => upgradeSlots.push('support team'));
    new Array(numOffRetrofitSlots).fill(undefined).forEach(_ => upgradeSlots.push('offensive retrofit'));
    new Array(numDefRetrofitSlots).fill(undefined).forEach(_ => upgradeSlots.push('defensive retrofit'));
    new Array(numOrdnanceSlots).fill(undefined).forEach(_ => upgradeSlots.push('ordnance'));
    new Array(numIonCannonSlots).fill(undefined).forEach(_ => upgradeSlots.push('ion cannons'));
    new Array(numTurbolaserSlots).fill(undefined).forEach(_ => upgradeSlots.push('turbolasers'));
    new Array(numFleetCommandSlots).fill(undefined).forEach(_ => upgradeSlots.push('fleet command'));
    new Array(numFleetSupportSlots).fill(undefined).forEach(_ => upgradeSlots.push('fleet support'));
    new Array(numExperimentalSlots).fill(undefined).forEach(_ => upgradeSlots.push('experimental retrofit'));
    new Array(numSuperWeaponSlots).fill(undefined).forEach(_ => upgradeSlots.push('super weapon'));

    const upgradeSlotElements = [];
    upgradeSlots.forEach((upgradeType, i) => {
        upgradeSlotElements.push(
            <img
                key={`${upgradeType}-${i}`}
                alt={upgradeType}
                src={upgradeTypeIcons[upgradeType].src}
                style={{
                    height: 23 * sizeMultiplier,
                    width: 23 * sizeMultiplier,
                    borderRadius: 50,
                    backgroundColor: 'white'
                }}
            />
        );
    });
    cardElements.push(
        <ForegroundWrapperElement
            key="upgrade-slots"
            height={34 * sizeMultiplier}
            width={260 * sizeMultiplier}
            top={733 * sizeMultiplier}
            left={93 * sizeMultiplier}
            otherStyles={{
                zIndex: 1,
                display: 'flex',
                flexFlow: 'row nowrap',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 4
            }}
        >
            {upgradeSlotElements}
        </ForegroundWrapperElement>
    );

    // Card Portrait
    console.log(uploadedShipPortraitStyles)
    if (uploadedShipPortrait) {
        cardElements.push(
            <div key="card-portrait" style={{ zIndex: -1, position: 'absolute', width: 450 * sizeMultiplier, height: 804.4 * sizeMultiplier, overflow: 'hidden' }} >
                <img
                    alt="card portrait"
                    src={URL.createObjectURL(uploadedShipPortrait)}
                    width={0}
                    height={0}
                    style={{ ...uploadedShipPortraitStyles }}
                />
            </div>
        );
    }

    // Background image
    cardElements.push(
        <BackgroundImageLayer
            key={baseImageKey}
            src={shipTemplates[faction]}
            otherStyles={{ width: sizeMultiplier * 450, height: sizeMultiplier * 804.4 }}
        />
    );

    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap', width: '100%', alignItems: 'center' }}>
            <div id="image-wrapper" ref={elementRef} style={{ width: sizeMultiplier * 450, height: sizeMultiplier * 804.4, display: 'block', position: 'relative' }}>
                {cardElements}
            </div>
            <button onClick={htmlToImageConvert} style={{ width: sizeMultiplier * 450, marginTop: 8 }}>
                Download Image
            </button>
        </div>
    );
}