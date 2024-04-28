<?php
    include '../Configuration/configuration.php';
    include ('../Utils/Validation/UTvalidation.php');


    function retrieveAddressDetail($con){
        try{

            $response = array();

            // $_POST['CommId'] = 1101201003;
            // $CommId = isset($_POST['CommId']) ? intval($_POST['CommId']) : '';

            UTvalidation::validateData($_POST['CommId']);

            $CommId = $_POST['CommId'];

            $sql = "SELECT c.comm_name 
                         , d.dist_name
                         , p.prov_name
                      FROM commune_m c
                     inner JOIN district_m d
                        on c.dist_id = d.dist_id
                     inner JOIN province_m p
                        ON d.prov_id = p.prov_id
                     WHERE c.comm_id = $CommId ";

            $res = $con->query($sql);

            if($res){

                if($res->num_rows > 0){
                    
                    while( $rows = $res->fetch_assoc() ){

                        $data = array(
                            'CommName'        => $rows['comm_name'],
                            'DistName'        => $rows['dist_name'],
                            'ProvName'        => $rows['prov_name']
                        );

                        array_push($response, $data);
                    }
                    
                }else{
                    throw new Exception('Data not found!');
                }
            }
            else{
                throw new Exception('Problam during retrieve data!');
            }

        }catch(Exception $e){

            $response = array('msg' => $e->getMessage(), 'strError' => '99');
        }

        return $response;
    }

    echo json_encode(retrieveAddressDetail($con));

?>