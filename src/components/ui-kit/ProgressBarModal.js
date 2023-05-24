import '../../styles/ProgressBar.css'

const ProgressBarModal = ({ range, current }) => {
  const progress = (current / range) * 100;

  return (
    <div className='modal-pbar'>
      <h2 className="h2-main-modal">{`Шаг ${current} из ${range}`}</h2>
      <div className="progress pbar-main-modal">
        <div
          className="progress-bar "
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

export default ProgressBarModal;