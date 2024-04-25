<?php
    include ('../Configuration/configuration.php');
    include ('../Utils/Encryption/UTencryption.php');
    include ('../Utils/Validation/UTvalidation.php');

    header('Content-Type: application/json');


    function retrieveUserForLogin($con){

        try{

            $response = array();

            $email = $_POST['email'];
            $password = $_POST['password'];

            UTvalidation::validateData($email, $password);

            if(isset($email)){
                
                $sql = "SELECT * FROM user_m where email ="."'$email'"; 
                
                $res = $con->query($sql);
                
                if($res){
                    
                    while( $rows = $res->fetch_assoc() ){
    
                        $userId = $rows['userId'];
                        $pass =  UTencryption::decryptString($rows['password']);
                        
                    }

                    if(isset($userId)){

                        if($password == $pass){

                            $response = array('userId' => $userId, 'password' => $pass);
                        }else{
                            throw new Exception('Password is wrong!');
                        }

                    }else{
                        throw new Exception('User not found!');
                    }

                }else{
                    throw new Exception('Problame during login!');
                }
                
            }

            $response['strError'] = '00';
            
        }catch (Exception $e){

            $response = array('msg' => $e->getMessage(), 'strError' => '99');
        }

        return $response;
    }

    echo json_encode(retrieveUserForLogin($con));

?>