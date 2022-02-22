let fileList: File []; //contient liste de nos fichiers
let spinner = document.querySelector(".hidden-spinner");
let fileInput: HTMLInputElement | null = <HTMLInputElement>(
    document.getElementById('_files')
    ); //récupère la balise input qui a tous nos fichiers

fileInput?.addEventListener('change', function() { //des qu'il change, vérifie si le type est bien inclut dans le tableau
    fileList = [];

    if (fileInput !== null && fileInput.files !== null) {
        for (let i = 0; i < fileInput.files.length; i++) {
            fileList.push(fileInput.files[i]);
        }
    }
});

var authorized_format_file: string [] =
    [
        "image/jpeg",
        "image/jpg",
    ];

function fetchSaveFiles(): Boolean {
    var authorized_format_file: string[] =
    [
        "image/jpeg",
        "image/jpg",
    ];

    if (fileList.length < 1) {
        alert("Add a video");
        return false;
    }

    if (fileList.length > 3) {
        alert("You can only upload a maximum of 3 files");
        return false;
    }

    let isImageFile: Boolean = true;
    fileList.forEach(function(file: File) {
        if (authorized_format_file?.includes(file?.type)) { //si le type est bon, lance saveFiles
            saveFiles(file);
        } else {
            alert("You can only upload .av or .avi files");
            isImageFile = false;
        }
    });

    return isImageFile;
}
                      

function saveFiles(file: File) {
    var formData = new FormData();
    formData?.set('file', file);
    formData?.set('file_name', file?.name);

    // Spinner
    // spinner.classList.remove('hidden-spinner');


    $.ajax({
        url: '/run.php',
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        type: 'POST',

        success: function(response: serveurResponse) {
            if (response.error !== undefined) {
                return false;
            }
            let mon_message : string = response[0] ? response[0] : "";
            let html: string =
                `<div class="px-5">
                    <span class="text-light">${mon_message}</span>
                </div>`;

            $("#form_controller").append($(html));


            // Spinner 
            // if (checkedFile = fileList) {
            //     console.log("ça marche mon reuf mtn laisse moi dormir stp");
            //     spinner.classList.add('hidden-spinner');
            // } else {
            //     console.log("ça va pas du tout mon reuf");
            // }

        },

        error: function(error: JQuery.jqXHR<any>) {
            console.log(error);
        }
    });
}

type serveurResponse = {error?: string, "0":string}


