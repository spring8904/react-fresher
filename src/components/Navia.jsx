import navia from '../assets/imgs/navia.jpg'

const Navia = () => {
  return (
    <>
      <style>
        {`
          @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <img
        src={navia}
        alt="navia"
        className="d-block mx-auto rounded-circle"
        style={{ maxHeight: '50vh', animation: 'spin 24s linear infinite' }}
      />
    </>
  )
}

export default Navia
