<?php
    include '../Configuration/configuration.php';
    include ('../Utils/Validation/UTvalidation.php');

    function retrieveProductByUser($con){ 

        $response = array();

        UTvalidation::validateData($_POST['UserId']);

        $user_id = $_POST['UserId'];
        
        if(isset($user_id)){

            $sql = "SELECT * FROM product_m where user_id = '$user_id' ";

            $res = $con->query($sql);
            
            while( $rows = $res->fetch_assoc() ){

                $data = array(
                    'ProId'         => $rows['pro_id'],
                    'UserId'        => $rows['user_id'],
                    'Name'          => $rows['pro_name'],
                    'Weight'        => $rows['weight'],
                    'WeightType'    => $rows['weight_type'],
                    'PriceAmount'   => $rows['price_amt'],
                    'Currency'      => $rows['currency'],
                    'QtyFrom'       => $rows['qty_from'],
                    'QtyTo'         => $rows['qty_to'],
                    'PeriodFrom'    => $rows['period_from'],
                    'PeriodTo'      => $rows['period_to'],
                    'ActivateYN'    => $rows['activeYN'],
                    'Description'   => $rows['description'],
                    'ImageId'       => $rows['image_id'],
                );

                array_push($response, $data);
            }

        }else{
            $response = array('msg' => 'Data not found!', 'strError' => '99');
        }

        return $response;
    }

    echo json_encode(retrieveProductByUser($con));

?>