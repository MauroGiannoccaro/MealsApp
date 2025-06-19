
const boxStyles = {
  flexGrow: 1,
  border: '0px solid #FFA500',
  boxShadow: '10px 10px 10px rgba(255, 165, 0, 0.7)',
  borderRadius: '10px',
  background: 'linear-gradient(white, #FFECB3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  margin: '5px',
  width: 'fit-content',
  transition: 'all 0.3s ease-in-out',
  OverflowY: 'auto',
  OverflowX: 'auto',
  scrollbarWidth: 'none', /* Nasconde la barra di scorrimento in Firefox */
  msOverflowStyle: 'none', /* Nasconde la barra di scorrimento in Internet Explorer e Edge */
  '&::-webkit-scrollbar': {
    display: 'none', /* Nasconde la barra di scorrimento in Chrome, Safari e Opera */
    backgroundColor: '#FFFFE0',
    width: '10px',
    
  },
  '& .categoryText': {
    display: 'none', // Nascondi testo di default
    position: 'absolute',
    top: '100%', // Posiziona il testo sotto il box
    backgroundColor: '#FFECB3', // Sfondo del testo in hover
    color: 'black', // Colore del testo in hover
    padding: '5px 10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    marginTop: '10px', // Aggiungi margine superiore per distanza dal box
    zIndex: 10,
  },
  '&:hover .categoryText': {
    display: 'block', // Mostra testo quando viene fatto hover   
  },
  '&:hover': {
    transform: 'translateY(-10px)', // Solleva il box di 10px
    boxShadow: '15px 15px 15px rgba(248, 211, 119, 0.8)', // Ombra più pronunciata
    zIndex: 10,
  },
};

export default boxStyles;
