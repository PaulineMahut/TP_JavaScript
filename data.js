// let fileList = []; //contient liste de nos fichiers
// let spinner = document.querySelector(".hidden-spinner");
// let fileInput = document.getElementById('_files'); //récupère la balise input qui a tous nos fichiers
// fileInput.addEventListener('change', function() { //des qu'il change, vérifie si le type est bien inclut dans le tableau
//     fileList = []
//     for (let i = 0; i < fileInput.files.length; i++) {
//         fileList.push(fileInput.files[i]); //clé files contient un tableau avec tous les fichiers enregistrés dans notre champs, push dans le tableau.
//     }
// });

// const fetchSaveFiles = () => {
//     let authorized_format_file = [
//         "image/jpeg",
//         "image/jpg",
//     ];

//     if (fileList.length < 1) {
//         alert("Add a video");
//         return false;
//     }

//     if (fileList.length > 3) {
//         alert("You can only upload a maximum of 3 files");
//         return false;
//     }

//     let checkedFile = 0;

//     let isImageFile = true;
//     fileList.forEach(function(file) {
//         if (authorized_format_file.includes(file.type)) { //si le type est bon, lance saveFiles
//             saveFiles(file);
//         } else {
//             alert("You can only upload .av or .avi files");
//             isImageFile = false;
//         }
//     });

//     return isImageFile;
// }

// function saveFiles(file) {
//     var formData = new FormData();
//     formData.set('file', file);
//     formData.set('file_name', file.name);

//     // Spinner
//     spinner.classList.remove('hidden-spinner');


//     $.ajax({
//         url: '/run.php',
//         dataType: 'json',
//         cache: false,
//         contentType: false,
//         processData: false,
//         data: formData,
//         type: 'POST',
//         success: function(response) {
//             response = JSON.parse(response);
//             if (response.error !== 'true') {
//                 return false;
//             }
//             let mon_message = response[0] ? response[0] : "";
//             let html =
//                 `<div class="px-5">
//                     <span class="text-light">${mon_message}</span>
//                 </div>`;

//             $("#form_controller").append($(html));


//             // Spinner 
//             if (checkedFile = fileList) {
//                 console.log("ça marche mon reuf mtn laisse moi dormir stp");
//                 spinner.classList.add('hidden-spinner');
//             } else {
//                 console.log("ça va pas du tout mon reuf");
//             }

//         },

//         error: function(error) {
//             console.log(error);
//         }
//     });
// }



// $("#form_control").on("submit", (e) => { //cible formulaire et écoute un event submit
//     e.preventDefault();
//     fetchSaveFiles();
// })