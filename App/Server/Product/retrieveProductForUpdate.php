<?php
    include '../Configuration/configuration.php';
    include ('../Utils/Validation/UTvalidation.php');

    function retrieveProductForUpdate($con){  
        try{
            // $_POST['ProdId'] = '1200006';
            if(isset($_POST['ProId'])){
                
                UTvalidation::validateData($_POST['ProId']);
                
                $pro_id = $_POST['ProId'];
                
                $response = array();

                $sql = "SELECT * FROM product_m where pro_id = '$pro_id'";

                $res = $con->query($sql);

                if($res){

                    if($res->num_rows == 1){
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
                        throw new Exception('Data not found!');
                    }
                }
                else{
                    throw new Exception('Problam during get data!');
                }

            }else{
                throw new Exception('Invalid request!');
            }

        }catch(Exception $e){

            $response = array('msg' => $e->getMessage(), 'strError' => '99');
        }

        return $response;
    }

    echo json_encode(retrieveProductForUpdate($con));

?>