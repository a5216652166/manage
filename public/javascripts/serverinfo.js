(function() {
    $(function() {
        init_serverinfo()

        function init_serverinfo() {
            $.ajax({
                type : 'get',
                url  : '/get_serverinfo',
                success : function(d) {
                    localStorage.serverinfo = JSON.stringify(d.infos)
                    show_table('H04-01', d.infos)
                }
            });
        }

        init_nav()

        function init_nav() {
            $('#nav a').click(function(events) {
                var id = $(this).attr('href').replace('#', '')
                var data = JSON.parse(localStorage.serverinfo)

                show_table(id, data)
            })
        }

        init_modify()

        function init_modify() {
            $('.modify_td').live('dblclick', function(events) {
                $(this).find('span').hide()
                $(this).find('input').show()
                $(this).find('input').focus()
            })

            $('.modify_td input').live('blur', function(e) {
                $(this).hide()
                $(this).siblings().show()

                var data = {
                    new_value : $(this).val(),
                    filed     : $(this).parent('td').attr('data-filed'),
                    _id       : $(this).parent('td').attr('data-id')
                }

                $.ajax({
                    type : 'post',
                    url  : '/modify_serverinfo',
                    data : data,
                    success : function(d) {
                        if (d.ok == 1) {
                            // location.reload();
                            reload_page();
                        }
                        else {
                            alert(d.msg);
                            return;
                        }
                    }
                });
            })
        }

        function reload_page() {
            var a_id = $('#nav .active a').attr('href').replace('#', '');
            
            $.ajax({
                type : 'get',
                url  : '/get_serverinfo',
                success : function(d) {
                    localStorage.serverinfo = JSON.stringify(d.infos)
                    show_table(a_id, d.infos)
                }
            });
        }

        function show_table(id, data) {
            // if (id == 'ALL') {
            //     var rows = data
            //     console.log(rows)
            // }
            // else {
            //     var rows = $.grep(data, function(d) {
            //         return d.cabinet_no == id
            //     })
            // }
            var rows = $.grep(data, function(d) {
                return d.cabinet_no == id
            })

            var html = ""
            for (var i = 0; i < rows.length; i++) { 
                html += "<tr>" 
                      + "<td class='modify_td' data-filed='room_place' data-id=" + rows[i]._id + "><span>" + rows[i].room_place + "</span><input class='disnone form-control' value='" + rows[i].room_place + "'/></td>"
                      + "<td class='modify_td' data-filed='cabinet_no' data-id=" + rows[i]._id + "><span>" + rows[i].cabinet_no.toUpperCase() + "</span><input class='disnone form-control' value='" + rows[i].cabinet_no + "'/></td>"
                      + "<td class='modify_td' data-filed='host_name' data-id=" + rows[i]._id + "><span>" + rows[i].host_name + "</span><input class='disnone form-control' value='" + rows[i].host_name + "'/></td>"
                      + "<td class='modify_td' data-filed='sev_no' data-id=" + rows[i]._id + "><span>" + rows[i].sev_no.toUpperCase() + "</span><input class='disnone form-control' value='" + rows[i].sev_no + "'/></td>"
                      + "<td class='modify_td' data-filed='type' data-id=" + rows[i]._id + "><span>" + rows[i].type + "</span><input class='disnone form-control' value='" + rows[i].type + "'/></td>"
                      + "<td class='modify_td' data-filed='room_no' data-id=" + rows[i]._id + "><span>" + rows[i].room_no.toUpperCase() + "</span><input class='disnone form-control' value='" + rows[i].room_no + "'/></td>"
                      + "<td class='modify_td' data-filed='control_ip' data-id=" + rows[i]._id + "><span>" + rows[i].control_ip + "</span><input class='disnone form-control' value='" + rows[i].control_ip + "'/></td>"
                      + "<td class='modify_td' data-filed='ip_20' data-id=" + rows[i]._id + "><span>" + rows[i].ip_20 + "</span><input class='disnone form-control' value='" + rows[i].ip_20 + "'/></td>"
                      + "<td class='modify_td' data-filed='ip_30' data-id=" + rows[i]._id + "><span>" + rows[i].ip_30 + "</span><input class='disnone form-control' value='" + rows[i].ip_30 + "'/></td>"
                      + "<td class='modify_td' data-filed='dx_ip' data-id=" + rows[i]._id + "><span>" + rows[i].dx_ip + "</span><input class='disnone form-control' value='" + rows[i].dx_ip + "'/></td>"
                      + "<td class='modify_td' data-filed='lt_ip' data-id=" + rows[i]._id + "><span>" + rows[i].lt_ip + "</span><input class='disnone form-control' value='" + rows[i].lt_ip + "'/></td>"
                      + "<td class='modify_td' data-filed='OS' data-id=" + rows[i]._id + "><span>" + rows[i].OS + "</span><input class='disnone form-control' value='" + rows[i].OS + "'/></td>"
                      + "<td class='modify_td' data-filed='memory' data-id=" + rows[i]._id + "><span>" + rows[i].memory + "</span><input class='disnone form-control' value='" + rows[i].memory + "'/></td>"
                      + "<td class='modify_td' data-filed='disk' data-id=" + rows[i]._id + "><span>" + rows[i].disk.toUpperCase() + "</span><input class='disnone form-control' value='" + rows[i].disk + "'/></td>"
                      + "<td class='modify_td' data-filed='raid' data-id=" + rows[i]._id + "><span>" + rows[i].raid.toUpperCase() + "</span><input class='disnone form-control' value='" + rows[i].raid + "'/></td>"
                      + "<td class='modify_td' data-filed='raid_level' data-id=" + rows[i]._id + "><span>" + rows[i].raid_level + "</span><input class='disnone form-control' value='" + rows[i].raid_level + "'/></td>"
                      + "<td class='modify_td' data-filed='network' data-id=" + rows[i]._id + "><span>" + rows[i].network + "</span><input class='disnone form-control' value='" + rows[i].network + "'/></td>"
                      + "<td class='modify_td' data-filed='kind' data-id=" + rows[i]._id + "><span>" + rows[i].kind + "</span><input class='disnone form-control' value='" + rows[i].kind + "'/></td>"
                      + "<td class='modify_td' data-filed='function' data-id=" + rows[i]._id + "><span>" + rows[i].function + "</span><input class='disnone form-control' value='" + rows[i].function + "'/></td>"
                      + "<td class='modify_td text-center' data-filed='status' data-id=" + rows[i]._id + "><span>" + format_status(rows[i].status) + "</span><input class='disnone form-control' value='" + rows[i].status + "'/></td>"
                      + "<td class='modify_td' data-filed='remark' data-id=" + rows[i]._id + "><span>" + rows[i].remark + "</span><input class='disnone form-control' value='" + rows[i].remark + "'/></td>"
                      + "<td>" + rows[i].uptime + "</td>"
                      + "</tr>"
            }
            html = html + "<tr><td colspan='22'><span style='font-weight:bold'>总共 " + rows.length + " 个服务器</span></td></tr>"

            $('#' + id + " table tbody").html(html)
        }

        function format_status(status) {
            var type = ''
            switch (status) {
                case '在用' : 
                    type = "label-success"
                    break;
                case '下架' : 
                    type = "label-default"
                    break;
                case '待用' : 
                    type = "label-primary"
                    break;
                case '测试' : 
                    type = "label-warning"
                    break;
                case '其他' : 
                    type = "label-info"
                    break;
            }

            return '<span class="label ' + type + '">' + status + '</span>'
        }

        insert_serverinfo()

        function insert_serverinfo() {
            $('#addserverinfo .btn-success').click(function(events) {
                var data = $('#f_serverinfo').serialize();

                $.ajax({
                    type : 'put',
                    url  : '/serverinfo',
                    data : data,
                    success : function(d) {
                        if (d.ok == 1) {
                            $('#addserverinfo').modal('hide');
                            reload_page();
                        }
                        else {
                            App.alert_error(d.msg);
                            return;
                        }                        
                    }
                });
            })
        }
    })
})()