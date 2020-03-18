<!DOCTYPE html>
<html>
  
  <?php
     $checked = implode(', ', $_POST['checkbox[]']);
     
     
     echo "<head><title> Purchase Review </title>";
     echo "<link rel='stylesheet' type='text/css' href='stylesheet.css'></head>";
     echo "<body><div class ='background'></div>

    <div class='headerBar'></div>
    
    <h1 id = 'top'
        class = 'brand'>
      <a href = 'week07.html'> <em>Book Addict</em></a></h1><br /><br />
    
    <p class = 'slogan'> CARPE LIBRUM </p>
    
    <form action = ' '><p><input type = 'text' name = 'store'
                                 class = 'search'
                                 placeholder = 'search the store'> </p></form>  
    <hr class = 'stop'/>

    <table class = 'archive'>
      <tr>
        <td>
          <a href = 'store.html#fantasy'
             class = 'fantasy'> FANTASAY </a></td>
        <td>
          <a href = 'store.html#scifi'
             class = 'scifi' > SCIENCE FICTION </a></td>
        <td>
          <a href = 'store.html#fiction'
             class = 'fiction'> FICTION </a></td>
        <td>
          <a href = 'store.html#romance'
             class = 'romance'> ROMANCE </a></td>
        <td>
          <a href = 'store.html#ya'
             class = 'ya' > YOUNG ADULT </a></td></tr></table>";

    echo "<h1 style='text-align:center'> Thank You For Your Interest. <br />
      Before we continue please verify your information</h1>";
    echo "<table style='background-color:#eee;'>
      <tr><td>Name: " . $_POST['fn'] . 
          " " . $_POST['ln'] . "</td></tr>
      <tr><td>Address: " . $_POST['add1'] . ' ' . $_POST['add2'] .
          "<br />" . $_POST['Zip'] . ' '  . $_POST['City'] . ' ' .
          $_POST['State'] . "</td></tr>
      <tr><td>Phone: " . $_POST['phone'] . "</td></tr>
      <tr><td>Items in Cart:<br />";
          foreach($_POST['checkbox'] as $check){
          echo $check . "<br />";}
          echo "</td></tr>";
    echo "<tr><td>Total: $" . array_sum($_POST['checkbox']) . "</td></tr>";
    echo "<tr><td>Credit Card Type: " . $_POST['card'] . 
        "<br />Expires: " . $_POST['expire'] . 
        "</td></tr></table>";
    echo "<form action='confirm.php' method='POST'>
      <div  style='text-align:center'> 
      <input onclick='confirm.php' name='confirm'
             type='submit' value='Confirm'>";
      echo "<input onclick='confirm.php' name='confirm'
                   type='submit' value='Cancel'></div></form>";

     
   ?>
     
     
     </html>
