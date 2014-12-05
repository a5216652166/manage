(function () {
    $(function() {
        function GetIpList() {
            var ip_list_20 = []
            $('#ip_20 tr').each(function() {
                ip_list_20.push($(this).data('ip'))
            })
        }

        GetIpInfo()
        function GetIpInfo() {
            $.ajax({
                type : 'get',
                url  : '/get_serverinfo',
                success : function(d) {
                    var all_ip = {}
                    var all_control_ip = {}                    
                    var all_20_ip = {}
                    var all_30_ip = {}
                    var all_dx_ip = {}
                    var all_lt_ip = {}

                    localStorage.serverinfo = JSON.stringify(d.infos);
                    var data = JSON.parse(localStorage.serverinfo)

                    for (k in data) {
                        if ((data[k].control_ip).length !== 0 ) {
                            all_control_ip[data[k].control_ip] = data[k].sev_no
                        }
                        if ((data[k].ip_20).length !== 0 ) {
                            all_20_ip[data[k].ip_20] = data[k].sev_no
                        }
                        if ((data[k].ip_30).length !== 0 ) {
                            all_30_ip[data[k].ip_30] = data[k].sev_no
                        }
                        if ((data[k].dx_ip).length !== 0 ) {
                            all_dx_ip[data[k].ip_dx] = data[k].sev_no
                        }
                        if ((data[k].lt_ip).length !== 0 ) {
                            all_lt_ip[data[k].ip_lt] = data[k].sev_no
                        }
                    }

                    function AddStatus($table, arr) {
                        $table.each(function() {
                            var $tr = $(this)
                            var tr_ip = $tr.data('ip')
                            if(arr[tr_ip]) {
                                $tr.children("td:eq(1)").html("<span style='color:red'>已使用</span>")
                                $tr.children("td:eq(2)").html(arr[tr_ip])
                            }
                        })
                    }

                    AddStatus($('#ip_0 tr'), all_control_ip)
                    AddStatus($('#ip_20 tr'), all_20_ip)
                    AddStatus($('#ip_30 tr'), all_30_ip)
                }
            })
        }    
    })
})()