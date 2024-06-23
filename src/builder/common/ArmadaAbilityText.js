import Markdown from 'react-markdown';
import { armadaFontIcons } from '../../utility.js';

export default function ArmadaAbilityText({ cardText, fontSize = 18, textAlign = 'center', isSquadronText = false }) {
    const baseStyles = {
        fontSize: fontSize,
        color: 'black'
    };
    const newlineRegex = /^newline[0-9]{2}/;
    return (
        <Markdown
            allowedElements={['p', 'li', 'ol', 'ul', 'em', 'code', 'strong']}
            components={{
                em(props) {
                    const { children, ...rest } = props;
                    return (
                        <em {...rest} style={{ ...baseStyles, fontFamily: isSquadronText ? 'Armada Regular' : 'Optima', marginRight: isSquadronText ? 4 : 0 }}>
                            {children}
                        </em>
                    );
                },
                li(props) {
                    const { children, ...rest } = props;
                    let lineHeight = '1.1em';
                    return (
                        <li {...rest} style={{ ...baseStyles, fontFamily: 'Optima', lineHeight, marginBottom: 8 }}>
                            {children}
                        </li>
                    );
                },
                p(props) {
                    const { children, ...rest } = props;
                    let lineHeight = '1.1em';
                    if (children.props && children.props.children && newlineRegex.test(children.props.children)) {
                        const foundNumber = children.props.children.match(/[0-9]{2,3}/);
                        lineHeight = `${foundNumber}%`;
                    }
                    return (
                        <p {...rest} style={{ ...baseStyles, fontFamily: isSquadronText ? 'Armada Regular' : 'Optima', marginTop: 0, marginBottom: 8, lineHeight, textAlign }}>
                            {children}
                        </p>
                    );
                },
                code(props) {
                    const { children, ...rest } = props;
                    if (typeof children === 'string' && armadaFontIcons[children]) {
                        return (
                            <span {...rest} style={{ ...baseStyles, fontFamily: 'Armada Icons', fontSize: fontSize + 1, verticalAlign: isSquadronText ? undefined : 'middle' }}>
                                {armadaFontIcons[children]}
                            </span>
                        );
                    } else if (typeof children === 'string' && newlineRegex.test(children)) {
                        return <br />;
                    } else { 
                        return undefined;
                    }
                },
                strong(props) {
                    const { children, ...rest } = props;
                    return (
                        <strong {...rest} style={{ ...baseStyles, fontFamily: 'Aero Matics Display Bold', fontSize: fontSize + 2, fontWeight: 600 }}>
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