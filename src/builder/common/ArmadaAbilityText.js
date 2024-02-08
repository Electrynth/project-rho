import Markdown from 'react-markdown';
import { armadaFontIcons } from '../../utility.js';

export default function ArmadaAbilityText({ cardText, fontSize = 18 }) {
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
                        <p {...rest} style={{ ...baseStyles, fontFamily: 'Optima', marginTop: 0, marginBottom: 0, textAlign: 'center' }}>
                            {children}
                        </p>
                    );
                },
                code(props) {
                    const { children, ...rest } = props;
                    if (typeof children === 'string' && armadaFontIcons[children]) {
                        return <span {...rest} style={{ ...baseStyles, fontFamily: 'Armada Icons', fontSize: fontSize + 1, verticalAlign: 'middle' }}>{armadaFontIcons[children]}</span>
                    } else if (typeof children === 'string' && children === 'newline') {
                        return <span><br /><br /></span>
                    } else {
                        return undefined;
                    }
                },
                strong(props) {
                    const { children, ...rest } = props;
                    return (
                        <strong {...rest} style={{ ...baseStyles, fontFamily: 'Aero Matics Display Bold', fontSize: fontSize - 2 }}>
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