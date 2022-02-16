let fileList = [];
let fileInput = document.getElementById('_files');
fileInput.addEventListener('change', function() {
    fileList = []
    for (let i = 0; i < fileInput.files.length; i++) {
        fileList.push(fileInput.files[i]);
    }
})

const fetchSaveFiles = () => {
    let authorized_format_file = [
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

    let isImageFile = true;
    fileList.forEach(function(file) {
        if (authorized_format_file.includes(file.type)) {
            saveFiles(file);
        } else {
            alert("You can only upload .av or .avi files");
            isImageFile = false;
        }
    });

    return isImageFile;
}

function saveFiles(file) {
    var formData = new FormData();
    formData.set('file', file);
    formData.set('file_name', file.name);

    $.ajax({
        url: '/run.php',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        type: 'POST',
        success: function(response) {
            response = JSON.parse(response);
            if (response.error !== undefined) {
                return false;
            }
            let mon_message = response[0] ? response[0] : "";
            let html =
                `<div class="px-5">
                    <span class="text-light">${mon_message}</span>
                </div>`;

            $("#form_controller").append($(html));
        },

        error: function(error) {
            console.log(error);
        }
    });
}



$("#form_control").on("submit", (e) => {
    let spinner = document.querySelector(".hidden-spinner");
    spinner.classList.remove('hidden-spinner');
    e.preventDefault();
    fetchSaveFiles();
    let spiinner = document.getElementById("yo");
    spiinner.classList.add('hidden-spinner');

})