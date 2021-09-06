<?php
 
if($_POST) {
  $to = "samuel.mormin@gmail.com"; // your mail here
  $name = filter_var($_POST["name"], FILTER_SANITIZE_EMAIL);
  $phone = filter_var($_POST["phone"], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST["email"], FILTER_SANITIZE_STRING);
  $body = "Message: $name\nE-mail: $email\nPhone: $phone";
  
  //mail headers are mandatory for sending email
  $headers = 'From: ' .$email . "\r\n". 
  'Reply-To: ' . $email. "\r\n" . 
  'X-Mailer: PHP/' . phpversion();
 
  if(@mail($to, $name, $body, $headers)) {
    $output = json_encode(array('success' => true));
    die($output);
  } else {
    $output = json_encode(array('success' => false));
    die($output);
  }
}