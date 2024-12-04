<h3>Website request quote by {{ $formData['company_name'] }}</h3>

<table style="width:100%; text-align: left; border-collapse: collapse; border: 1px solid #777;">
    <tr>
        <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #fff;">First Name </th>
        <td style="padding: 5px;border: 1px solid black;">{{ $formData['firstname'] }}</td>
    </tr>

    <tr>
        <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #fff;">Surame </th>
        <td style="padding: 5px;border: 1px solid black;">{{ $formData['surname'] }}</td>
    </tr>

    <tr>
        <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #fff;">Phone Code </th>
        <td style="padding: 5px;border: 1px solid black;">{{ $formData['code'] }}</td>
    </tr>

    <tr>
        <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #fff;">Phone Number </th>
        <td style="padding: 5px;border: 1px solid black;">{{ $formData['phone_number'] }}</td>
    </tr>

    <tr>
        <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #fff;">Email </th>
        <td style="padding: 5px;border: 1px solid black;">{{ $formData['email'] }}</td>
    </tr>

    <tr>
        <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #fff;">Company name </th>
        <td style="padding: 5px;border: 1px solid black;">{{ $formData['company_name'] }}</td>
    </tr>


    <tr>
        <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #fff;">Country </th>
        <td style="padding: 5px;border: 1px solid black;">{{ $formData['country'] }}</td>
    </tr>

    <tr>
        <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #fff;">Location </th>
        <td style="padding: 5px;border: 1px solid black;">{{ $formData['location'] }}</td>
    </tr>

    <tr>
        <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #fff;">Shipping </th>
        <td style="padding: 5px;border: 1px solid black;">{{ $formData['shipping'] }}</td>
    </tr>

    <tr>
        <th style="background-color:#777; color: #fff; padding: 5px;border: 1px solid #fff;">Installation </th>
        <td style="padding: 5px;border: 1px solid black;">{{ $formData['installation'] }}</td>
    </tr>


</table>

<h3>Selected Items</h3>

<table style="width:100%; text-align: left; border-collapse: collapse; border: 1px solid #777;">
    <tr>
        <th style="border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;">Image</th>
        <th style="border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;">Name</th>
        <th style="border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;">Model No</th>
        <th style="border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;">Sku</th>
    </tr>


    @foreach($formData["cartItems"] as $item)
    <tr>
        <td width="10%" style="padding: 5px;border: 1px solid black;">
            <img width="100%" src="https://sheffield.com/storage/{{ $item['main_image_path'] }}" alt="Product Image">
        </td>
        <td style="padding: 5px;border: 1px solid black;">{{ $item['name'] }}</td>
        <td style="padding: 5px;border: 1px solid black;">{{ $item['model_number'] }}</td>
        <td style="padding: 5px;border: 1px solid black;">{{ $item['sku'] }}</td>

    </tr>
    @endforeach

</table>