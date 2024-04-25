<?php
    include '../Configuration/configuration.php';
    include ('../Utils/Validation/UTvalidation.php');

    header('contentType:application/json');

    function updateProductInfo($con){
        
        try{

            $response = array();

            UTvalidation::validateData($_POST['ProId'], $_POST['Name'], $_POST['Weight'], $_POST['WeightType'], $_POST['PriceAmount'], $_POST['Currency'], 
                                        $_POST['QuantityFrom'], $_POST['QuantityTo'], $_POST['PeriodFrom'], $_POST['PeriodTo'], $_POST['Description'], $_POST['ImageItem']);

            $ProId        = $_POST['ProId'];
            $Name         = $_POST['Name'];
            $Weight       = $_POST['Weight'];
            $WeightType   = $_POST['WeightType'];
            $PriceAmount  = $_POST['PriceAmount'];
            $Currency     = $_POST['Currency'];
            $QuantityFrom = $_POST['QuantityFrom'];
            $QuantityTo   = $_POST['QuantityTo'];
            $PeriodFrom   = $_POST['PeriodFrom'];
            $PeriodTo     = $_POST['PeriodTo'];
            $Description  = $_POST['Description'];
            $ImageItem    = $_POST['ImageItem'];

            $sql = "UPDATE `product_m` SET
                         pro_name       = '$Name'
                        ,weight         =  $Weight
                        ,weight_type    = '$WeightType'
                        ,price_amt      =  $PriceAmount
                        ,currency       = '$Currency'
                        ,qty_from       =  $QuantityFrom
                        ,qty_to         =  $QuantityTo
                        ,period_from    = '$PeriodFrom'
                        ,period_to      = '$PeriodTo'
                        ,description    = '$Description'
                        ,activeYN       = 'Y'
                        ,image_id       = '$ImageItem'
                        ,update_dt      =  Now()
                    WHERE pro_id        = '$ProId'";

            $res = $con->query($sql);

            if($res){
                
                $response = array('msg' => 'Data received successfully.', 'strError' => '00');
            }else{
                
                throw new Exception('Data received fail.');
            }

        } catch(Exception $e){

            $response = array('msg' => $e->getMessage(), 'strError' => '99' );
        }

        return $response;
    }
    
    echo json_encode(updateProductInfo($con));
?>