<?php
class usertable {
    public $firstn;
    public $lastn;
    public $email;
    public $gender;
    public $mobile;

    private $conn;

    public function __construct($conn)
    {
        $this->conn=$conn;
        
    }
    public function addrow($obj){
        $sql="INSERT INTO users (firstn,lastn,email,gender,mobile) VALUES('$obj->firstn','$obj->lastn','$obj->email','$obj->gender','$obj->mobile');";
            $result=mysqli_query($this->conn,$sql);
            if($result==TRUE)
            {
                $msg=["Form successfully submitted"];
            }
            else
            {
                $msg=["Error occurred!!!"];
            }
            
            return json_encode($msg);
    }
    public function getdetails(){
        $sql="SELECT * FROM users;";
        $result=mysqli_query($this->conn,$sql);
        $arr=array();
        if(mysqli_num_rows($result)>0)
        {
            while($row=mysqli_fetch_assoc($result))
            {
                $arr[]=$row;
            }
        }
        return json_encode($arr);      
    }

}
?>