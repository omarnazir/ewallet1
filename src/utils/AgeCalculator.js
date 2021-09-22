
export const calculateAge = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var ageNow = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        ageNow--;
    }
    console.log(ageNow);

    if (ageNow !== null)
        return ageNow;
    else
        return 0;
}