// import React, { useState } from 'react';
// import './form.css';


// const DynamicForm = () => {
//   const [fields, setFields] = useState([{ name: '', value: '' }]);

//   const handleChange = (index, event) => {
//     const newFields = [...fields];
//     newFields[index][event.target.name] = event.target.value;
//     setFields(newFields);
//   };

//   const addField = () => {
//     setFields([...fields, { name: '', value: '' }]);
//   };

//   const removeField = (index) => {
//     const newFields = [...fields];
//     newFields.splice(index, 1);
//     setFields(newFields);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare the data to be sent
//     const formData = fields.map(field => ({
//       question: field.name,
//       answer: field.value
//     }));

//     // Make a POST request to the Flask API
//     fetch('http://127.0.0.1:5000/save-data', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Data saved successfully:', data);
//         // Perform any further actions or update the UI as needed
//       })
//       .catch(error => {
//         console.error('Failed to save data:', error);
//         // Handle the error appropriately
//       });
//   };  

//   return (
//     <form onSubmit={handleSubmit} className="container">
//       {fields.map((field, index) => (
//         <div key={index} className="input-wrapper">
//           <label className='form'>
//             FRUITS NAME:
//             <input
//               type="text"
//               name="name"
//               value={field.name}
//               onChange={(e) => handleChange(index, e)}
//               placeholder="Enter the name"
//             />
//           </label>
//           <label className='form'>
//             QUANTITY:
//             <input
//               type="text"
//               name="value"
//               value={field.value}
//               onChange={(e) => handleChange(index, e)}
//               placeholder="Enter the value"
//             />
//           </label>
//           {fields.length > 1 && (
//             <button className='remove' type="button" onClick={() => removeField(index)}>
//               Remove
//             </button>
//           )}
//         </div>
//       ))}
//       <button className='addfield' type="button" onClick={addField}>
//         Add Field
//       </button>
//       <button className='final' type="submit">Submit</button>
//     </form>
//   );  
// };

// export default DynamicForm;



import React, { useState } from 'react';
import './form.css';
import Swal from 'sweetalert2';

const DynamicForm = () => {
  const [fields, setFields] = useState([{ name: '', value: '' }]);
  const [file, setFile] = useState(null);

  const handleChange = (index, event) => {
    const newFields = [...fields];
    newFields[index][event.target.name] = event.target.value;
    setFields(newFields);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const addField = () => {
    setFields([...fields, { name: '', value: '' }]);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    const isAnyFieldEmpty = fields.some((field) => field.name === '' || field.value === '');
    if (isAnyFieldEmpty) {
      // Display error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill in all the fields.',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Make a POST request to the Flask API
    fetch('http://127.0.0.1:5000/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data saved successfully:', data);
        // Reset the input fields
        setFields([{ name: '', value: '' }]);
        // Display success message with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Form submitted successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        // Perform any further actions or update the UI as needed
        // You can also redirect the user to another page
        // window.location.href = '/success-page';
      })
      .catch((error) => {
        console.error('Failed to save data:', error);
        // Handle the error appropriately
        Swal.fire({
          icon: 'error',
          title: 'Error occurred while submitting the form.',
          text: 'Please try again.',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div className="page">
      <h1 className="rcts">Raj Reddy Center for Technology and Society</h1>
      <div className="profile">
        <img
          className="iiit-img"
          src="https://mma.prnewswire.com/media/600789/IIIT_Hyderabad_Logo.jpg?p=publish"
          alt="iiit"
          width="400"
          height="420"
        />
        <form onSubmit={handleSubmit} className="container">
          {fields.map((field, index) => (
            <div key={index} className="input-wrapper">
              <label className="form">
                NAME:
                <select
                  name="name"
                  value={field.name}
                  onChange={(e) => handleChange(index, e)}
                >
                  <option value="">Select an option</option>
                  <option value="Apple">Apple</option>
                  <option value="Banana">Banana</option>
                  <option value="Orange">Orange</option>
                  <option value="Mango">Mango</option>
                  <option value="Papaya">Papaya</option>
                  <option value="Pineapple">Pineapple</option>
                  <option value="Guava">Guava</option>
                  <option value="Grapes">Grapes</option>
                  <option value="Cherry">Cherry</option>
                  <option value="Strawberry">Strawberry</option>
                  <option value="Lemon">Lemon</option>
                </select>
              </label>
              <label className="form">
                QUANTITY:
                <input
                  type="text"
                  name="value"
                  value={field.value}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter the value"
                />
              </label>
              {/* {fields.length > 1 && (
                <button
                  className="remove"
                  type="button"
                  onClick={() => removeField(index)}
                >
                  Remove
                </button>
              )} */}
            </div>
          ))}
          {/* <button className="addfield" type="button" onClick={addField}>
            Add Field
          </button> */}
          {/* <input type="file" onChange={handleFileChange} /> */}
          <button className="final" type="submit">
            Submit
          </button>
          <ul>
            <div className="from">
              <li>
                <a href="/home">FORMVISUALIZATION</a>
              </li>
            </div>
            <div className="excel">
              <li>
                <a href="/ExcelUploadPage">EXCELVISUALIZATION </a>
              </li>
            </div>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;

