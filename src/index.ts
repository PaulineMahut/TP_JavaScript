import { SaveFile } from "./save-file.js";


const saveFile = 
new SaveFile(
 <HTMLInputElement>document.getElementById('form_control'),
 <HTMLInputElement>document.getElementById('_files'),
//  "_spinner",
//  "_submit"
 ).listenSubmitAndRun().listenChangeAndFilter(); //grâce au fait qu'on retourne this