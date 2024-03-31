import Markdown from 'react-markdown';
import { armadaFontIcons } from '../../utility.js';

export default function ArmadaAbilityText({ cardText, fontSize = 18, textAlign = 'center', isSquadronText = false }) {
    const baseStyles = {
        fontSize,
        color: 'black',
        lineHeight: 'normal'
    };

    return (
        <Markdown
            allowedElements={['p', 'li', 'ol', 'ul', 'em', 'code', 'strong']}
            components={{
                li(props) {
                    const { children, ...rest } = props;
                    return (
                        <li {...rest} style={{ ...baseStyles, fontFamily: 'Optima' }}>
                            {children}
                        </li>
                    );
                },
                p(props) {
                    const { children, ...rest } = props;
                    return (
                        <p {...rest} style={{ ...baseStyles, fontFamily: 'Optima', marginTop: 0, marginBottom: 0, textAlign }}>
                            {children}
                        </p>
                    );
                },
                code(props) {
                    const { children, ...rest } = props;
                    if (typeof children === 'string' && armadaFontIcons[children]) {
                        return <span {...rest} style={{ ...baseStyles, fontFamily: 'Armada Icons', fontSize: isSquadronText ? fontSize + 4 : fontSize + 1, verticalAlign: isSquadronText ? undefined : 'middle', fontStyle: 'strong', lineHeight: isSquadronText ? '1.2em' : undefined }}>{armadaFontIcons[children]}</span>
                    } else if (typeof children === 'string' && children === 'newline') {
                        if (isSquadronText) return <span ><br /></span>
                        else return <span><br /><br /></span>
                    } else {
                        return undefined;
                    }
                },
                strong(props) {
                    const { children, ...rest } = props;
                    return (
                        <strong {...rest} style={{ ...baseStyles, fontFamily: 'Aero Matics Display Bold', fontSize: isSquadronText ? fontSize + 2 : fontSize, fontWeight: 400 }}>
                            {children}
                        </strong>
                    );
                },

            }}
        >
            {cardText}
        </Markdown>
    );
}