<?php
    include '../Configuration/configuration.php';

    header('contentType:application/json');

    $response = array();

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

    if(isset($_POST['Name']) && ($_POST['Name'] != '') ){

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
            
            $response = array('msg' => 'Data received successfully.');
        }

    }else{

        $response = array('msg' => 'Data received fail.');
    }
    
    echo json_encode($response);





    // echo "oklsdfjds";

    // $sql = "INSERT INTO kasekam.product_m (prod_id,user_id,pro_name,weight,weight_type,price_amt,currency,qty_from,qty_to,period_from,period_to,activeYN,image_id,register_dt,update_dt) VALUES
    // ('pro0000003','cus0000003','Test Prod',1,'kg',1000,'KHR',10,100,'2024-03-16','2024-03-30','Y','',Now(),Now());";

    // $res = $con->query($sql);

    // if($res){
    //     echo "llll";
    // }

?>