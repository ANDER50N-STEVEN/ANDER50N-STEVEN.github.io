<!DOCTYPE html>
<html>
  
  <?php
     echo "<head><title> Purchase Confirmation </title>";
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

    if ($_POST['confirm'] == "Confirm"){
    echo "<h1 style='text-align:center'> Your Order has been Submitted</h1>";
}
    if($_POST['confirm'] == "Cancel"){
    echo "<h1 style='text-align:center'> Your Order has been Canceled</h1>";}

    echo "</body>";

     
   ?>
     
     
     </html>
