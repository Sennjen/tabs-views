$(function () {
    $(".dropdown-button").dropdown();
    var jqxhr = $.getJSON( "data.json", function(data) {
            if (data){
                $("#dropdown1").empty();
                $('.dropdown-button span').html(data.titleList[0]);

                data.titleList.forEach(function (d) {
                    $("#dropdown1").append("<li><a href='javascript:void(0)' data-title='"+ d +"'>"+ d +"</a></li>")
                });

                $("#dropdown1 a").on('click',function () {
                    $('.dropdown-button span').html($(this).data('title'));
                    buildTable($(this).data('title'), data)
                });

                buildTable(data.titleList[0], data)
            }
        })
        .fail(function(err) {
            console.log( err );
        });

    function buildTable (table_name, data) {
        var table_data =  _.find(data.allData, table_name),
            table_head = $('table thead tr'),
            table_body = $('table tbody'),
            col = '',
            col_count = table_data[table_name][0].data.length + 1,
            col_width = 100/col_count;
            cols_names = [];

        $("table thead tr, table tbody").empty();

        table_head.append('<th>Rows</th>');
        
        table_data[table_name].forEach(function (d,i) {
            // console.log(d);
            table_body.append('<tr><td style="width: '+col_width+'%">'+ d.row +'</td></tr>');
            d.data.forEach(function (row_data) {
                for (col in row_data) break;
                cols_names.push(col);
                table_body.find('tr:last-child')
                    .append('<td '+ (row_data.good == "True" ? "class='blue accent-2'" : "class='red accent-2'") +' style="width: '+col_width+'%">'+ row_data[col] +'</td>')
            })
        });

        _.uniq(cols_names).forEach(function (d,i) {
            table_head.append('<th class="header_cells">'+ d +'</th>');
        });
    }
});
