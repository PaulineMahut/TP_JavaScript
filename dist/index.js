import { SaveFile } from "./save-file.js";
const saveFile = new SaveFile(document.getElementById('form_control'), document.getElementById('_files')).listenSubmitAndRun().listenChangeAndFilter(); //grâce au fait qu'on retourne this
//# sourceMappingURL=index.js.map