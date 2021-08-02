import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import styles from "./Login.module.css";

const URL = 'https://jsonplaceholder.typicode.com/users'

const Table = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setEmployees(response.data)
    }

    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del)
        })
    }

    const renderHeader = () => {
        let headerElement = ['id', 'name', 'email', 'phone', 'operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return employees && employees.map(({ id, name, email, phone }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td className='opration'>
                        <button className='button' onClick={() => removeData(id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1 id='title'>React Table</h1>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}

export default Table




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./Login.module.css";

// const URL =
//   "http://localhost:8080/wsLicenseAgent/ws/rest/request/searchExamRoundProcess";

// const Table = () => {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const params = JSON.stringify({
//     type: "A",
//   });

//   const getData = async () => {
//     alert("in");
//     const response = await axios.get(URL);
//     setEmployees(response.data);

//     axios
//       .post(URL,params, 
//       {
//         headers: { "Content-Type": "application/json; charset=UTF-8" },
        
//       })
//       .then((response) => console.log("repsonse", response.status));
//   };

//   // const removeData = (id) => {

//   //     axios.delete(`${URL}/${id}`).then(res => {
//   //         const del = employees.filter(employee => id !== employee.id)
//   //         setEmployees(del)
//   //     })
//   // }

//   const renderHeader = () => {
//     let headerElement = ["round_id", "time_str"];

//     return headerElement.map((key, index) => {
//       return <th key={index}>{key.toUpperCase()}</th>;
//     });
//   };

//   const renderBody = () => {
//     return (
//       employees &&
//       employees.map(({ round_id, time_str }) => {
//         return (
//           <tr key={round_id}>
//             <td>{round_id}</td>
//             <td>{time_str}</td>

//             {/* <td className='opration'>
//                         <button className='button' onClick={() => removeData(id)}>Delete</button>
//                     </td> */}
//           </tr>
//         );
//       })
//     );
//   };

//   return (
//     <>
//       <h1 id="title">React Table</h1>
//       <table id="employee">
//         <thead>
//           <tr>{renderHeader()}</tr>
//         </thead>
//         <tbody>{renderBody()}</tbody>
//       </table>
//     </>
//   );
// };

// export default Table;
