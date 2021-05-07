import { useDispatch, useSelector } from "react-redux";
import nav from '../store/nav';
import product from '../store/product';
import list from '../store/list';
import labels from '../store/labels';
import products from '../store/products';
import productDetail from '../store/detail';
import IconPop from '../UI/IconPop';


export default ({ id, code, name, activelabel, updated_at }) => {
    const dispatch = useDispatch();
    const exploded = useSelector(list.getIsExploded(id));
    const lbls = useSelector(labels.getByProdId(exploded && id));
    const active = useSelector(labels.getById(activelabel));

    function delLabel(id) {
        if (!confirm("Eliminare l'etichetta selezionata?")) return;
        id |> labels.del |> dispatch;
    }

    function delProduct(id) {
        if (!confirm("Eliminare il prodotto selezionato e tutte le sue etichette?")) return;
        id |> products.del |> dispatch;
    }

    function changeCod() {
        const newCod = prompt(`Inserisci il nuovo codice per "${name}"`).trim();
        if (!newCod) return;
        products.updCod(code, newCod) |> dispatch;
    }

    const toggleRow = () => id |> list.toggle |> dispatch;

    return <>
        {/* <div className='product' onClick={toggleRow}>
            <div><IconPop icon="edit" text="Codice" onClick={changeCod} />{code}</div>
            <div>{name}</div>
            <div>{active.description?.slice(0, 100)}</div>
            <div>{active.notes}</div>
            <div>{updated_at}</div>
            <div>
                <IconPop icon={exploded ? "implode" : "explode"} onClick={toggleRow} />
                <IconPop icon="delete" text="Elimina" onClick={() => delProduct(id)} />
            </div>

        </div> */}

        <tr className='product' onClick={toggleRow}>
            <td><IconPop icon="edit" text="Codice" onClick={changeCod} />{code}</td>
            <td>{name}</td>
            <td>{active.description?.slice(0, 100)}</td>
            <td>{active.notes}</td>
            <td>{updated_at}</td>
            <td>
                <IconPop icon={exploded ? "implode" : "explode"} onClick={toggleRow} />
                <IconPop icon="delete" text="Elimina" onClick={() => delProduct(id)} />
            </td>

        </tr>
        {/* {
            exploded && lbls.map(l => (
                <div className='label' key={l.id}>
                    <div></div>
                    <div>{l.name}</div>
                    <div>{l.webdesc?.slice(0, 100)}</div>
                    <div>{l.notes}</div>
                    <div>{l.updated_at}</div>
                    <div>
                        <IconPop icon="edit" text="Modifica" onClick={() => { l.id |> nav.edit |> dispatch; code |> productDetail.getprod |> dispatch }} />
                        <IconPop icon="dupe" text="Duplica" onClick={() => l.id |> labels.dupe |> dispatch} />
                        {
                            l.id === activelabel && <>
                                <IconPop />
                                <IconPop icon="enabled" />
                            </>
                        }
                        {
                            l.id !== activelabel && <>
                                <IconPop icon="delete" text="Elimina" onClick={() => delLabel(l.id)} />
                                <IconPop icon="disabled" text="Attiva" onClick={() => l.id |> products.active |> dispatch} />
                            </>
                        }
                    </div>
                </div>
            ))
        } */}
        {
            exploded && lbls.map(l => (
                <tr className='label' key={l.id}>
                    <td></td>
                    <td>{l.name}</td>
                    <td>{l.webdesc?.slice(0, 100)}</td>
                    <td>{l.notes}</td>
                    <td>{l.updated_at}</td>
                    <td>
                        <IconPop icon="edit" text="Modifica" onClick={() => { l.id |> nav.edit |> dispatch; code |> productDetail.getprod |> dispatch }} />
                        <IconPop icon="dupe" text="Duplica" onClick={() => l.id |> labels.dupe |> dispatch} />
                        {
                            l.id === activelabel && <>
                                <IconPop />
                                <IconPop icon="enabled" />
                            </>
                        }
                        {
                            l.id !== activelabel && <>
                                <IconPop icon="delete" text="Elimina" onClick={() => delLabel(l.id)} />
                                <IconPop icon="disabled" text="Attiva" onClick={() => l.id |> products.active |> dispatch} />
                            </>
                        }
                    </td>
                </tr>
            ))
        }
    </>
};
