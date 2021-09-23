import swal from '@sweetalert/with-react'

function SuccessAlert(message,icon="success"){
    swal(
        {
          position: 'center',
          icon: icon,
          title:"",
          text: message,
          buttons: false,
          timer: 1500
        }
      )
}

function DeleteAlert(title="Are you sure?",text="Delete action can not be reversed",message,icon="warning"){
    return swal(
        {
            position: 'center',
            icon: icon,
            title:title,
            text: text,
            buttons: ['No, Thanks','Yes, Delete'],
            dangerMode:true
          }
    )
}

export {SuccessAlert,DeleteAlert}