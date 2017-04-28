

$(document).ready(function () {

  var grupo=10;

  $.ajax({
    method: "GET",
    dataType: 'JSON',
    url: "http://web-unicen.herokuapp.com/api/group/" + grupo+'?',
    success: function(resultData){
      for (var i = 0; i < resultData.information.length; i++) {
        $("#tabla").append('<tr>');
        $("#tabla").append('<td class="marca">'+resultData.information[i]['thing'][0]+'</td>');
        $("#tabla").append('<td class="modelo">'+resultData.information[i]['thing'][1]+'</td>');
        $("#tabla").append('<td class="precio">'+resultData.information[i]['thing'][2]+'</td>');

        var botonDeleteID = '<button type="button" name="button" class="btnBorraFila" id="'+resultData.information[i]._id+'">BorrarFila</button>';
        $("#tabla").append('<td class="marca">'+botonDeleteID+'</td></tr>');
      }
    },
    error:function(jqxml, status, errorThrown){
      console.log(errorThrown);
    }
  });


  $("#enviar").on("click",function (event) {
    event.preventDefault();
    var marca = $("#marca").val();
    var modelo = $("#modelo").val();
    var precio = $("#precio").val();
    var botonDelete = '<button type="button" name="button" class="btnBorraFila" >Eliminar Instrumento</button>';

    var info = {
      group: grupo,
      thing: [marca,modelo, precio, botonDelete]
    };
    console.log(JSON.stringify(info));
    $.ajax({
      method: "POST",
      dataType: 'JSON',
      data: JSON.stringify(info),
      contentType: "application/json; charset=utf-8",
      url: "http://web-unicen.herokuapp.com/api/create",
      success: function (resultData) {
        $("#tabla").append('<tr>');
        $("#tabla").append('<td class="marca">'+marca+'</td>');
        $("#tabla").append('<td class="modelo">'+modelo+'</td>');
        $("#tabla").append('<td class="precio">'+precio+'</td>');
        botonDelete = '<button type="button" name="button" class="btnBorraFila" id="'+resultData.information._id+'">BorrarCol</button>';
        $("#tabla").append('<td class="marca">'+botonDelete+ '</td></tr>');

        $('#marca').val("");
        $('#modelo').val("");
        $('#precio').val("");
      },
      error:function(jqxml, status, errorThrown){
        console.log(errorThrown);
      }
    });
  });


  $(document).on('click','.btnBorraFila', function () {
    var deleteID = $(this).attr("id");
    borrarCol(deleteID);
  });

  function borrarCol (deleteID) {
    event.preventDefault();
    $.ajax({
      method: "DELETE",
      contentType: "application/json; charset=utf-8",
      url: "http://web-unicen.herokuapp.com/api/delete/"+deleteID,
      success: function(){
      },
      error:function(jqxml, status, errorThrown){
        console.log(errorThrown);
      }
    });
  }

});
