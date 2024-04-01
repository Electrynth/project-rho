import Image from 'next/image';
import { commandIcons } from 'src/utility';

export default function SideBarTokenColumn({ cardWidth = 450, sizeMultiplier, color, commandTokens }) {
    const column = [];

    let tokenLeftMargin = 16 * sizeMultiplier;
    let dividerLeftMargin = 22 * sizeMultiplier;

    if (color === 'red') {
        tokenLeftMargin = 403 * sizeMultiplier;
        dividerLeftMargin = 409 * sizeMultiplier;
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
                    height: 30 * sizeMultiplier,
                    width: 30 * sizeMultiplier,
                    top: (379 + i * 43) * sizeMultiplier,
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
                        top: (414 + i * 43) * sizeMultiplier,
                        left: dividerLeftMargin,
                        width: 19 * sizeMultiplier,
                        height: 4 * sizeMultiplier,
                        backgroundColor: 'rgb(20, 20, 20)',
                        borderRadius: 1
                    }}
                />
            );
        }
    });

    return column;
}