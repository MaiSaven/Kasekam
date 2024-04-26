<?php
    include '../Configuration/configuration.php';
    include ('../Utils/Validation/UTvalidation.php');

    function deleteProduct($con){  
        try{
            // $_POST['ProId'] = '1200019';
            if(isset($_POST['ProId'])){
                
                UTvalidation::validateData($_POST['ProId']);
                
                $pro_id = $_POST['ProId'];
                
                $response = array();

                $sql = "DELETE FROM product_m where pro_id = '$pro_id'";

                $res = $con->query($sql);

                if($res){

                   $response = array('msg' => 'Delete prduct successfully.', 'strError' => '00');
                }
                else{
                    throw new Exception('Problam occur duing processing delete!');
                }

            }else{
                throw new Exception('Invalid request!');
            }

        }catch(Exception $e){

            $response = array('msg' => $e->getMessage(), 'strError' => '99');
        }

        return $response;
    }

    echo json_encode(deleteProduct($con));

?>