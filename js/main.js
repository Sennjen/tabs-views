$(function () {
    $(".dropdown-button").dropdown();
    $('.modal-trigger').leanModal();
    var jqxhr = $.getJSON( "data.json", function(data) {
            if (data){
                $("#dropdown1").empty();
                $('.dropdown-button span').html(data.numList[0]);

                data.numList.forEach(function (d) {
                    $("#dropdown1").append("<li><a href='javascript:void(0)' data-title='"+ d +"'>"+ d +"</a></li>")
                });

                $("#dropdown1 a").on('click',function () {
                    $('.dropdown-button span').html($(this).data('title'));
                    buildTable($(this).data('title'), data)
                });

                buildTable(data.numList[0], data)
            }
        })
        .fail(function(err) {
            console.log( err );
        });

    function buildTable (table_name, data) {
        var table_data =  data.allData,
            table_head = $('table thead tr'),
            table_body = $('table tbody'),
            col_count = table_data.length + 1,
            col_width = 100/col_count,
            row_data = [];

        $("table thead tr, table tbody").empty();

        table_head.append('<th>Rows</th>');
        data.rowsList.forEach(function (d,i) {
            table_body.append('<tr class="'+d+'"><td style="width: '+col_width+'%">'+ d +'</td></tr>');
        });
        data.titleList.forEach(function (d,i) {
            table_head.append('<th class="header_cells">'+ d +'</th>');
            data.rowsList.forEach(function (elem,index) {
                row_data = _.find(_.find(table_data, d)[d], ['row',elem]);
                if(row_data){
                    table_body.find('.'+elem+'')
                        .append('<td ' +
                            (_.find(row_data.data, table_name).good == "True" ? "class='blue accent-2'" : "class='red accent-2'") +
                            'data-title="'+d+'" data-row="'+elem+'"' +
                            (_.find(row_data.data, table_name).image ? 'data-modal="true"':'data-modal="false"')+
                            ' style="width: '+col_width+'%">'+
                            _.find(row_data.data, table_name)[table_name]+
                            '</td>')
                }else{
                    table_body.find('.'+elem+'').append('<td class="grey" style="width: '+col_width+'%"></td>')
                }
            });
        });
        $('td').on('click', function (e) {
            var cell = $(this);
            var cell_data = [];
            var modal_content = $('#modal1 .modal-content');
            if(cell.data('modal')){
                cell_data = _.find(_.find(_.find(data.allData, cell.data('title'))[cell.data('title')],
                    ['row', cell.data('row')]).data, table_name);
                modal_content.empty();
                modal_content.append('<div class="slider"><ul id="lightSlider"></ul></div>');
                cell_data.image.forEach(function (elem) {
                    $('#lightSlider')
                        .append('<li data-thumb="'+elem+'">'+
                                '<img src="'+elem+'">'+
                                '</li>')
                });
                modal_content.append('<div class="links-container"><span>Download Links:</span></div>');
                cell_data.download.forEach(function (elem) {
                    $('.links-container').append('<a href="'+elem+'" target="_blank">'+elem+'</a>')
                });
                $('#modal1').openModal({
                    ready: function () {
                        $('#lightSlider').lightSlider({
                            gallery: true,
                            item: 1,
                            loop: true,
                            slideMargin: 0,
                            thumbItem: 3
                        });
                    }
                });
            }
        })
    }
});
