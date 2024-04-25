<?php
    // include '../Configuration/configuration.php';

    // header('contentType:application/json');

    // $response = array();

    // $UserId       = $_POST['UserId'];
    // $Name         = $_POST['Name'];
    // $Weight       = $_POST['Weight'];
    // $WeightType   = $_POST['WeightType'];
    // $PriceAmount  = $_POST['PriceAmount'];
    // $Currency     = $_POST['Currency'];
    // $QuantityFrom = $_POST['QuantityFrom'];
    // $QuantityTo   = $_POST['QuantityTo'];
    // $PeriodFrom   = $_POST['PeriodFrom'];
    // $PeriodTo     = $_POST['PeriodTo'];
    // $Description  = $_POST['Description'];
    // $ImageItem    = $_POST['ImageItem'];

    // if(isset($_POST['Name']) && ($_POST['Name'] != '') ){

    //     $sql = "INSERT INTO kasekam.product_m 
    //                         (
    //                             user_id,
    //                             pro_name,
    //                             weight,
    //                             weight_type,
    //                             price_amt,
    //                             currency,
    //                             qty_from,
    //                             qty_to,
    //                             period_from,
    //                             period_to,
    //                             description,
    //                             activeYN,
    //                             image_id,
    //                             register_dt,
    //                             update_dt
    //                         )
    //                         VALUES
    //                         (
    //                             '$UserId',
    //                             '$Name',
    //                              $Weight,
    //                             '$WeightType',
    //                              $PriceAmount,
    //                             '$Currency',
    //                              $QuantityFrom,
    //                              $QuantityTo,
    //                             '$PeriodFrom',
    //                             '$PeriodTo',
    //                             '$Description',
    //                             'Y',
    //                             '$ImageItem',
    //                              Now(),
    //                              Now()
    //                         );";

    //     $res = $con->query($sql);

    //     if($res){
            
    //         $response = array('msg' => 'Data received successfully.');
    //     }

    // }else{

    //     $response = array('msg' => 'Data received fail.');
    // }
    
    // echo json_encode($response);

    //================================


    include '../Configuration/configuration.php';
    include ('../Utils/Validation/UTvalidation.php');

    header('contentType:application/json');

    function registerProduct($con){
        
        try{

            $response = array();

            UTvalidation::validateData($_POST['UserId'], $_POST['Name'], $_POST['Weight'], $_POST['WeightType'], $_POST['PriceAmount'], $_POST['Currency'], 
                                        $_POST['QuantityFrom'], $_POST['QuantityTo'], $_POST['PeriodFrom'], $_POST['PeriodTo'], $_POST['Description'], $_POST['ImageItem']);

            $UserId       = $_POST['UserId'];
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

            $sql = "INSERT INTO kasekam.product_m 
                            (
                                user_id,
                                pro_name,
                                weight,
                                weight_type,
                                price_amt,
                                currency,
                                qty_from,
                                qty_to,
                                period_from,
                                period_to,
                                description,
                                activeYN,
                                image_id,
                                register_dt,
                                update_dt
                            )
                            VALUES
                            (
                                '$UserId',
                                '$Name',
                                 $Weight,
                                '$WeightType',
                                 $PriceAmount,
                                '$Currency',
                                 $QuantityFrom,
                                 $QuantityTo,
                                '$PeriodFrom',
                                '$PeriodTo',
                                '$Description',
                                'Y',
                                '$ImageItem',
                                 Now(),
                                 Now()
                            );";

            $res = $con->query($sql);

            if($res){
                
                $response = array('msg' => 'Register new product is successfully.', 'strError' => '00');
            }else{
                
                throw new Exception('Register fail!');
            }

        } catch(Exception $e){

            $response = array('msg' => $e->getMessage(), 'strError' => '99' );
        }

        return $response;
    }
    
    echo json_encode(registerProduct($con));

?>

