// import React, { useState } from 'react';
// import './Exceluploadpage.css';

// function ExcelUploadPage() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       fetch('http://localhost:5000/upload', {
//         method: 'POST',
//         body: formData,
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log(data);
//         })
//         .catch(error => {
//           console.error('Error uploading file:', error);
//         });
//     }
//   };

//   return (
//     <div className='all'>
//       <h1>Upload Excel File</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <div className='out'>
//       <a href="pie" onClick={handleUpload}>
//         <button>Submit</button>
//       </a>
//     </div>
 
//     </div>
//   );
// }

// export default ExcelUploadPage;

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Exceluploadpage.css';


function ExcelUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    } else {
      Swal.fire('Oops!', 'Please choose a file before uploading.', 'error');
    }
  };

  return (
    
    <div className='all'>
    
      <h1>Upload Excel File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* <div className='in'>
        <a href="" onClick={handleUpload}>
          <button>Upload</button>
        </a>
      
      </div> */}
      <div className='out'>
        <a href="pie" onClick={handleUpload}>
          <button>Submit</button>
        </a>
      </div>
    </div>
  );
}

export default ExcelUploadPage;
