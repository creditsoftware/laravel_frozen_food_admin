import './IconBtn.scss';

const IconBtn = ({icon, text, onClick}) => (
    <div className='btn-icon' onClick={onClick}>
        <img src={_URL(`/icon/${icon}.png`)}/>
        {text}
    </div>
);

export default IconBtn;
