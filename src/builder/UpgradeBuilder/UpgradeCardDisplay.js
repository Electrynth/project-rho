import { useRef } from 'react';
import Image from 'next/image.js';
import { toPng } from 'html-to-image';
import {
    barNumbers,
    upgradeTypeIcons,
    upgradeTemplateImages,
    armadaShipFontIcons,
    armadaShipFontSizeFactor
} from 'src/utility';
import SideBarTokenColumn from '../common/SideBarTokenColumn.js';
import ArmadaAbilityText from '../common/ArmadaAbilityText.js';


function BackgroundImageLayer({ src, otherStyles }) {
    const style = {
        zIndex: 0,
        width: 450,
        height: 640,
        position: 'absolute',
        backgroundSize: 'contain',
        backgroundImage: `url('${src.src}')`,
        ...otherStyles
    };

    return <div style={style} />;
}

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
    cardName,
    cardNameFontSize,
    faction,
    cardText,
    cardTextFontSize,
    upgradeTypes = [],
    isExhaust,
    startingTokenValue,
    startingTokens,
    readyCostTokenValue,
    readyCostTokens,
    titledShipY,
    uploadedImage,
    uploadedImageStyles = {}
}) {
    const cardElements = [];
    const baseImageKey = "base-image";
    const factionImageKey = "faction-icon";

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
                <ForegroundWrapperElement key="titled-ship-icon" height={50} width={100} top={Number(titledShipY) ? Number.parseInt(titledShipY) + 557 : 557} left={10}>
                    <span style={{ fontSize: armadaShipFontSizeFactor[titledShip] ? 64 * armadaShipFontSizeFactor[titledShip] : 64, fontFamily: 'Armada Ship Icons', color: 'black' }}>
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
            cardElements.push(<ForegroundImageElement key="upgrade-type-icon-1" alt={upgradeTypes[0]} src={upgradeTypeIcons[upgradeTypes[0]]} top={564} left={19} height={40} width={40} />);
            cardElements.push(<ForegroundImageElement key="upgrade-type-icon-2" alt={upgradeTypes[1]} src={upgradeTypeIcons[upgradeTypes[1]]} top={564} left={60.5} height={40} width={40} />);
        } else {
            cardElements.push(<ForegroundImageElement key="upgrade-type-icon" alt={upgradeTypes[0]} src={upgradeTypeIcons[upgradeTypes[0]]} top={564} left={19} height={40} width={40} />);
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
        <ForegroundWrapperElement key="card-name" height={45} width={350} top={262} left={readyCostTokenValue > 0 || isExhaust ? 36 : 51}>
            <span style={{ zIndex: 1, color: 'black', fontFamily: 'Armada Regular', fontStyle: isTitleItalic ? 'italic' : 'normal', fontSize: cardNameFontSize, display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: 2, fontSize: 24, fontFamily: 'Armada Icons', color: 'black' }}>{Array(maxNumAllowed).fill().map((_, i) => '\u0078' )}</span>
                {cardName}
            </span>
        </ForegroundWrapperElement>
    );

    // Points
    cardElements.push(
        <ForegroundWrapperElement key="points-text" height={30} width={40} top={572} left={383}>
            <span style={{ fontSize: 20, fontFamily: 'Aero Matics', color: 'black' }}>{points}</span>
        </ForegroundWrapperElement>
    );

    // Card ability text
    cardElements.push(
        <ForegroundWrapperElement key="card-body-text" height={240} width={330} top={328} left={59} otherStyles={{ alignItems: 'baseline' }}>
            <span style={{ zIndex: 1 }}><ArmadaAbilityText cardText={cardText} fontSize={cardTextFontSize} /></span>
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
        cardElements.push(<SideBarTokenColumn commandTokens={startingTokens} color="blue" />);
    }

    // Ready cost tokens
    if (readyCostTokenValue > 0 && readyCostTokens.length > 0) {
        cardElements.push(
            <BackgroundImageLayer key="red-part" src={upgradeTemplateImages.red} />
        );
        cardElements.push(
            <BackgroundImageLayer key="ready-cost-token-value" src={barNumbers.red[readyCostTokenValue - 1]} />
        );
        cardElements.push(<SideBarTokenColumn commandTokens={readyCostTokens} color="red" />);
    } else if (isExhaust) {
    // Exhaustible
        cardElements.push(
            <BackgroundImageLayer key="exhaust-part" src={upgradeTemplateImages.exhaust} />
        );
    }
    
    // Card Portrait
    if (uploadedImage) {

        cardElements.push(
            <div key="card-portrait" style={{ zIndex: -1, position: 'absolute', width: 450, height: 640, overflow: 'hidden' }} >
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
            <div id="image-wrapper" ref={elementRef} style={{ display: 'block', position: 'relative', width: 450, height: 640 }}>
                {upgradeTypes.length > 0 ? cardElements : undefined}
            </div>
            <button onClick={htmlToImageConvert} style={{ marginTop: 8 }}>
                Download Image
            </button>
        </div>
    );
}