<?php
    include ('../Configuration/configuration.php');
    include ('../Utils/Validation/UTvalidation.php');
    include ('../Utils/Encryption/UTencryption.php');

    header('Content-Type: application/json');


    function retrieveUserInfo($con){

        try{

            $response = array();

            // $_POST['UserId'] = 10092;
            
            if(isset($_POST['UserId'])){

                UTvalidation::validateData($_POST['UserId']);

                $userId = $_POST['UserId'];
                
                $sql = "SELECT * FROM user_m where userId ="."'$userId'"; 
                
                $res = $con->query($sql);

                if($res){

                    if($res->num_rows == 1){
                        while( $rows = $res->fetch_assoc() ){
        
                            $data = array(
                                'UserId'             => $rows['userId'],
                                'Email'              => $rows['email'],
                                'First_name'         => $rows['first_name'],
                                'Last_name'          => $rows['last_name'],
                                'Gender'             => $rows['gender'],
                                'Birthday'           => $rows['birthday'],
                                'Phone'              => $rows['phone'],
                                'Telegram'           => $rows['telegram'],
                                'Province'           => $rows['province'],
                                'District'           => $rows['district'],
                                'Commune'            => $rows['commune'],
                                'Location'           => $rows['location'],
                                'Password'           => UTencryption::decryptString($rows['password']),
                                'Profile'            => $rows['profile'],
                                'Cover'              => $rows['cover'],
                                'Register_date_time' => $rows['register_date_time'],
                            );
        
                            array_push($response, $data);
                        }
                    }else{
                        throw new Exception('Data not found!');
                    }
                }
                else{
                    throw new Exception('Problam during get data!');
                }
            }
            
        }catch (Exception $e){

            $response = array('msg' => $e->getMessage(), 'strError' => '99');
        }

        return $response;
    }

    echo json_encode(retrieveUserInfo($con));

?>