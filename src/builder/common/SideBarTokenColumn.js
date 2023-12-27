import Image from 'next/image';
import { commandIcons } from 'src/utility';

export default function SideBarTokenColumn({ cardWidth = 450, color, commandTokens }) {
    const column = [];

    let tokenLeftMargin = 16;
    let dividerLeftMargin = 22;

    if (color === 'red') {
        tokenLeftMargin = 403;
        dividerLeftMargin = 409;
    }

    commandTokens.forEach((token, i) => {
        column.push(
            <Image
                key={token}
                alt={token}
                src={commandIcons[token]}
                style={{
                    zIndex: 1,
                    position: 'absolute',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 30,
                    width: 30,
                    top: 379 + i * 43,
                    left: tokenLeftMargin,
                }}
            />
        );

        if (i !== commandTokens.length - 1) {
            column.push(
                <div
                    key={`${token}-separator`}
                    style={{
                        position: 'absolute',
                        top: 414 + i * 43,
                        left: dividerLeftMargin,
                        width: 19,
                        height: 4,
                        backgroundColor: 'rgb(20, 20, 20)',
                        borderRadius: 1
                    }}
                />
            );
        }
    });

    return column;
}