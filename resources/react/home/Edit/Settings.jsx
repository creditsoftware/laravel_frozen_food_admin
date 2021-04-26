import { useSelector, useDispatch } from 'react-redux';
import formats from '../store/formats';


import Input from './Input';
import FileDrop from './FileDrop';
import { useEffect, useState } from 'react';
import './edit.scss'
const Settings = ({ label, update }) => {
  const [showStatus, setShowStatus] = useState(false);
  const [sizeOfUnit, setSizeOfUnit] = useState(0);
  const [unit, setUnit] = useState('KG.');
  const [priceValue, setPriceValue] = useState({
    promoConfValue: "",
    promoKgValue: "",
    listinoConfValue: "",
    listinoKgValue: "",

  })
  const format = useSelector(formats.getById(1));
  const productData = useSelector(({ detail }) => detail);
  const toFixedHalf2 = (num) => {
    return Math.round(num*20)/20
  }
  const handleChange = (name, um) => (event) => {
    let eValue = event.target.value
    let price = 0
    if (um == 'CONF.') {
      price = ((eValue * 1000) / sizeOfUnit).toFixed(2);
    }
    if (um == 'KG.') {
      price = (sizeOfUnit * eValue / 1000).toFixed(2)
    }
    price = toFixedHalf2(price)
    if(name === 'listinoKgValue') {
      setPriceValue({
        ...priceValue,
        [name]: eValue,
        listinoConfValue:price
      })
      if (unit == 'CONF.') {
        update({ promo_price: price })
      }
      if (unit == 'KG.') {
        update({ promo_price: toFixedHalf2(eValue) })
      }
    }
    if(name === 'listinoConfValue') {
      setPriceValue({
        ...priceValue,
        [name]: eValue,
        listinoKgValue:price
      })
      if (unit == 'CONF.') {
        update({ promo_price: toFixedHalf2(eValue) })
      }
      if (unit == 'KG.') {
        update({ promo_price: price })
      }
    }
    if(name === 'promoConfValue') {
      setPriceValue({
        ...priceValue,
        [name]: eValue,
        promoKgValue:price
      })
      if (unit == 'CONF.') {
        update({ price: toFixedHalf2(eValue) })
      }
      if (unit == 'KG.') {
        update({ price: price })
      }
    }
    if(name === 'promoKgValue') {
      setPriceValue({
        ...priceValue,
        [name]: eValue,
        promoConfValue:price
      })
      if (unit == 'CONF.') {
        update({ price: price })
      }
      if (unit == 'KG.') {
        update({ price: toFixedHalf2(eValue) })
      }
    }
  }
  const checkChangeAction = (event) => {
    setShowStatus(event.target.checked)
    if (event.target.checked) {
      update({ show_promo: '1' })
    } else {
      update({ show_promo: '0' })
    }
  }
  let product = productData.getProd && productData.getProd.product;
  useEffect(() => {
    if (product) {
      if (product["show_promo"] === '1') {
        setShowStatus(true)
        update({ show_promo: '1' })
      } else {
        setShowStatus(false)
        update({ show_promo: '0' })
      }
      let size = product['sizing'] && product['sizing'].split('-')[0] && product['sizing'].split('-')[0].split('gr')[0] * 1
      if (product['sizing'] && product['sizing'].split('-').length > 1) {
        size = product['sizing'] && product['sizing'].split('-')[1] && product['sizing'].split('-')[1].split('gr')[0] * 1
      }
      setSizeOfUnit(size)
      let price = product['price'] !== null ? product['price'].toString().replace(',', '.') * 1 : 0
      let l_price = product['promo_price'] !== null ? product['promo_price'].toString().replace(',', '.') * 1 : 0
      price = price;
      l_price = l_price;
      let kgPrice = 0;
      let confPrice = 0;
      let l_kgPrice = 0;
      let l_confPrice = 0;
      if (product['um'] == 'CONF.') {
        kgPrice = ((price * 1000) / size);
        confPrice = (price * 1);
        l_kgPrice = ((l_price * 1000) / size);
        l_confPrice = (l_price * 1);
      }
      if (product['um'] == 'KG.') {
        kgPrice = (price * 1)
        confPrice = (size * price / 1000)
        l_kgPrice = (l_price * 1)
        l_confPrice = (size * l_price / 1000)
      }
      setUnit(product['um']);
      
      setPriceValue({
        ...priceValue,
        promoKgValue: (Math.round(kgPrice*20)/20).toFixed(2),
        promoConfValue: (Math.round(confPrice*20)/20).toFixed(2),
        listinoKgValue:(Math.round(l_kgPrice*20)/20).toFixed(2),
        listinoConfValue:(Math.round(l_confPrice*20)/20).toFixed(2),
      })
    }
  }, [product])
  // const switchButton = () => {
  //   setPriceValue({
  //     ...priceValue,
  //     promoKgValue: "",
  //     promoConfValue: "",
  //     listinoKgValue: priceValue.promoKgValue,
  //     listinoConfValue: priceValue.promoConfValue
  //   })
  //   update({ promo_price: priceValue.promoConfValue })
  // }
  return (
    <div id='settings'>
      {format.map(f => <Input key={f.id} format={f} label={label} update={update} />)}
      {
        product &&
        <Input format={{ id: 'price', title: "Price", uisize: 0.25 }} label={product} update={update} />
      }
      <div className="promotion" style={{ width: '100%' }}>
        <div className="promotion-layout" style={{ width: '100%', alignItems:'center'}}>
          <div style={{ display: 'block', paddingTop: '10px', paddingBottom: '10px', width: '20%' }}>
            <p>Promotion Conf Value</p>
            <input type="number" placeholder="" value={priceValue.listinoConfValue} onChange={handleChange("listinoConfValue", "CONF.")} />
          </div>
          <div style={{ display: 'block', paddingTop: '10px', paddingBottom: '10px', width: '20%' }}>
            <p>Promotion Kg Value</p>
            <input type="number" placeholder="" value={priceValue.listinoKgValue} onChange={handleChange("listinoKgValue", "KG.")} />
          </div>
          <div style={{ display: 'block', paddingTop: '24px', paddingBottom: '10px', width: '20%' }}>
            <input type="checkbox" id="off" name="off" checked={showStatus} onChange={checkChangeAction} />
            <label for="off">Show</label>
            {/* <button style={{ height: '37px', width: '52px' }} onClick={switchButton}>
              <img width="20px" height="15px" src={_URL(`/img/arrow-left.png`)} />
            </button> */}
          </div>
          <div style={{ display: 'block', paddingTop: '10px', paddingBottom: '10px', width: '20%' }}>
            <p>Listino Conf Value</p>
            <input type="number" placeholder="" value={priceValue.promoConfValue} onChange={handleChange("promoConfValue", "CONF.")} />
          </div>
          <div style={{ display: 'block', paddingTop: '10px', paddingBottom: '10px', width: '20%' }}>
            <p>Listino Kg Value</p>
            <input type="number" placeholder="" value={priceValue.promoKgValue} onChange={handleChange("promoKgValue", "KG.")} />
          </div>
        </div>
      </div>
      <Input format={{ id: 'notes', title: 'Note', uisize: 3 }} label={label} update={update} />
      <Input format={{ id: 'webdesc', title: 'Descrizione Web', uisize: 4 }} label={label} update={update} />

      <FileDrop label={label} update={update} />
    </div>
  );
};

export default Settings;
