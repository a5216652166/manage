(function() {
	$(function() {
		init_siteinfo()

        function init_siteinfo() {
            $.ajax({
                type : 'get',
                url  : '/get_siteinfo',
                success : function(d) {
                    localStorage.siteinfo = JSON.stringify(d.siteinfos);
                    show_table('nodejs', d.siteinfos)
                }
            })
        }

        init_nav()

        function init_nav() {
            $('#nav a').click(function(events) {
                var id = $(this).attr('href').replace('#', '')
                var data = JSON.parse(localStorage.siteinfo)

                show_table(id, data)
            })
        }

        function show_table(id, data) {
        	var rows = $.grep(data, function(d) {
                return d.type == id
            });

        	var html = ""
            for (var i = 0; i < rows.length; i++) { 
                html += "<tr>" 
                      + "<td class='modify_td' data-filed='site_name' data-id=" + rows[i]._id + "><span>" + rows[i].site_name + "</span><input class='disnone form-control' value='" + rows[i].site_name + "'/></td>"
                      + "<td class='modify_td' data-filed='CDN' data-id=" + rows[i]._id + "><span>" + rows[i].CDN + "</span><input class='disnone form-control' value='" + rows[i].CDN + "'/></td>"
                      + "<td class='modify_td' data-filed='type' data-id=" + rows[i]._id + "><span>" + rows[i].type + "</span><input class='disnone form-control' value='" + rows[i].type + "'/></td>"
                      + "<td class='modify_td' data-filed='ip_20' data-id=" + rows[i]._id + "><span>" + rows[i].ip_20 + "</span><input class='disnone form-control' value='" + rows[i].ip_20 + "'/></td>"
                      + "<td class='modify_td' data-filed='ip_30' data-id=" + rows[i]._id + "><span>" + rows[i].ip_30 + "</span><input class='disnone form-control' value='" + rows[i].ip_30 + "'/></td>"
                      + "<td class='modify_td' data-filed='dx_ip' data-id=" + rows[i]._id + "><span>" + rows[i].dx_ip + "</span><input class='disnone form-control' value='" + rows[i].dx_ip + "'/></td>"
                      + "<td class='modify_td' data-filed='lt_ip' data-id=" + rows[i]._id + "><span>" + rows[i].lt_ip + "</span><input class='disnone form-control' value='" + rows[i].lt_ip + "'/></td>"
                      + "<td class='modify_td' data-filed='function' data-id=" + rows[i]._id + "><span>" + rows[i].function + "</span><input class='disnone form-control' value='" + rows[i].function + "'/></td>"
                      + "<td class='modify_td text-center' data-filed='status' data-id=" + rows[i]._id + "><span>" + format_status(rows[i].status) + "</span><input class='disnone form-control' value='" + rows[i].status + "'/></td>"
                      + "<td class='modify_td' data-filed='remark' data-id=" + rows[i]._id + "><span>" + rows[i].remark + "</span><input class='disnone form-control' value='" + rows[i].remark + "'/></td>"
                      + "<td>" + rows[i].uptime + "</td>"
                      + "</tr>"
            };

            html = html + "<tr><td colspan='11'><span style='font-weight:bold'>总共 " + rows.length + " 个站点</span></td></tr>";
            $('#' + id + " table tbody").html(html);

        }

        function format_status(status) {
            var type = ''
            switch (status) {
                case '已上线' : 
                    type = "label-success"
                    break;
                case '已下线' : 
                    type = "label-default"
                    break;
                case '已部署' : 
                    type = "label-primary"
                    break;
                case '测试' : 
                    type = "label-warning"
                    break;
                case '待部署' : 
                    type = "label-info"
                    break;
            }
            return '<span class="label ' + type + '">' + status + '</span>'
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
                    url  : '/modify_siteinfo',
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
                url  : '/get_siteinfo',
                success : function(d) {
                    localStorage.siteinfo = JSON.stringify(d.siteinfos);
                    show_table(a_id, d.siteinfos);
                }
            });
        }

        insert_siteinfo()

        function insert_siteinfo() {
            $('#addsiteinfo .btn-success').click(function(events) {
                var data = $('#f_siteinfo').serialize();

                $.ajax({
                    type : 'put',
                    url  : '/siteinfo',
                    data : data,
                    success : function(d) {
                        if (d.ok == 1) {
                            $('#addsiteinfo').modal('hide');
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