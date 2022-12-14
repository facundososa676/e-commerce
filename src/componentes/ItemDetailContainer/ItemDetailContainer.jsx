import { getDoc, getFirestore, doc } from "firebase/firestore"
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header/Header.jsx';
import ItemDetail from "./ItemDetail.jsx"
import Loading from '../Loading/Loading.jsx';
import Footer from "../Home/Footer/Footer.jsx";



const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const {productId} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const db = getFirestore()
      const response = doc(db, "productos", productId);
      getDoc(response).then((snapShot) => {
        if (snapShot.exists()) {
          setItem({id:snapShot.id, ...snapShot.data()})
          setLoading(false)
        }
      })

    }, [productId]);
    
  return (
    <div>
        <Header />
        {loading ? <Loading/> : <ItemDetail item={item}/>}
        <Footer />
    </div>
  )
}

export default ItemDetailContainer;
