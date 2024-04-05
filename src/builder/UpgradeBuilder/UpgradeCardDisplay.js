import { useRef } from 'react';
import Image from 'next/image.js';
import { toPng } from 'html-to-image';
import {
    barNumbers,
    upgradeTypeIcons,
    upgradeTemplateImages,
    armadaShipFontIcons,
    armadaShipFontSizeFactor,
    armadaShipIconOffset
} from 'src/utility';
import SideBarTokenColumn from '../common/SideBarTokenColumn.js';
import ArmadaAbilityText from '../common/ArmadaAbilityText.js';



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

export default function UpgradeCardDisplay({
    maxNumAllowed,
    points,
    titledShip,
    shipIconYOffset,
    cardName,
    cardNameFontSize,
    faction,
    cardText,
    cardTextFontSize,
    cardFooterText,
    upgradeTypes = [],
    isExhaust,
    startingTokenValue,
    startingTokens,
    readyCostTokenValue,
    readyCostTokens,
    uploadedImage,
    sizeMultiplier,
    uploadedImageStyles = {}
}) {
    const cardElements = [];
    const baseImageKey = "base-image";
    const factionImageKey = "faction-icon";


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

    if (upgradeTypes.length > 0 && upgradeTypes[0] === 'commander') {
        // Commander
        if (faction === 'rebels') cardElements.push(<BackgroundImageLayer key={baseImageKey} src={upgradeTemplateImages.rebelsCommander} />);
        else if (faction === 'empire') cardElements.push(<BackgroundImageLayer key={baseImageKey} src={upgradeTemplateImages.empireCommander} />);
        else if (faction === 'republic') cardElements.push(<BackgroundImageLayer key={baseImageKey} src={upgradeTemplateImages.republicCommander} />);
        else if (faction === 'separatists') cardElements.push(<BackgroundImageLayer key={baseImageKey} src={upgradeTemplateImages.separatistsCommander} />);
    } else if (upgradeTypes.length > 0) {
        // Title icon
        cardElements.push(<BackgroundImageLayer key={baseImageKey} src={upgradeTemplateImages.baseGeneric} />);
        if (upgradeTypes[0] === 'title') {
            cardElements.push(<BackgroundImageLayer key="upgrade-type-icon" alt={upgradeTypes[0]} src={upgradeTemplateImages.titleSlot} />);
            cardElements.push(
                <ForegroundWrapperElement key="titled-ship-icon" height={50 * sizeMultiplier} width={100 * sizeMultiplier} top={(armadaShipIconOffset[titledShip] ? armadaShipIconOffset[titledShip] : 0) + (shipIconYOffset + 562) * sizeMultiplier} left={10 * sizeMultiplier}>
                    <span style={{ fontSize: armadaShipFontSizeFactor[titledShip] ? 64 * armadaShipFontSizeFactor[titledShip] * sizeMultiplier : 64 * sizeMultiplier, fontFamily: 'Armada Ship Icons', color: 'black' }}>
                        {{
                            ...armadaShipFontIcons.rebels,
                            ...armadaShipFontIcons.empire,
                            ...armadaShipFontIcons.republic,
                            ...armadaShipFontIcons.separatists
                        }[titledShip]}
                    </span>
                </ForegroundWrapperElement>
            );
        } else if (upgradeTypes.length === 2) {
            cardElements.push(<BackgroundImageLayer key="double-upgrade-slot" alt="double upgrade slot" src={upgradeTemplateImages.doubleSlot} />);
            cardElements.push(<ForegroundImageElement key="upgrade-type-icon-1" alt={upgradeTypes[0]} src={upgradeTypeIcons[upgradeTypes[0]]} top={564 * sizeMultiplier} left={19 * sizeMultiplier} height={40 * sizeMultiplier} width={40 * sizeMultiplier} />);
            cardElements.push(<ForegroundImageElement key="upgrade-type-icon-2" alt={upgradeTypes[1]} src={upgradeTypeIcons[upgradeTypes[1]]} top={564 * sizeMultiplier} left={60.5 * sizeMultiplier} height={40 * sizeMultiplier} width={40 * sizeMultiplier} />);
        } else {
            cardElements.push(<ForegroundImageElement key="upgrade-type-icon" alt={upgradeTypes[0]} src={upgradeTypeIcons[upgradeTypes[0]]} top={564 * sizeMultiplier} left={19 * sizeMultiplier} height={40 * sizeMultiplier} width={40 * sizeMultiplier} />);
        }

        // Upgrade Faction icon
        if (faction === 'rebels') cardElements.push(<BackgroundImageLayer key={factionImageKey} src={upgradeTemplateImages.rebelsUpgrade} />);
        else if (faction === 'empire') cardElements.push(<BackgroundImageLayer key={factionImageKey} src={upgradeTemplateImages.empireUpgrade} />);
        else if (faction === 'republic') cardElements.push(<BackgroundImageLayer key={factionImageKey} src={upgradeTemplateImages.republicUpgrade} />);
        else if (faction === 'separatists') cardElements.push(<BackgroundImageLayer key={factionImageKey} src={upgradeTemplateImages.separatistsUpgrade} />);
    }

    // Card Name
    let isTitleItalic = upgradeTypes.length > 0 && upgradeTypes[0] === 'title' && maxNumAllowed > 0;
    cardElements.push(
        <ForegroundWrapperElement key="card-name" height={45 * sizeMultiplier} width={350 * sizeMultiplier} top={262 * sizeMultiplier} left={readyCostTokenValue > 0 || isExhaust ? 37 * sizeMultiplier : 50 * sizeMultiplier}>
            <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Regular', fontStyle: isTitleItalic ? 'italic' : 'normal', fontSize: cardNameFontSize * sizeMultiplier, display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: 2, marginBottom: 4 * sizeMultiplier, fontSize: 24 * sizeMultiplier, fontFamily: 'Armada Icons', color: 'black' }}>{Array(maxNumAllowed).fill().map((_, i) => '\u0078' )}</span>
                {cardName}
            </span>
        </ForegroundWrapperElement>
    );

    // Points
    cardElements.push(
        <ForegroundWrapperElement key="points-text" height={30 * sizeMultiplier} width={40 * sizeMultiplier} top={572 * sizeMultiplier} left={383 * sizeMultiplier}>
            <span style={{ fontSize: 20 * sizeMultiplier, fontFamily: 'Aero Matics', color: 'black' }}>{points}</span>
        </ForegroundWrapperElement>
    );

    // Card ability text
    cardElements.push(
        <ForegroundWrapperElement key="card-body-text" height={240 * sizeMultiplier} width={330 * sizeMultiplier} top={328 * sizeMultiplier} left={59 * sizeMultiplier} otherStyles={{ alignItems: 'baseline' }}>
            <span style={{ zIndex: 1 }}><ArmadaAbilityText cardText={cardText} fontSize={cardTextFontSize * sizeMultiplier} /></span>
        </ForegroundWrapperElement>
    );
    // Card footer text
    cardElements.push(
        <ForegroundWrapperElement key="card-footer-text" height={25 * sizeMultiplier} width={330 * sizeMultiplier} top={580 * sizeMultiplier} left={59 * sizeMultiplier} otherStyles={{ alignItems: 'baseline' }}>
            <span style={{ zIndex: 1 }}><ArmadaAbilityText cardText={cardFooterText} fontSize={14 * sizeMultiplier} /></span>
        </ForegroundWrapperElement>
    );

    // Starting resources
    if (startingTokenValue > 0 && startingTokens.length > 0) {
        if (upgradeTypes.length > 0 && upgradeTypes[0] === 'commander') {
            cardElements.push(<BackgroundImageLayer key="blue-commander-part" src={upgradeTemplateImages.blueCommander} />);
        } else {
            cardElements.push(<BackgroundImageLayer key="blue-part" src={upgradeTemplateImages.blue} />);
        }

        cardElements.push(<BackgroundImageLayer key="starting-token-value" src={barNumbers.blue[startingTokenValue - 1]} />);
        cardElements.push(<SideBarTokenColumn sizeMultiplier={sizeMultiplier} commandTokens={startingTokens} color="blue" />);
    }

    // Ready cost tokens
    if (readyCostTokenValue > 0 && readyCostTokens.length > 0) {
        cardElements.push(<BackgroundImageLayer key="red-part" src={upgradeTemplateImages.red} />);
        cardElements.push(<BackgroundImageLayer key="ready-cost-token-value" src={barNumbers.red[readyCostTokenValue - 1]} />);
        cardElements.push(<SideBarTokenColumn sizeMultiplier={sizeMultiplier} commandTokens={readyCostTokens} color="red" />);
    } else if (isExhaust) {
    // Exhaustible
        cardElements.push(<BackgroundImageLayer key="exhaust-part" src={upgradeTemplateImages.exhaust} />);
    }
    
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
            link.download = `${cardName ? cardName : 'Unnamed'}.png`;
            link.href = dataUrl;
            link.click();
        }).catch(err => {
            console.error(err);
        });
    }


    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <div id="image-wrapper" ref={elementRef} style={{ display: 'block', position: 'relative', width: 450 * sizeMultiplier, height: 640 * sizeMultiplier }}>
                {upgradeTypes.length > 0 ? cardElements : undefined}
            </div>
            <button onClick={htmlToImageConvert} style={{ marginTop: 8 }}>
                Download Image
            </button>
        </div>
    );
}