export function hello(world:string = "world"): string {
    return `Hello ${world}!`;
}



// fileInput?.addEventListener('change', function(e) {
//     fileList.clear();

//     if (fileList !== null && fileInput.files !== null) {
//         for (var i = 0; i < fileInput.files.length; i++) {
//             if (!authorized_format_file.includes(fileInput.files[i]?.type)) {
//                 alert(`
//                 You can only upload ${authorized_format_file[0]} or ${authorized_format_file[1]}
//                 The file ${fileInput?.files[i]?.name} did not upload
//                 `);
                
//                 continue;
//             }
//             fileInput?.add(fileInput.files[i]);
//         }
//     }
   
// });
