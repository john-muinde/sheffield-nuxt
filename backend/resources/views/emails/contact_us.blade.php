<h3>Contact form request details:</h3>

<table style="width:100%; text-align: left; border-collapse: collapse; border: 1px solid #777;">
  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">First Name </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['firstname'] }}</td>
  </tr>

  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">Surame </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['surname'] }}</td>
  </tr>

  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">Phone Code </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['code'] }}</td>
  </tr>

  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">Phone Number </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['phone_number'] }}</td>
  </tr>

  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">Email </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['email'] }}</td>
  </tr>

  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">Company name </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['company_name'] }}</td>
  </tr>

  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">Business Type </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['business_type'] }}</td>
  </tr>

  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">Request Type </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['request_type'] }}</td>
  </tr>


  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">Area of Interest </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['area_of_interest'] }}</td>
  </tr>

  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">Country </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['country'] }}</td>
  </tr>

  <tr>
    <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #777;">Request </th>
    <td style="padding: 5px;border: 1px solid black;">{{ $formData['message_request'] }}</td>
  </tr>

 
  
</table>