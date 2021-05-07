import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const Input = ({ format, label, update }) => {
    const productData = useSelector(({ detail }) => detail);
    const { id, title, uisize } = format;
    const width = uisize >= 1 ? '100%' : `${uisize * 100}%`;

    return (
        <div className='label ' style={{ width }}>
            <h3>{title}</h3>
            {uisize > 1 && (
                <Fragment>
                    {uisize === 4 ? (
                        <textarea rows={uisize} value={label[id]} onChange={e => {
                            if (e.target.value.substring(e.target.value.length - 3, e.target.value.length) === "di.") {
                                update({ [id]: e.target.value + productData.getProd.product.sizing })
                            } else {
                                update({ [id]: e.target.value })
                            }
                        }
                        }></textarea>
                    ) : (
                        <textarea rows={uisize} value={label[id]} onChange={e => update({ [id]: e.target.value })}></textarea>
                    )}
                </Fragment>
            )}
            {uisize <= 1 && <input type='text' value={label[id] || ''} onChange={e => update({ [id]: e.target.value })} />}
        </div>
    );
};

export default Input;
