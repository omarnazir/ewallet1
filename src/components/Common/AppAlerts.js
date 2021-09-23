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

function DeleteAlert(title="Are you sure?",text="This action can not be reversed",message,icon="warning"){
    return swal(
        {
            position: 'center',
            icon: icon,
            title:title,
            text: text,
            buttons: ['No, Thanks','Yes, Delete'],
            confirmButton:"btn btn-danger",
            cancelButton:"btn",
            dangerMode:true
          }
    )
}

export {SuccessAlert,DeleteAlert}