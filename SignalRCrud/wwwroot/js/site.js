

$(() =>
{
    LoadProductData();

    var connection = signalR.HubConnectionBuilder().withUrl("/singalrServer").build();

    connection.start();
    connection.on("LoadProducts", function ()
    {
        LoadProductData();
    });

    LoadProductData();

    function LoadProductData()
    {
        var tr = '';

        $.ajax({
            url: '/products/GetProducts',
            method: 'GET',
            success: (result) =>
            {
                $.each(result, (k, v) =>
                {
                    tr += `<tr>
                        <td>${v.ProdName}</td>
                        <td>${v.Category}</td>
                        <td>${v.UnitPrice}</td>
                        <td>${v.Stock}</td>
                        <td><a href='../Products/Edit?id=${v.ProdId}'>Edit</a></td>
                        <td><a href='../Products/Details?id=${v.ProdId}'>Details</a></td>
                        <td><a href='../Products/Delete?id=${v.ProdId}'>Delete</a></td>
                    </tr>`
                })

                $("#tableBody").html(tr);
            },
            error: (error) =>
            {
                console.log(error);
            }
        });
    }
});