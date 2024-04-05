import { useRef } from 'react';
import Image from 'next/image.js';
import { toPng } from 'html-to-image';
import {
    squadronTemplateImages,
    armadaFontIcons,
    armadaSquadronFontIcons,
    armadaSquadronFontSizeFactor,
    armadaSquadronIconOffset
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

export default function SquadronCardDisplay({
    points,
    faction,
    squadronName,
    squadronChassis,
    chassisIconYOffset,
    squadronHull,
    squadronIcon,
    squadronSpeed,
    maxNumAllowed,
    firstDefenseToken,
    secondDefenseToken,
    sizeMultiplier,
    cardText,
    cardTextFontSize,
    chassisTextFontSize,
    vsSquadronArmament,
    vsShipArmament,
    uploadedImage,
    uploadedImageStyles
}) {
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

    const cardElements = [];
    const baseImageKey = "base-image";

    let numDefenseTokens = 0;
    if (firstDefenseToken !== 'none') numDefenseTokens += 1;
    if (secondDefenseToken !== 'none') numDefenseTokens += 1;

    if (numDefenseTokens === 2) {
        cardElements.push(<BackgroundImageLayer key={baseImageKey} src={squadronTemplateImages[faction].ace2} />);
    } else if (numDefenseTokens === 1) {
        cardElements.push(<BackgroundImageLayer key={baseImageKey} src={squadronTemplateImages[faction].ace1} />);
    } else if (numDefenseTokens === 0 && squadronName !== '') {
        cardElements.push(<BackgroundImageLayer key={baseImageKey} src={squadronTemplateImages[faction].ace0} />);
    } else {
        cardElements.push(<BackgroundImageLayer key={baseImageKey} src={squadronTemplateImages[faction].generic} />);
    }


    // Squad Name
    if (squadronName) {
        cardElements.push(
            <ForegroundWrapperElement key="squadron-name" height={45 * sizeMultiplier} width={450 * sizeMultiplier} top={188 * sizeMultiplier} left={8 * sizeMultiplier}>
                <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Regular', fontStyle: 'normal', fontSize: 38 * sizeMultiplier, display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 2, fontSize: 24 * sizeMultiplier, fontFamily: 'Armada Icons', color: 'black' }}>{Array(maxNumAllowed).fill().map((_, i) => '\u0078' )}</span>
                    {squadronName}
                </span>
            </ForegroundWrapperElement>
        );
    }

    cardElements.push(
        <ForegroundWrapperElement key="squadron-chassis" height={45 * sizeMultiplier} width={450 * sizeMultiplier} top={235 * sizeMultiplier} left={8 * sizeMultiplier}>
            <span style={{ zIndex: 1 }}>
                <ArmadaAbilityText isSquadronText={true} textAlign="left" cardText={squadronChassis} fontSize={chassisTextFontSize * sizeMultiplier} />
            </span>
        </ForegroundWrapperElement>
    );

    // Squad Points
    cardElements.push(
        <ForegroundWrapperElement key="squadron-points" height={20 * sizeMultiplier} width={50 * sizeMultiplier} top={589 * sizeMultiplier} left={386 * sizeMultiplier}>
            <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Regular', fontSize: 24 * sizeMultiplier }}>
                {points}
            </span>
        </ForegroundWrapperElement>
    );

    // Squad Speed
    cardElements.push(
        <ForegroundWrapperElement key="squadron-speed" height={30 * sizeMultiplier} width={30 * sizeMultiplier} top={311 * sizeMultiplier} left={72 * sizeMultiplier}>
            <span style={{ zIndex: 1, color: '#fde505', fontFamily: 'Armada Regular', fontStyle: 'normal', fontSize: 54 * sizeMultiplier, display: 'flex', textShadow: '2px 3px 1px #000' }}>
                {squadronSpeed}
            </span>
        </ForegroundWrapperElement>
    );

    // Squad Hull
    cardElements.push(
        <ForegroundWrapperElement key="squadron-hull" height={30 * sizeMultiplier} width={30 * sizeMultiplier} top={311 * sizeMultiplier} left={177 * sizeMultiplier}>
            <span style={{ zIndex: 1, color: '#e8e4c2', fontFamily: 'Armada Regular', fontStyle: 'normal', fontSize: 54 * sizeMultiplier, display: 'flex', textShadow: '2px 3px 1px #000' }}>
                {squadronHull}
            </span>
        </ForegroundWrapperElement>
    );

    // Chassis Icon
    cardElements.push(
        <ForegroundWrapperElement key="squadron-chassis-icon" height={20 * sizeMultiplier} width={50 * sizeMultiplier} top={(armadaSquadronIconOffset[squadronIcon] ? armadaSquadronIconOffset[squadronIcon] : 0) + chassisIconYOffset + (580 * sizeMultiplier)} left={6 * sizeMultiplier}>
            <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Squadron Icons', fontStyle: 'normal', fontSize: 42 * sizeMultiplier * (armadaSquadronFontSizeFactor[squadronIcon] ? armadaSquadronFontSizeFactor[squadronIcon] : 1), display: 'flex', alignItems: 'center' }}>
                {armadaSquadronFontIcons[squadronIcon]}
            </span>
        </ForegroundWrapperElement>
    );

    // Defense tokens
    if (firstDefenseToken) {
        cardElements.push(
            <ForegroundWrapperElement key="squadron-first-defense-token" height={35 * sizeMultiplier} width={50 * sizeMultiplier} top={faction === 'rebels' ? 577 * sizeMultiplier : 575 * sizeMultiplier} left={secondDefenseToken === 'none' ? 202 * sizeMultiplier : 175 * sizeMultiplier}>
                <span style={{ marginRight: 2, fontSize: firstDefenseToken === 'brace' ? 36 * sizeMultiplier : 32 * sizeMultiplier, fontFamily: 'Armada Icons', color: 'white', display: 'flex', alignItems: 'center' }}>
                    {armadaFontIcons[firstDefenseToken]}
                </span>
            </ForegroundWrapperElement>
        );
    }
    if (secondDefenseToken) {
        cardElements.push(
            <ForegroundWrapperElement key="squadron-second-defense-token" height={35 * sizeMultiplier} width={50 * sizeMultiplier} top={faction === 'rebels' ? 577 * sizeMultiplier : 575 * sizeMultiplier} left={230 * sizeMultiplier}>
                <span style={{ marginRight: 2, fontSize: secondDefenseToken === 'brace' ? 36 * sizeMultiplier : 32 * sizeMultiplier, fontFamily: 'Armada Icons', color: 'white', display: 'flex', alignItems: 'center' }}>
                    {armadaFontIcons[secondDefenseToken]}
                </span>
            </ForegroundWrapperElement>
        );
    }


    // Vs Squadron armament
    cardElements.push(
        <ForegroundWrapperElement key="vs-squadron-armament" height={33 * sizeMultiplier} width={41 * sizeMultiplier} top={307 * sizeMultiplier} left={275 * sizeMultiplier}>
            <ArmadaDiceGroup diceCounts={vsSquadronArmament} height={33 * sizeMultiplier} width={41 * sizeMultiplier} sizeMultiplier={sizeMultiplier} />
        </ForegroundWrapperElement>
    );


    // Vs Ship Armament
    cardElements.push(
        <ForegroundWrapperElement key="vs-ship-armament" height={33 * sizeMultiplier} width={41 * sizeMultiplier} top={307 * sizeMultiplier} left={379 * sizeMultiplier}>
            <ArmadaDiceGroup diceCounts={vsShipArmament} height={33 * sizeMultiplier} width={41 * sizeMultiplier} sizeMultiplier={sizeMultiplier} />
        </ForegroundWrapperElement>
    );

     // Card ability text
     cardElements.push(
        <ForegroundWrapperElement key="card-body-text" height={185 * sizeMultiplier} width={374 * sizeMultiplier} top={375 * sizeMultiplier} left={38 * sizeMultiplier} otherStyles={{ justifyContent: 'left', alignItems: 'baseline' }}>
            <span style={{ zIndex: 1 }}><ArmadaAbilityText textAlign="left" cardText={cardText} fontSize={cardTextFontSize * sizeMultiplier} /></span>
        </ForegroundWrapperElement>
    );

    // Card Portrait
    if (uploadedImage) {

        cardElements.push(
            <div key="card-portrait" style={{ zIndex: -1, position: 'absolute', width: 450 * sizeMultiplier, height: 640 * sizeMultiplier, overflow: 'hidden' }} >
                <Image
                    alt="card portrait"
                    src={URL.createObjectURL(uploadedImage)}
                    width={0}
                    height={0}
                    style={{ ...uploadedImageStyles }}
                />
            </div>
        );
    }

    let elementRef = useRef(null);
    const htmlToImageConvert = () => {
        toPng(elementRef.current, { cacheBust: false }).then(dataUrl => {
            const link = document.createElement('a');
            link.download = `${squadronName ? `${squadronName} (${squadronChassis})` : squadronChassis}.png`;
            link.href = dataUrl;
            link.click();
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <div id="image-wrapper" ref={elementRef} style={{ display: 'block', position: 'relative', width: 450 * sizeMultiplier, height: 640 * sizeMultiplier }}>
                {squadronChassis !== '' ? cardElements : undefined}
            </div>
            <button onClick={htmlToImageConvert} style={{ marginTop: 8 }}>
                Download Image
            </button>
        </div>
    );
}