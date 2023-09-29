function CardSelector({ cardComponents }) {
    console.log(cardComponents)
    return (
        <div style={{ marginTop: 20, display: 'flex', flexFlow: 'row wrap' }}>
            {cardComponents}
        </div>
    );
}

export default CardSelector;