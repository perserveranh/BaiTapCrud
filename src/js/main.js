function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
const API_URL = 'https://reqres.in/api/'
const token = localStorage.getItem('Token');
const modules = {}
jQuery(document).ready(function($) {
    if (!token) {
        $('.require-auth').hide()
    } else {
        $('#login-block').hide()
    }
    // loading
    var $loading = $('#block-loading').hide()
    var $views = $('.views')
    $(document)
        .ajaxStart(function () {
            $loading.show()
            // $views.hide()
        })
        .ajaxStop(function () {
            $loading.hide()
            // $views.show()
        });

    modules.user = new userClass()
    // login page
                modules.user.fetchData()
    $('#login-form').submit(function(event) {
        event.preventDefault()
        $.post(API_URL + 'login', getFormData($(this)), function(data, textStatus, xhr) {
            if (textStatus == 'success') {
                alert('Đăng nhập thành công')
                $('#login-block').hide()
                $('#user-block').show()
            }
            myTaiKhoan=JSON.stringify('QpwL5tke4Pnpja7X');
            localStorage.setItem('Token', myTaiKhoan);
        });
    });

    $('#save').click(function(event){
        // console.log(123);
        var Firstname=$('#firstname').val();
        var Lastname=$('#lastname').val();
        var Avatar=$('#avatar').val();
        // $('#users').html('');

        $('#exampleModal').modal('toggle');
        $.post(API_URL + 'users' , getFormData($('form#fm')),function(data,textStatus,xhr){
            console.log(data);
            $('#users').append('\
                 <div class="col-md-4" >\
                            <div class="thumbnail">\
                              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg" alt="' + data.Firstname + ' ' + data.Lastname + '" class="img-fluid">\
                              <div class="caption">\
                                <h3>' + data.Firstname + ' ' + data.Lastname + '</h3>\
                                <p>\
                                    <a href="#" class="btn btn-primary user-detail" data-detail=\'' + JSON.stringify(data) + '\' role="button">Edit</a>\
                                    <button type="button" class="btn btn-dark xoa" >Delete</button>\
                                </p>\
                              </div>\
                            </div>\
                        </div>\
                        ');
        });

    });
    $(document).on('click','#edit',function(event){
        var Firstname=$('#firstname').val();
        var Lastname=$('#lastname').val();
        var Avatar=$('#avatar').val();
        $('#exampleModal').modal('toggle');
        var id= sessionStorage.getItem('id');
        console.log(id);
        $.post(API_URL + 'users' ,getFormData($('form#fm')),function(data,textStatus,xhr){
            $('div#' + id + 'img' ).html(Avatar);
            $('div#'+ id  +' h3').html(Firstname + Lastname);
        })
    })

    // $('.user-detail').click(function(event){
    //     var detail=$(this).data('detail');
    //     console.log(detail);


    //     $('#exampleModal input#firstname').val(detail.Firstname);
    //     $('#exampleModal').modal('show');
    // })


    // pagination
    $(document).on('click', '.page-link', function(event) {
        event.preventDefault();
        modules[$(this).data('module')].fetchData($(this).data('page'))
    });
    $(document).on('click','.xoa',function(event){
       $(this).closest('div.col-md-4').remove();
    })


});

var userClass = function () {
    this.fetchData = function(page) {
        page = page || 1
        $.get(API_URL + 'users?page=' + page, function(response) {
            $('#user-page').html('')
            $('#users').html('')
            response.data.forEach(function (user) {
                $('#users').append('\
                        <div class="col-md-4" id='+user.id+'>\
                            <div class="thumbnail">\
                              <img src="' + user.avatar + '" alt="' + user.first_name + ' ' + user.last_name + '" class="img-fluid">\
                              <div class="caption">\
                                <h3>' + user.first_name + ' ' + user.last_name + '</h3>\
                                <p>\
                                    <a href="#" id="'+user.id+'" class="btn btn-primary user-detail" data-detail=\'' + JSON.stringify(user) + '\' role="button">Edit</a>\
                                    <button type="button" class="btn btn-dark xoa " id="'+user.id+'"">Delete</button>\
                                </p>\
                              </div>\
                            </div>\
                        </div>\
                    ');
            })
            for (var i = 1; i <= response.total_pages; i++) {
                $('#user-page').append('<li class="page-item ' + (i == page ? 'active' : '') + '"><a class="page-link" data-page="' + i + '" data-module="user" href="#">' + i + '</a></li>')
            }
        });
    }
    $(document).on('click', '.user-detail', function(event) {
        event.preventDefault();
        var detail = $(this).data('detail');
        var id = $(this).attr('id');
        console.log(detail);
         $('#exampleModal input#firstname').val(detail.first_name);
         $('#exampleModal input#lastname').val(detail.last_name);
         $('#exampleModal img#blah').attr('src',detail.avatar);
         $('#exampleModal button#edit').attr('data-id',id);
         sessionStorage.setItem('id',id);
        $('#exampleModal').modal('show');
    });

}
