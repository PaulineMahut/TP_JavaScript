<?php
define(
    'IS_AJAX',
    isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'
);

if (!IS_AJAX) {
    die('Restricted access');
}

$file = isset($_FILES['files'] ['tmp_name']) ? $_FILES ['files']['tmp_name'] : '';
$responses = ['error' => 'false'];
$file_name = $_POST['file_name'];


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

        if (!in_array($_FILES['file']["type"], $authorized_format_file)) {
            $responses[] = 'Format invalide';
            _addError();
        }
        
        $folder_user = "vds_" . ((string) rand(10000,900000) . '_' . time());

        while (is_dir($folder_user)) {
            $folder_user = "vds_" . ((string) rand(10000, 990000) . '_' . time());
        }

        $create_dir = mkdir($folder_user, 0755);

        if (move_uploaded_file($_FILES['file']['tmp_name'], $folder_user . '/' . $file_name)) {
            $responses [] = 'Convert successfully';
        } else {
            $responses [] = 'Convert with errors';
        }
    }
}

function _addError() {
    $responses['error'] = 'true';
    // print json_encode($responses);
    exit;
}

if ($responss['error'] = 'false') {
    unset($reponses['error']);
}

print json_encode($responses);
