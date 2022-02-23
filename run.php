<?php
define(
    'IS_AJAX',
    isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'
);

if (!IS_AJAX) {
    die('Restricted access');
}

$file = isset($_FILES['file']['tmp_name']) ? $_FILES ['file']['tmp_name'] : '';
var_dump($_FILES, $_POST);
exit;
$responses = ['error' => 'false'];
$file_name = $_POST['file_name']; //clé qui contient le chemin temporaire vers le serveur


if (isset($_POST['file'])) {
    if ($_POST['file']  === 'undefined') {
        $responses[] = 'nonewfiles';
    }
}

if ($file !== '') {
    if (0 < $_FILES['file']['error']) {
        _addError();
        $responses[] = 'Erreur d\'ipload';
    } else {
        $authorized_format_file = [
            "image/jpeg",
            "image/jpg",
        ];

        //ce qu'on cherche dans le tableau qu'on cherche
        if (!in_array($_FILES['file']["type"], $authorized_format_file)) { //si format est bon, le test en front doit être fait en back aussi
            $responses[] = 'Format invalide';
            _addError();
        }
        
        $folder_user = "vds_" . ((string) rand(10000,900000) . '_' . time());

        while (is_dir($folder_user)) {
            $folder_user = "vds_" . ((string) rand(10000, 990000) . '_' . time()); //nom unique
        }

        $create_dir = mkdir($folder_user, 0755);

        if (move_uploaded_file($_FILES['file']['tmp_name'], $folder_user . '/' . $file_name)) {
            $responses [] = 'Convert successfully';
        } else {
            $responses [] = 'Convert with errors';
        }
    }
}

if ($responses['error'] == 'false') {
    unset($reponses['error']); //supprime la chaine de caractères
}

print json_encode($responses);

function _addError() {
    $responses['error'] = 'true';
    print json_encode($responses);
    exit;
}

