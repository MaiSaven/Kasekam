<?php

class UTvalidation{
    public static function validateData(...$data) {
        foreach($data as $field) {
            if(!isset($field) || empty($field)){
                throw new Exception("Validation field!");
            }
        }
    }
}

?>