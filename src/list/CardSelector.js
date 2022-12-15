import CardButton from 'src/common/CardButton';

function CardSelector({ userPriorityAction, handleAddShip, handleAddSquadron, filteredCardIds }) {
    return (
        <div style={{ marginTop: 20, display: 'flex', flexFlow: 'row wrap' }}>
            {filteredCardIds.map((id) =>
                <CardButton
                    id={id}
                    key={id}
                    handleClick={() => {
                        if (userPriorityAction === 'addShip') {
                            handleAddShip(id);
                        } else if (userPriorityAction === 'addSquadron') {
                            handleAddSquadron(id);
                        }
                    }}
                />
            )}
        </div>
    );
}

export default CardSelector;