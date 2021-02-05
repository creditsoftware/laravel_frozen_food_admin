import './ProgressBar.scss';


const ProgressBar = ({value=100}) => (
    <div className="progress-bar">
        <span style={{width: value+'%'}} />
    </div>
);

export default ProgressBar;
