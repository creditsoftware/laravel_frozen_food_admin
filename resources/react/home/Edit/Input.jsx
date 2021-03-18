
const Input = ({ format, label, update }) => {
    const { id, title, uisize } = format;
    const width = uisize >= 1 ? '100%' : `${uisize * 100}%`;
    return (
        <div className='label' style={{ width }}>
            <h3>{title}</h3>
            {uisize > 1 && <textarea rows={uisize} value={label[id] || ''} onChange={e => update({ [id]: e.target.value })}></textarea>}
            {uisize <= 1 && <input type='text' value={label[id] || ''} onChange={e => update({ [id]: e.target.value })} />}
        </div>
    );
};

export default Input;
