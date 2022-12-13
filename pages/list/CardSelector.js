import CardButton from 'common/CardButton';

function CardSelector({ handleAddShip, filteredCardIds }) {
    return (
        <div style={{ marginTop: 20, display: 'flex', flexFlow: 'row wrap' }}>
            {filteredCardIds.map((id) => <CardButton id={id} key={id} handleClick={() => handleAddShip(id)} />)}
        </div>
    );
}

export default CardSelector;