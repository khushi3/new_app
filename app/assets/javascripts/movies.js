// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// $.ajaxSetup({
//     'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
// })

// $.fn.submitWithAjax = function() {
//     this.submit(function() {
//         $.post(this.action, $(this).serialize(), null, "script");
//         return false;
//     })
//     return this;
// };

// $(document).ready(function() {
//     $("#new_movie").submitWithAjax();
// })

$(document).ready(function () {
    $("#movie_release").datepicker()
       // minDate: new Date(),
        //maxDate: new Date(),
        //dateFormat: "dd-mm-yy"


    // $("#movie_trailerdate").datepicker();
     $(document).bind('ajaxError', 'form#new_', function(event, jqxhr, settings, exception){

    // note: jqxhr.responseJSON undefined, parsing responseText instead
    $(event.data).render_form_errors( $.parseJSON(jqxhr.responseText) );

  });

});

(function($) {

  $.fn.modal_success = function(){
    // close modal
    this.modal('hide');

    // clear form input elements
    // todo/note: handle textarea, select, etc
    this.find('form input[type="text"]').val('');

    // clear error state    
    this.clear_previous_errors();
  };

  $.fn.render_form_errors = function(errors){

    $form = this;
    this.clear_previous_errors();
    model = this.data('model');

    // show error messages in input form-group help-block
    $.each(errors, function(field, messages){
      $input = $('input[name="' + model + '[' + field + ']"]');
      $input.closest('.form-group').addClass('has-error').find('.help-block').html( messages.join(' & ') );
    });

  };

  $.fn.clear_previous_errors = function(){
    $('.form-group.has-error', this).each(function(){
      $('.help-block', $(this)).html('');
      $(this).removeClass('has-error');
    });
  }

}(jQuery));


    $('.rateit').bind('rated reset', function (e) {
        var ri = $(this);
        var value = ri.rateit('value');
        ri.rateit('readonly', true);
       // var frm = ri.closest('form');
        var movie_id = $(this).parent().parent().attr("id")
        $.ajax({
            url: 'movies/' + movie_id + '/rate',
            data: { ratings: value },
            type: 'POST',
            success: function (data) {
            }

        });

    });

    $("#sortable").sortable({
        update: function (event, ui) {
            var list = [];
            var changed_list = $("#sortable").sortable('toArray');

            for (var i = 0; i < changed_list.length; i++) {
                list.push({id: changed_list[i], order_no: i})
                console.log(changed_list[i], i)

            }
            $.ajax({
                dataType: 'json',
                url: '/movies/sort',
                method: "POST",
                data: {changed_orders: list}

            });
        }
    });

 });
