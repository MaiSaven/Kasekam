<?php
    include ('../Configuration/configuration.php');
    include ('../Utils/Encryption/UTencryption.php');
    include ('../Utils/Validation/UTvalidation.php');

    header('Content-Type: application/json');


    function updateUserInfo($con){

        $response = array();

        try{
            // UTvalidation::validateData($_POST['userId'], $_POST['firstName'], $_POST['lastName'], $_POST['gender'], $_POST['birthday'], 
            //                            $_POST['phoneNumber'], $_POST['province'], $_POST['district'], $_POST['commune'], $_POST['location'],
            //                            $_POST['telegram'], $_POST['emailpppp'], $_POST['password'], $_POST['imgProfile'], $_POST['imgCover']);

            $userId         = $_POST['userId'];
            $firstName      = $_POST['firstName'];
            $lastName       = $_POST['lastName'];
            $gender         = $_POST['gender'];
            $birthday       = $_POST['birthday'];
            $phoneNumber    = $_POST['phoneNumber'];
            $province       = $_POST['province'];
            $district       = $_POST['district'];
            $commune        = $_POST['commune'];
            $location       = $_POST['location'];
            $telegram       = $_POST['telegram'];
            $email          = $_POST['email'];
            $password       = UTencryption::encryptString($_POST['password']);
            $profile        = $_POST['imgProfile'];
            $cover          = $_POST['imgCover'];

            UTvalidation::validateData($userId, $firstName, $lastName, $gender, $birthday, $phoneNumber, $province, 
                            $district, $commune, $location, $telegram, $email, $password, $profile, $cover);

            $sql = "UPDATE `user_m` SET
                         first_name          = '$firstName'
                        ,last_name           = '$lastName'
                        ,gender              = '$gender'
                        ,birthday            = '$birthday'
                        ,phone               = '$phoneNumber'
                        ,telegram            = '$telegram'
                        ,province            = '$province'
                        ,district            = '$district'
                        ,commune             = '$commune'
                        ,location            = '$location'
                        ,email               = '$email'
                        ,password            = '$password'
                        ,profile             = '$profile'
                        ,cover               = '$cover'
                        ,register_date_time  =  NOW()
                    WHERE userId             = '$userId'";

            $res = $con->query($sql);

            if($res){
                
                $response = array('msg' => 'Data received successfully.', 'strError' => '00' );
            }else{

                throw new Exception('Data received error.');
            }

        }catch (Exception $e){ 

            $response = array('msg' => $e->getMessage(), 'strError' => '99' );
        }

        return $response;

    }

    echo json_encode(updateUserInfo($con));
?>