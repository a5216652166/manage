(function() {
    $(function() {
        searchServer()
        function searchServer() {
            $('#search_server.button').click(function(events) {
                $('#nav a:last').tab('show')
                var data = {
                    value : $('#search_input').val()
                }
                $.ajax({
                    type : 'put',
                    url  : '/search',
                    data : data,
                    success : function(d) {
                        var all_results = d.results
                        var html = ""
                        for (var i = 0; i < all_results.length; i++) {
                            html += "<tr>" 
                                  + "<td class='modify_td' data-filed='room_place' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.room_place + "</span><input class='disnone form-control' value='" +  all_results[i].obj.room_place + "'/></td>"
                                  + "<td class='modify_td' data-filed='cabinet_no' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.cabinet_no + "</span><input class='disnone form-control' value='" +  all_results[i].obj.cabinet_no + "'/></td>"
                                  + "<td class='modify_td' data-filed='host_name' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.host_name + "</span><input class='disnone form-control' value='" +  all_results[i].obj.host_name + "'/></td>"
                                  + "<td class='modify_td' data-filed='sev_no' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.sev_no + "</span><input class='disnone form-control' value='" +  all_results[i].obj.sev_no + "'/></td>"
                                  + "<td class='modify_td' data-filed='type' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.type + "</span><input class='disnone form-control' value='" +  all_results[i].obj.type + "'/></td>"
                                  + "<td class='modify_td' data-filed='room_no' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.room_no + "</span><input class='disnone form-control' value='" +  all_results[i].obj.room_no + "'/></td>"
                                  + "<td class='modify_td' data-filed='control_ip' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.control_ip + "</span><input class='disnone form-control' value='" +  all_results[i].obj.control_ip + "'/></td>"
                                  + "<td class='modify_td' data-filed='ip_20' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.ip_20 + "</span><input class='disnone form-control' value='" +  all_results[i].obj.ip_20 + "'/></td>"
                                  + "<td class='modify_td' data-filed='ip_30' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.ip_30 + "</span><input class='disnone form-control' value='" +  all_results[i].obj.ip_30 + "'/></td>"
                                  + "<td class='modify_td' data-filed='dx_ip' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.dx_ip + "</span><input class='disnone form-control' value='" +  all_results[i].obj.dx_ip + "'/></td>"
                                  + "<td class='modify_td' data-filed='lt_ip' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.lt_ip + "</span><input class='disnone form-control' value='" +  all_results[i].obj.lt_ip + "'/></td>"
                                  + "<td class='modify_td' data-filed='OS' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.OS + "</span><input class='disnone form-control' value='" +  all_results[i].obj.OS + "'/></td>"
                                  + "<td class='modify_td' data-filed='memory' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.memory + "</span><input class='disnone form-control' value='" +  all_results[i].obj.memory + "'/></td>"
                                  + "<td class='modify_td' data-filed='disk' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.disk + "</span><input class='disnone form-control' value='" +  all_results[i].obj.disk + "'/></td>"
                                  + "<td class='modify_td' data-filed='raid' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.raid + "</span><input class='disnone form-control' value='" +  all_results[i].obj.raid + "'/></td>"
                                  + "<td class='modify_td' data-filed='raid_level' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.raid_level + "</span><input class='disnone form-control' value='" +  all_results[i].obj.raid_level + "'/></td>"
                                  + "<td class='modify_td' data-filed='network' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.network + "</span><input class='disnone form-control' value='" +  all_results[i].obj.network + "'/></td>"
                                  + "<td class='modify_td' data-filed='kind' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.kind + "</span><input class='disnone form-control' value='" +  all_results[i].obj.kind + "'/></td>"
                                  + "<td class='modify_td' data-filed='function' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.function + "</span><input class='disnone form-control' value='" +  all_results[i].obj.function + "'/></td>"
                                  + "<td class='modify_td text-center' data-filed='status' data-id=" +  all_results[i].obj._id + "><span>" + format_status( all_results[i].obj.status) + "</span><input class='disnone form-control' value='" +  all_results[i].obj.status + "'/></td>"
                                  + "<td class='modify_td' data-filed='remark' data-id=" +  all_results[i].obj._id + "><span>" +  all_results[i].obj.remark + "</span><input class='disnone form-control' value='" +  all_results[i].obj.remark + "'/></td>"
                                  + "<td>" +  all_results[i].obj.uptime + "</td>"
                                  + "</tr>"
                        }
                        html = html + "<tr><td colspan='22'><span style='font-weight:bold'>总共 " + all_results.length + " 个服务器</span></td></tr>"

                        $('#all_search'+ " table tbody").html(html)
                    }
                })
            })
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

        // showResults()
        // function showResults() {
        //     $.ajax({
        //         type : 'get',
        //         url : '/search',
        //         success : function(d) {
        //             console.log(d.results)
        //         }
        //     })
        // }
    })
})()