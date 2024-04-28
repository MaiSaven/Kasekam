<?php
    include '../Configuration/configuration.php';

    function retrieveProvince($con){
        try{

            $response = array();
            
            // $provId = isset($_POST['ProvId']) ? intval($_POST['ProvId']) : '';
            $provId = isset($_POST['Id']) ? intval($_POST['Id']) : '';

            $sql = "SELECT * FROM province_m";

            if (!empty($provId)) {
                $sql .= " WHERE prov_id = $provId";
            }

            $res = $con->query($sql);

            if($res){

                if($res->num_rows > 0){
                    
                    while( $rows = $res->fetch_assoc() ){

                        $data = array(
                            'ProvId'         => $rows['prov_id'],
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

    echo json_encode(retrieveProvince($con));

?>