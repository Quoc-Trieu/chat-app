import React from "react";
import { db } from '../firebase/config'


const useFirestore = ( collection, condition ) => {

    const [documents, setDocument] = React.useState([]);

    React.useEffect(()=>{
        let collectionRef = db.collection(collection).orderBy('createdAt')
        /*
        condition có dạng là 1 object như sau
        {
            fielName: 'abc',
            operator: '>,<,==,in' toán tử để so sánh,
            compareValue: 'abc'
        }
        */
        if(condition){
            if(!condition.compareValue || !condition.compareValue.length){
                return;
            }

            collectionRef = collectionRef.where(condition.fielName, condition.operator, condition.compareValue)
        }
        const unsubscribeb = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => ({ 
                ...doc.data(),
                id:doc.id,
            }))
            setDocument(documents);
        })
        // huỷ bỏ sự kiện bên trong snapshot sau khi components được unmouse hoặc xoá bỏ dữ liệu trc đó khi dependencies thay đổi
        return unsubscribeb;
    },[collection, condition])
    return documents;
}

export default useFirestore
