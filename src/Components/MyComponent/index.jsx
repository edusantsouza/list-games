import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
import { MyContext } from "../../Contexts/GetGameList";

const MyComponent = () => {
  const { setArrayData, isFav } = useContext(MyContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userStorage"));

        const dataArray = querySnapshot.docs.map((doc) => doc.data().listFav);
        setArrayData(dataArray);
      } catch (error) {
        console.error("Erro ao obter dados do Firestore:", error);
      }
    };

    fetchData();
  }, [isFav]);

  return
};

export default MyComponent;