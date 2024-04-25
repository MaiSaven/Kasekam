<?php
    include ('../Configuration/configuration.php');
    include ('../Utils/Validation/UTvalidation.php');

    header('Content-Type: application/json');


    function retrieveUserForHomePage($con){

        try{

            $response = array();

            $userId = $_POST['userId'];

            UTvalidation::validateData($userId);

            if(isset($userId)){
                
                $sql = "SELECT profile FROM user_m where userId ="."'$userId'"; 
                
                $res = $con->query($sql);
                
                if($res){
                    
                    while( $rows = $res->fetch_assoc() ){
    
                        $profile = $rows['profile'];
                        
                    }

                    if(isset($profile)){

                        $response = array('profile' => $profile);

                    }else{
                        throw new Exception('Profile not found!');
                    }

                }else{
                    throw new Exception('Problame during get user info!');
                }
                
            }

            $response['strError'] = '00';
            
        }catch (Exception $e){

            $response = array('msg' => $e->getMessage(), 'strError' => '99');
        }

        return $response;
    }

    echo json_encode(retrieveUserForHomePage($con));

?>