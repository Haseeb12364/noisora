// import { useState } from "react"
// function Loginform() {

//   const [formData, setFormData] = useState({
//     name:"", 
//     email:"",
//     password:""
//   });
//   const [submitting, setSubmitting] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitting(true);


//     // TODO: send FORMDATA to backend
//     ///Advanced hooks///

//     setTimeout(() => {
//       alert("Form is submitted");
//       setFormData({
//         name: "", email: "", password: ""
//       })
//       setSubmitting(false);
//     }, 3000);
//   };

//  const  isFormValid= formData.name.trim() && formData.email.trim() &&  formData.password.trim();
//   // const isDisabled =  formData.!name = ! email;
//   return <div className="loginform">
//     <form className="loginform" onSubmit={handleSubmit}>
//       <label><input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} /></label>
//       <label><input type="email" name="email" value={formData.email} placeholder="email address" onChange={handleChange} /></label>
//       <label><input type="password" name="password" value={formData.password} placeholder="password" onChange={handleChange} /></label>
//       <button type="submit" disabled={submitting||! isFormValid } > {submitting ? "submitting.." : "submit"}  </button>
//     </form>
//   </div>

// }

// // return (
// //   <form className="loginform" onSubmit={handleSubmit}>
// //     <label>
// //       <input
// //         type="text"
// //         name="name"
// //         placeholder="Name"
// //         value={formData.name}
// //         onChange={handleChange}
// //         required
// //       />
// //     </label>

// //     <label>
// //       <input
// //         type="email"
// //         name="email"
// //         placeholder="Email Address"
// //         value={formData.email}
// //         onChange={handleChange}
// //         required
// //       />
// //     </label>

// //     <label>
// //       <input
// //         type="password"
// //         name="password"
// //         placeholder="Password"
// //         value={formData.password}
// //         onChange={handleChange}
// //         required
// //       />
// //     </label>

// //     <button type="submit" disabled={submitting}>
// //       {submitting ? "Submitting..." : "Submit"}
// //     </button>
// //   </form>
// // );

// export default Loginform
