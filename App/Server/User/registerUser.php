<?php
    include ('../Configuration/configuration.php');
    include ('../Utils/Encryption/UTencryption.php');
    include ('../Utils/Validation/UTvalidation.php');

    header('Content-Type: application/json');


    function registerCustomer($con){

        $response = array();

        try{

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

            UTvalidation::validateData($firstName, $lastName, $gender, $birthday, $phoneNumber, $province, 
                            $district, $commune, $location, $telegram, $email, $password, $profile, $cover);

            if(isset($firstName) && ($firstName != '') ){

                $sql = "INSERT INTO kasekam.user_m 
                                (
                                    first_name, 
                                    last_name,
                                    gender,
                                    birthday,
                                    phone,
                                    telegram,
                                    province,
                                    district,
                                    commune,
                                    location,
                                    email,
                                    password,
                                    profile,
                                    cover,
                                    register_date_time
                                )
                                VALUES
                                (
                                    '$firstName', 
                                    '$lastName',
                                    '$gender',
                                    '$birthday',
                                    '$phoneNumber',
                                    '$telegram',
                                    '$province',
                                    '$district',
                                    '$commune',
                                    '$location',
                                    '$email',
                                    '$password',
                                    '$profile',
                                    '$cover',
                                     NOW()
                                )";

                $res = $con->query($sql);

                if($res){
                    
                    $response = array('msg' => 'Data received successfully.', 'strError' => '00' );
                }else{
                    $response = array('msg' => 'Data received error.', 'strError' => '99' );

                }
            }

        }catch (Exception $e){ 

            $response = array('msg' => $e->getMessage(), 'strError' => '99' );

        }

        return $response;

    }

    echo json_encode(registerCustomer($con));
?>