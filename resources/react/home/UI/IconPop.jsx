import './IconPop.scss';

const IconPop = ({icon, text, onClick}) => {
    const cl = text ? 'pop-icon pop-text' : 'pop-icon';
    function handleClick(e) {
        e.stopPropagation();
        onClick && onClick();
    }

    return (
        <div className={cl} aria-label={text} onClick={handleClick}>
            {icon && <img src={_URL(`/icon/${icon}.png`)}/>}
        </div>
    )
}

export default IconPop;
