(function () {
    $(function() {
        // $('#info .alert button.close').click(function() {
        //      $('#info .alert').hide()
        // })
        
        $('.container-fluid .alert').hide()

        App = {
            alert_error : function(err_text) {
                $('.container-fluid .alert').hide()
                $('.container-fluid .alert-danger').show().find('div').html(err_text)
                this.animate_alert()
            },
            alert_success : function(success_text) {
                $('.container-fluid .alert').hide()
                $('.container-fluid .alert-success').show().find('div').html(success_text)
                this.animate_alert()
            },
            animate_alert : function() {
                $('#info').slideDown().delay(1000).slideUp()
            },
        }
    })
})()