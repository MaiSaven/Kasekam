<?php
    include '../Configuration/configuration.php';

    function retrieveDistrict($con){
        try{
            
            $response = array();

            // $provId = isset($_POST['DistId']) ? intval($_POST['DistId']) : '';
            $commId = isset($_POST['Id']) ? intval($_POST['Id']) : '';

            $sql = "SELECT * FROM commune_m";

            if (!empty($commId)) {
                $sql .= " WHERE dist_id = $commId";
            }

            $res = $con->query($sql);

            if($res){

                if($res->num_rows > 0){
                    
                    while( $rows = $res->fetch_assoc() ){

                        $data = array(
                            'CommId'         => $rows['comm_id'],
                            'CommName'        => $rows['comm_name']
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

    echo json_encode(retrieveDistrict($con));

?>