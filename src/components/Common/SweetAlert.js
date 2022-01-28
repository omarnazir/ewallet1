import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);


function showAlert(message,icon='success'){
    return MySwal.fire({position: 'center',
    icon: icon,
    title: message,
    text:"",
    showConfirmButton: false,
    timer: 1500})
  }


// function showAlert(){
//  return  MySwal({
//     title: "Are you sure?",
//     text: "Once deleted, you will not be able to recover this imaginary file!",
//     icon: "warning",
//     buttons: true,
//     dangerMode: true,
//   })
//   .then((willDelete) => {
//     if (willDelete) {
//       MySwal("Poof! Your imaginary file has been deleted!", {
//         icon: "success",
//       });
//     } else {
//       ("Your imaginary file is safe!");
//     }
//   });
// }
 

export { showAlert };