function calculateAge(dateOfBirth) {
     var today = new Date();
     var birthDate = new Date(dateOfBirth);
     var age = today.getFullYear() - birthDate.getFullYear();
     var monthDiff = today.getMonth() - birthDate.getMonth();
     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
         age--;
     }
     return age;
}