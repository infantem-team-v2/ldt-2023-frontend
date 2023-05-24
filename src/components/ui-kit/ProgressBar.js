import '../../styles/ProgressBar.css'

const ProgressBar = ({ range, current }) => {
  const progress = (current / range) * 100;

  return (
    <div className='mb-4'>
      <h2 className="h2-main mb-3">{`${current} из ${range} пунктов`}</h2>
      <div className="progress pbar-main">
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

export default ProgressBar;