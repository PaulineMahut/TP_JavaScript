export class SaveFile {
    // Private (#)
    #fileList : File [];
    #formData: FormData;
    #form: HTMLInputElement | null;
    #fileInput : HTMLInputElement | null;
    // private spinnerClass: string;
    // private submitButtonCLass: string;
    static authorized_format_file: string[] = ["image/jpeg", "image/jpg"];

    constructor(
        form : HTMLInputElement | null, 
        fileField : HTMLInputElement | null 
        ) {
        this.#fileList = [];
        this.#formData = new FormData();
        this.#fileInput = fileField;
        this.#form = form;
    }

    listenSubmitAndRun() : this { 
        this.#form?.addEventListener("submit", (e : Event) : void => { //si form n'est pas null, ajoute 
            e.preventDefault();            
            this.fetchSaveFiles();
        });

        return this;
        
    }


    // DADAADADADAADADADADAADA
    listenChangeAndFilter() : this { 
        this.#fileInput?.addEventListener("change", (e: Event): void => {
            this.#fileList = []; //vide le tableau avant de le remplir à nouveau

            // if (self.#fileInput !== null && self.#fileInput?.files?.length) {
            //     for (let i = 0; i < self.#fileInput?.files.length; i++) {
            //         self.#fileList.push(self.#fileInput.files[i]);
            //     }
            // }

            if (this.#fileInput && this.#fileInput.files !== null) {
                for (let i = 0; i < this.#fileInput?.files.length; i++) {
                    this.#fileList.push(this.#fileInput.files[i]);
                }
            }
        
        });

        return this;
        
    }

    fetchSaveFiles() : void | Boolean {
        console.log(SaveFile.authorized_format_file);
        
    
       
        if (this.#fileList?.length < 1) {
            alert("Add a Image");
            return false;
        }
    
        if (this.#fileList?.length > 3) {
            alert("You can only upload a maximum of 3 files");
            return false;
        }
    
        let isImageFile: Boolean = true;
        let instance = this;
        this.#fileList.forEach(function(file: File) {
            if (SaveFile.authorized_format_file?.includes(file?.type)) { //si le type est bon, lance saveFiles
                instance.saveFiles(file);
            } else {
                alert("You can only upload .av or .avi files");
                isImageFile = false;
            }
        });

        return isImageFile;
    }

    // toggleSpinner(): void{
    //     $(`.${this.spinnerClass}`).toggleClass("visually-hidden");
    //     $(`.${this.submitButtonClass}`).toggleClass("visually-hidden");
    // }


    saveFiles(file: File) {
        var formData = new FormData();
        console.log(file instanceof File);
        
        formData?.set('file', file); // définit une nouvelle valeur pour une clé existante dans un objet formData, ou ajoute la clé et sa valeur si elle n'existe pas
        formData?.set('file_name', file?.name);
    
        // Spinner
        // spinner.classList.remove('hidden-spinner');
    
    
        $.ajax({
            url: 'run.php',
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data: this.#formData,
            type: 'post',

            success: function(response: serveurResponse) {
                if (response.error !== undefined) {
                    return false;
                }
                let mon_message : string = response[0] ? response[0] : "";
                let html: string =
                    `<div class="px-5">
                        <span class="text-light">${mon_message}</span>
                    </div>`;
    
                $("#form_control").append($(html));
    
    
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
}    

type serveurResponse = {error?: string, "0":string}