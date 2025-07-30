// import { useCallback, useMemo, useState } from "react";

// function ExpensiveComponent({ number }) {
//     const [inputnumber, setInputnumber] = useState(0)

//     const handleChange = (e) => {

//         const value = e.target.value;

//         setInputnumber(isNaN(value) ? 0 : value);
//     }
//     const expensiveValue = useMemo(() => {
//         console.log("Calculating...");
//         return inputnumber * 2;
//     }, [inputnumber]);

//     const callFunction = useCallback(() => {
//         console.log("dagga")
//     }, [])


//     return (
//         <>
//             <label className="">  enter a number <input type="number" value={inputnumber} onChange={handleChange} /></label>
//             <p className="bg-gray-600 h-30">Doubled value: {expensiveValue}</p>
//         </>
//     );
// }

// export default ExpensiveComponent;
