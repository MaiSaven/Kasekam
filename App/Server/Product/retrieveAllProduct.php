<?php
    include '../Configuration/configuration.php';

    // phpinfo();

    function retrieveAllProduct($con){  

        $response = array();

        // $proId = $_POST['proId'];
        // $prodName = 'គ';
        $prodName = $_POST['search'];

        // $sql = "SELECT * FROM product_m";
        $sql = "SELECT * FROM product_m WHERE pro_name LIKE COALESCE('%$prodName%', pro_name)";

        $res = $con->query($sql);

        if($res){

            if($res->num_rows != 0){
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
        }
        else{
            $response = array('msg' => 'Problam during get data!', 'strError' => '99');
        }

        return $response;
    }

    echo json_encode(retrieveAllProduct($con));

?>