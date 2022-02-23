var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SaveFile_fileList, _SaveFile_formData, _SaveFile_form, _SaveFile_fileInput;
export class SaveFile {
    constructor(form, fileField) {
        // Private (#)
        _SaveFile_fileList.set(this, void 0);
        _SaveFile_formData.set(this, void 0);
        _SaveFile_form.set(this, void 0);
        _SaveFile_fileInput.set(this, void 0);
        __classPrivateFieldSet(this, _SaveFile_fileList, [], "f");
        __classPrivateFieldSet(this, _SaveFile_formData, new FormData(), "f");
        __classPrivateFieldSet(this, _SaveFile_fileInput, fileField, "f");
        __classPrivateFieldSet(this, _SaveFile_form, form, "f");
    }
    listenSubmitAndRun() {
        __classPrivateFieldGet(this, _SaveFile_form, "f")?.addEventListener("submit", (e) => {
            e.preventDefault();
            this.fetchSaveFiles();
        });
        return this;
    }
    // DADAADADADAADADADADAADA
    listenChangeAndFilter() {
        __classPrivateFieldGet(this, _SaveFile_fileInput, "f")?.addEventListener("change", (e) => {
            __classPrivateFieldSet(this, _SaveFile_fileList, [], "f"); //vide le tableau avant de le remplir à nouveau
            // if (self.#fileInput !== null && self.#fileInput?.files?.length) {
            //     for (let i = 0; i < self.#fileInput?.files.length; i++) {
            //         self.#fileList.push(self.#fileInput.files[i]);
            //     }
            // }
            if (__classPrivateFieldGet(this, _SaveFile_fileInput, "f") && __classPrivateFieldGet(this, _SaveFile_fileInput, "f").files !== null) {
                for (let i = 0; i < __classPrivateFieldGet(this, _SaveFile_fileInput, "f")?.files.length; i++) {
                    __classPrivateFieldGet(this, _SaveFile_fileList, "f").push(__classPrivateFieldGet(this, _SaveFile_fileInput, "f").files[i]);
                }
            }
        });
        return this;
    }
    fetchSaveFiles() {
        console.log(SaveFile.authorized_format_file);
        if (__classPrivateFieldGet(this, _SaveFile_fileList, "f")?.length < 1) {
            alert("Add a Image");
            return false;
        }
        if (__classPrivateFieldGet(this, _SaveFile_fileList, "f")?.length > 3) {
            alert("You can only upload a maximum of 3 files");
            return false;
        }
        let isImageFile = true;
        let instance = this;
        __classPrivateFieldGet(this, _SaveFile_fileList, "f").forEach(function (file) {
            if (SaveFile.authorized_format_file?.includes(file?.type)) { //si le type est bon, lance saveFiles
                instance.saveFiles(file);
            }
            else {
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
    saveFiles(file) {
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
            data: __classPrivateFieldGet(this, _SaveFile_formData, "f"),
            type: 'post',
            success: function (response) {
                if (response.error !== undefined) {
                    return false;
                }
                let mon_message = response[0] ? response[0] : "";
                let html = `<div class="px-5">
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
            error: function (error) {
                console.log(error);
            }
        });
    }
}
_SaveFile_fileList = new WeakMap(), _SaveFile_formData = new WeakMap(), _SaveFile_form = new WeakMap(), _SaveFile_fileInput = new WeakMap();
// private spinnerClass: string;
// private submitButtonCLass: string;
SaveFile.authorized_format_file = ["image/jpeg", "image/jpg"];
//# sourceMappingURL=save-file.js.map