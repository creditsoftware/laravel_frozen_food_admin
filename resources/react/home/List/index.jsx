import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect } from 'react';


const { strstri } = require('../utils');

import Toolbar from '../UI/Toolbar';
import IconBtn from "../UI/IconBtn";

import list from '../store/list';
import products from '../store/products'

import './list.scss';


import ProductRow from "./ProductRow";
import useWindowSize from "./useWindowSize";
import { StayCurrentPortraitRounded } from "@material-ui/icons";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import { useEventCallback } from "@material-ui/core";


export default function List() {
  const size = useWindowSize();
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([])
  const [categoryList, setCategoryList] = useState([
    { id: 0, name: "1A", status: false, label: "Avicoli Freschi" },
    { id: 1, name: "2B", status: false, label: "Avicoli Congelati" },
    { id: 2, name: "3C", status: false, label: "Pesce Congelato" },
    { id: 3, name: "4D", status: false, label: "Verdura Congelata" },
    { id: 4, name: "5E", status: false, label: "Selvaggina Congelata" },
    { id: 5, name: "6F", status: false, label: "Bovino Fresco-Surgelato" },
    { id: 6, name: "7G", status: false, label: "Suino Fresco-Surgelato" },
    { id: 7, name: "8H", status: false, label: "Ovino Fresco-Surgelato" },
    { id: 8, name: "9I", status: false, label: "Pasta Surgelata" },
    { id: 9, name: "10L", status: false, label: "Gelati & Semifreddi" },
    { id: 10, name: "11M", status: false, label: "Verdura Pastellata Surgelata" },
    { id: 11, name: "12N", status: false, label: "Vini ed Alcolici" },
    { id: 12, name: "13O", status: false, label: "Spezie & Aromi" },
    { id: 13, name: "14P", status: false, label: "Pesce fresco" },
    { id: 14, name: "15Q", status: false, label: "Piatti Pronti Surgelati" },
    { id: 15, name: "18T", status: false, label: "Dolci da Forno Surgelati" },
    { id: 16, name: "112M", status: false, label: "Carne Pastellata Surgelata" },
    { id: 17, name: "113M", status: false, label: "Pesce Pastellato surgelato" },
    { id: 18, name: "114M", status: false, label: "Salati da Forno" },
  ])
  const search = useSelector(list.getSearch);
  const allProds = useSelector(products.getAll);

  const prods = useMemo(() => allProds.filter(p => strstri(p.name, search) || strstri(p.code, search)), [allProds, search]);
  useEffect(() => {
    if (prods && prods.length > 0) {
      setProductList(prods)
    }
  }, [prods])
  const categoryActiveAction = (currentId) => (event) => {
    let arr = [...categoryList];
    let name = "";
    arr.map((item, index) => {
      if (item.id == currentId) {
        item.status = !item.status;
      } else {
        item.status = false;
      }
    })
    arr.map((item, index) => {
      if (item.status) {
        name = item.name;
      }
    })
    if (name) {
      let data = prods.filter(ele => ele.category == name);
      setProductList(data);
    } else {
      setProductList(prods);
    }
    setCategoryList(arr)
  }
  return <div id='main-list'>
    <Toolbar>
      <div>
        <input type='text' class = "pc-search" placeholder='Ricerca Prodotto' value={search} onChange={e => dispatch(list.search(e.target.value))} />
        <IconBtn text='logout' icon='logout' onClick={() => window.location.href = _URL('/logout')} />
      </div>
    </Toolbar>
    <div>
    <input class = "sp-search" type='text' placeholder='Ricerca Prodotto' value={search} onChange={e => dispatch(list.search(e.target.value))} />

    </div>
    <div id="filterLayout">
      <Swiper
        spaceBetween={50}
        slidesPerView={size.width > 1024 ? 15 : 4}
        loop
      >
        {categoryList.map((item, index) => {
          return (
            <SwiperSlide>
              <div className="flex-div">
                <div key={index} className={item.status ? "active" : 'inActive'} onClick={categoryActiveAction(item.id)}>
                  <img src={_URL(`/img/Cathegory-Pics/${item.name}.png`)} />
                </div>
                <div className="text-button">
                  <p style={{ textAlign: 'center', fontSize: '10px', fontWeight: 'bold', paddingTop: '8px' }}>{item.label}</p>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
    {/* <div id='products'>
      <div className='header'>
        <div>Codice</div>
        <div>Articolo</div>
        <div>Descrizione</div>
        <div>Note</div>
        <div>Modificato</div>
        <div>Azioni</div>
      </div> */}
      <table id='products'>
        <thead className='header'>
          <tr>
            <td>Codice</td>
            <td>Articolo</td>
            <td>Descrizione</td>
            <td>Note</td>
            <td>Modificato</td>
            <td>Azioni</td>
          </tr>
        </thead>
        <tbody>
          {productList && productList.length > 0 && productList.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }).map(p => <ProductRow key={p.id}{...p} />)}

        </tbody>
    </table>
  </div>;


};
