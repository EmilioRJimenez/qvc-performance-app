//const { post } = require("../../../routes");

$(document).ready(function () {


  $("#btnCloseDetails2").click(function(){
    $("#details2").css("opacity", "0");
    

    $(".bodyDetails2").hide();
  });
  $("#btnCloseDetails").click(function(){
    $("#details").css("opacity", "0");

    $(".bodyDetails").hide();
  });

  $("#btnCrossDetails").click(function(){
    $("#containerDetails").hide();
    $(".boxComment").remove();
  });
  



  $("#password2").focusout(function () {
    let pass1 = $("#password").val();
    let pass2 = $("#password2").val();
    if (pass1 === pass2) {
      $("#password").css("border", "solid lightgreen");
      $("#password2").css("border", "solid lightgreen");
    } else {
      $("#password").css("border", "solid red");
      $("#password2").css("border", "solid red");
    }
  });

  $("input").keypress(function (evt) {
    var keycode = evt.keyCode ? evt.keyCode : evt.which;
    if (keycode == "13") {
      evt.preventDefault();
    }
  });

  $("#fecha")
    .datepicker({
      constrainInput: false,
      currentText: "Now",
      dateFormat: "yy-mm-dd",
    })
    .datepicker("setDate", "0");

  $(".formProduccion").on("submit", function (evt) {
    if (total !== tiempoDisponible) {
      alert("El tiempo muerto no cuadra");
      evt.preventDefault();
    }
    // tu codigo aqui
  });

  $("#example").DataTable({
    language: {
      lengthMenu: "Mostrar _MENU_ registros",
      zeroRecords: "No se encontraron resultados",
      info:
        "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      infoFiltered: "(filtrado de un total de _MAX_ registros)",
      sSearch: "Buscar:",
      oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior",
      },
      sProcessing: "Procesando...",
    },
    //para usar los botones
    responsive: "true",
    //dom: 'Bfrtilp',
    /*buttons:[ 
			{
				extend:    'excelHtml5',
				text:      '<i class="fas fa-file-excel"></i> ',
				titleAttr: 'Exportar a Excel',
				className: 'btn btn-success icon-file-excel'
			},
			{
				extend:    'pdfHtml5',
				text:      '<i class="fas fa-file-pdf"></i> ',
				titleAttr: 'Exportar a PDF',
				className: 'btn btn-danger icon-file-pdf'
			},
			{
				extend:    'print',
				text:      '<i class="fa fa-print"></i> ',
				titleAttr: 'Imprimir',
				className: 'btn btn-info icon-printer'
			},
		]*/
  });

  $("#pzs").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#pzs").val("0");
    }
  }).focusout(function () {
    var pzs = $("#pzs").val();
    pzs = Number(pzs);
    var equipo = $("#equipo").val();

    equipo = Number(equipo);

    $.ajax({
      method: "GET",
      url: "/equipos/estandar",
      dataType: "json",
    }).done(function (data) {
      var equipos = data.equipos;

      var eq = equipos.find(function (res) {
        return res.id_equipo === equipo;
      });
      var estandar = eq.estandar;
      var porcent = (pzs * 100) / estandar;
      $("#porcentaje").text(Math.round(porcent) + "%");
      if (porcent < 70) {
        $("#porcentaje").css("color", "red");
      } else if (porcent >= 70 && porcent < 100) {
        $("#porcentaje").css("color", "#FBCD00");
      } else if (porcent >= 100) {
        $("#porcentaje").text("100%");
        $("#porcentaje").css("color", "green");
      }
    });
  });

  function validaCaracter(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if(keycode >= "48" && keycode <= "57" || keycode == "46"){
      return true;
     }else{
       return false;
     }
  }

  $("#errores").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#errores").val("0");
    }
  }).focusout(function (e) {
    
    otrosInteraction();
    let errores = $("#errores").val();
    if (errores == "") {
      $("#errores").val("0");
    }
  });

  $("#defectos").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#defectos").val("0");
    }
  }).focusout(function () {
    otrosInteraction();
    let defectos = $("#defectos").val();
    if (defectos == "") {
      $("#defectos").val("0");
    }
  });

  $("#calidad").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#calidad").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let calidad = $("#calidad").val();
    if (calidad == "") {
      $("#calidad").val("0");
    }
  });
  $("#mantto").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#mantto").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let mantto = $("#mantto").val();
    if (mantto == "") {
      $("#mantto").val("0");
    }
  });
  $("#materiales").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#materiales").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let materiales = $("#materiales").val();
    if (materiales == "") {
      $("#materiales").val("0");
    }
  });
  $("#cdd").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#cdd").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let cdd = $("#cdd").val();
    if (cdd == "") {
      $("#cdd").val("0");
    }
  });
  $("#procesos").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#procesos").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let procesos = $("#procesos").val();
    if (procesos == "") {
      $("#procesos").val("0");
    }
  });
  $("#enrredos").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#enrredos").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let enrredos = $("#enrredos").val();
    if (enrredos == "") {
      $("#enrredos").val("0");
    }
  });
  $("#atorones").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#atorones").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let atorones = $("#atorones").val();
    if (atorones == "") {
      $("#atorones").val("0");
    }
  });

  $("#setupa").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#setupa").val("0");
    }
  }).focusout(function (e) {
    sacarTiempo();
    let setupa = $("#setupa").val();
    if (setupa == "") {
      $("#setupa").val("0");
    }
  });
  $("#setupb").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#setupb").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let setupb = $("#setupb").val();
    if (setupb == "") {
      $("#setupb").val("0");
    }
  });
  $("#setupc").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#setupc").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let setupc = $("#setupc").val();
    if (setupc == "") {
      $("#setupc").val("0");
    }
  });
  $("#setupe").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#setupe").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let setupe = $("#setupe").val();
    if (setupe == "") {
      $("#setupe").val("0");
    }
  });
  $("#numerosetupa").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#numerosetupa").val("0");
    }
  }).focusout(function (e) {
    let setupa = $("#numerosetupa").val();
    if (setupa == "") {
      $("#numerosetupa").val("0");
    }
  });
  $("#numerosetupb").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#numerosetupb").val("0");
    }
  }).focusout(function () {
 
    let setupb = $("#numerosetupb").val();
    if (setupb == "") {
      $("#numerosetupb").val("0");
    }
  });
  $("#numerosetupc").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#numerosetupc").val("0");
    }
  }).focusout(function () {
    
    let setupc = $("#numerosetupc").val();
    if (setupc == "") {
      $("#numerosetupc").val("0");
    }
  });
  $("#numerosetupe").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#numerosetupe").val("0");
    }
  }).focusout(function () {

    let setupe = $("#numerosetupe").val();
    if (setupe == "") {
      $("#numerosetupe").val("0");
    }
  });
  $("#ajuste").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#ajuste").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let ajuste = $("#ajuste").val();
    if (ajuste == "") {
      $("#ajuste").val("0");
    }
  });
  $("#otrosTiempos").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#otrostiempos").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let otrostiempos = $("#otrostiempos").val();
    if (otrostiempos == "") {
      $("#otrostiempos").val("0");
    }
  });
  $("#tiempocorrido").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#tiempocorrido").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let otrostiempos = $("#tiempocorrido").val();
    if (otrostiempos == "") {
      $("#tiempocorrido").val("0");
    }
  });

  $("#cst").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#cst").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let cst = $("#cst").val();
    if (cst == "") {
      $("#cst").val("0");
    }
  });
  $("#cct").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#cct").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let cst = $("#cct").val();
    if (cst == "") {
      $("#cct").val("0");
    }
  });
  $("#terminal").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#terminal").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let cst = $("#terminal").val();
    if (cst == "") {
      $("#terminal").val("0");
    }
  });

  $("#terminalanillo").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#terminalanillo").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let cst = $("#terminalanillo").val();
    if (cst == "") {
      $("#terminalanillo").val("0");
    }
  });

  $("#sellocalidad").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#sellocalidad").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let cst = $("#sellocalidad").val();
    if (cst == "") {
      $("#sellocalidad").val("0");
    }
  });

  $("#cobre").keypress(function(e){
    if(!validaCaracter(e)){
      e.preventDefault();
      alert("Advertencia: \"Caracter no valido\"");
      $("#cobre").val("0");
    }
  }).focusout(function () {
    sacarTiempo();
    let cst = $("#cobre").val();
    if (cst == "") {
      $("#cobre").val("0");
    }
  });

  var turno = "";
  var tiempoDisponible = 0;

  $.ajax({
    url: "/usuarios/data",
    method: "GET",
    dataType: "json",
  }).done(function (result) {
    turno = result;
    if (turno == "A") {
      tiempoDisponible = 570;
      $("#tiemposDisponible").val(tiempoDisponible);
      $("#textTiempoDisponible").text(tiempoDisponible);
      $("#restaTiempoMuerto").text(tiempoDisponible);
    } else {
      tiempoDisponible = 504;
      $("#tiemposDisponible").val(tiempoDisponible);
      $("#textTiempoDisponible").text(tiempoDisponible);
      $("#restaTiempoMuerto").text(tiempoDisponible);
    }
  });

  var total = 0;
  function sacarTiempo() {
    var calidad = $("#calidad").val();
    calidad = Number(calidad);
    var mantto = $("#mantto").val();
    mantto = Number(mantto);
    var materiales = $("#materiales").val();
    materiales = Number(materiales);
    var cdd = $("#cdd").val();
    cdd = Number(cdd);
    var procesos = $("#procesos").val();
    procesos = Number(procesos);
    var enrredos = $("#enrredos").val();
    enrredos = Number(enrredos);
    var atorones = $("#atorones").val();
    atorones = Number(atorones);

    var setupa = $("#setupa").val();
    setupa = Number(setupa);
    var setupb = $("#setupb").val();
    setupb = Number(setupb);
    var setupc = $("#setupc").val();
    setupc = Number(setupc);
    var setupe = $("#setupe").val();
    setupe = Number(setupe);
    var ajuste = $("#ajuste").val();
    ajuste = Number(ajuste);
    var otrostiempos = $("#otrosTiempos").val();
    otrostiempos = Number(otrostiempos);
    var tiempocorrido = $("#tiempocorrido").val();
    tiempocorrido = Number(tiempocorrido);

    var tiempoDisponible = $("#tiemposDisponible").val();
    tiempoDisponible = Number(tiempoDisponible);

    var totalTiempo = $("#totalTiempoMuerto").val();
    totalTiempo = Number(totalTiempo);

    total =
      calidad +
      mantto +
      materiales +
      cdd +
      procesos +
      enrredos +
      atorones +
      setupa +
      setupb +
      setupc +
      setupe +
      ajuste +
      otrostiempos +
      tiempocorrido;

    var resta = tiempoDisponible - total;
    resta = Number(resta);

    if (total > tiempoDisponible) {
      $("#totalTiempoMuerto").css("color", "red");
      $(".tiempo").css("box-shadow", "0px 0px 5px 1px red");
    } else if (total === tiempoDisponible) {
      $(".tiempo").css("box-shadow", "0px 0px 5px 1px green");
    } else {
      $("#totalTiempoMuerto").css("color", "green");
      $(".tiempo").css("box-shadow", "0px 0px 5px 1px rgb(2, 172, 252");
    }

    $("#totalTiempoMuerto").text(total);

    if (resta > 0) {
      $("#restaTiempoMuerto").css("color", "green");
    } else {
      $("#restaTiempoMuerto").css("color", "red");
    }

    $("#restaTiempoMuerto").text(resta);
  }

  function otrosInteraction() {
    var errores = $("#errores").val();
    errores = Number(errores);
    var defectos = $("#defectos").val();
    defectos = Number(defectos);

    var totalOtros = errores + defectos;
    totalOtros = Number(totalOtros);
    var porcentajeOtros = (totalOtros * 100) / 6;
    porcentajeOtros = Number(porcentajeOtros);

    if (totalOtros === 0) {
      $("#porcentajeOtros").text("0%");
      $("#porcentajeOtros").css("color", "#24d000");
    } else if (totalOtros < 6) {
      $("#porcentajeOtros").text(Math.round(porcentajeOtros) + "%");

      $("#porcentajeOtros").css("color", "#fcfc1c");
    } else {
      $("#porcentajeOtros").text("100%");
      $("#porcentajeOtros").css("color", "#ff2a2a");
    }
  }

  var equipo = $("#equipo").val();
  equipo = $("#equipo").val();

  $("#equipo").change(function () {
    equipo = $("#equipo").val();
  });

  var firstOption = $("#tipo").val();

  if (typeof firstOption !== "undefined") {
    $.ajax({
      url: "/query/opciones",
      method: "POST",
      data: { opcion: $("#tipo").val() },
      success: function (datos) {
        $(".op").addClass("opOculto");
        $(".opOculto").remove();
        datos.forEach((element) => {
          $("#opcion").append(
            `<option class='op' value='${element.nombre}'>${element.nombre}</option>`
          );
        });
      },
    });
  }

  $("#reporte").change(function () {
    let report = $("#reporte").val();

    if (report === "calidad_corte") {
      $("#tipo").append(
        "<option value='tiposcrap' id='tiposcrap'>Tipo de scrap</option>"
      );
    } else {
      $("#tiposcrap").remove();
    }
  });

  $("#tipo").change(function () {
    let valTipo = $("#tipo").val();
    if (valTipo === "equipo") {
      data = { opcion: "equipo" };
    } else if (valTipo === "tipoequipo") {
      data = { opcion: "tipo_equipo" };
    } else {
      data = { opcion: "tipo_scrap" };
    }

    $.ajax({
      url: "/query/opciones",
      method: "POST",
      data: data,
      success: function (datos) {
        $(".op").addClass("opOculto");
        $(".opOculto").remove();
        datos.forEach((element) => {
          $("#opcion").append(
            `<option class='op' value='${element.nombre}'>${element.nombre}</option>`
          );
        });
      },
    });
  });

  var myChart;
  var myPieChart;
  var efectividad;

  $("#btnGenerarGrafica").click(function (e) {
    e.preventDefault();
    $("#myChart").remove(); // this is my <canvas> element
    $(".chart-container").append('<canvas id="myChart"><canvas>');

    $("#tableResults").remove(); // this is my <canvas> element
    $(".contentTableResults").append(`
  <table id="tableResults" class="table-bordered table-striped">
    <thead>
      <th class="tdEquipo">Equipo</th>
      <th class="tdEquipo">Número</th>
      <th>Turno</th>
      <th>Fecha</th>
      <th>Estandar</th>
      <th>Producción</th>
    </thead>
    <tbody id="tbodyResults">

    </tbody>
  <table>`);
    $("#contentTableResults").css("display", "none");
    $("#tableResults").css("display", "none");

    var reporte = $("#reporte").val();
    var turno = $("#turno").val();
    var tipo = $("#tipo").val();
    var opcion = $("#opcion").val();
    var fechaInicio = $("#fechaInicio").val();
    var fechaFin = $("#fechaFin").val();

    let formData = {
      reporte,
      turno,
      tipo,
      opcion,
      fechaInicio,
      fechaFin,
    };

    $.ajax({
      url: "/query",
      method: "POST",
      data: formData,
      success: function (data) {
        var datos = data.result;
        var equipos = [];
        var piezas = [];
        var estandar = [];
        var fechas = [];

        var totalProduccion = 0;
        var totalEstandar = 0;
        var colores = [];
        var borderColor = [];
        var efectividad = 0;
        if (reporte === "produccion") {
          if (opcion === "Todo") {
            datos.forEach((element) => {
              equipos.push(element.equipo);
              piezas.push(element.produccion);
              estandar.push(element.estandar);
              efectividad = (element.produccion * 100) / element.estandar;
              if (efectividad <= 90) {
                borderColor.push("red");
                colores.push("#ff2a2a");
              } else if(efectividad >= 90 && efectividad < 100){
                borderColor.push("#F5F10D");
                colores.push("#fcfc1c");
              }else if(efectividad >= 100){
                borderColor.push("green");
                colores.push("#24d000");
              }
            });

            

            piezas.forEach((element) => (totalProduccion += element));
            estandar.forEach((element) => (totalEstandar += element));

            var dataLabels = [equipos];
            var dataSets = [piezas, estandar];

            $("#producciontotal").text(totalProduccion);
            $("#produccionesperada").text(totalEstandar);

            var diferenciaProduccion = totalProduccion - totalEstandar;

            $("#producciondiferencia").text(diferenciaProduccion);
            var colorDonut = []
            if (diferenciaProduccion < 0) {
              $("#producciondiferencia").css("color", "#ff2a2a");
              colorDonut.push("lightblue","#ff2a2a")
            } else {
              $("#producciondiferencia").css("color", "#24d000");
              colorDonut.push("lightblue","#24d000")
            }
            
            var porcentajeEfectividad = (totalProduccion * 100) / totalEstandar;

            $("#produccionEfectividad").text(
              Math.round(porcentajeEfectividad) + "%"
            );
            if (porcentajeEfectividad > 0 && porcentajeEfectividad < 90) {
              $("#produccionEfectividad").css("color", "#ff2a2a");
            } else if (
              porcentajeEfectividad >= 90 &&
              porcentajeEfectividad < 100
            ) {
              $("#produccionEfectividad").css("color", "#fcfc1c");
            } else if (porcentajeEfectividad >= 100) {
              $("#produccionEfectividad").css("color", "#24d000");
            }

            
          } else {
            var matriz = [];
            var colores = [];
            var borderColor = [];
            var efectividad = 0;
            
            if (tipo === "equipo") {
              if(turno !== "Ambos"){
              
             
              datos.forEach((element) => {
                matriz.push(
                   element.fecha.substring(10, 0)
                );
              
                //equipos.push(element.equipo);
                //fechas.push(element.fecha.substring(10, 0));
                piezas.push(element.produccion);
                estandar.push(element.estandar);
              
                efectividad = (element.produccion * 100) / element.estandar;
              if (efectividad <= 90) {
                borderColor.push("red");
                colores.push("#ff2a2a");
              } else if(efectividad >= 90 && efectividad < 100){
                borderColor.push("#F5F10D");
                colores.push("#fcfc1c");
              }else if(efectividad >= 100){
                borderColor.push("green");
                colores.push("#24d000");
              }
              
              });
            }else{
              datos.forEach((element) => {
                matriz.push(
                  element.fecha.substring(10, 0)
                );
              
                //equipos.push(element.equipo);
                //fechas.push(element.fecha.substring(10, 0));
                piezas.push(element.produccion);
                estandar.push(element.estandar);
              
                efectividad = (element.produccion * 100) / element.estandar;
              if (efectividad <= 90) {
                borderColor.push("red");
                colores.push("#ff2a2a");
              } else if(efectividad >= 90 && efectividad < 100){
                borderColor.push("#F5F10D");
                colores.push("#fcfc1c");
              }else if(efectividad >= 100){
                borderColor.push("green");
                colores.push("#24d000");
              }
              });
            }

              piezas.forEach((element) => (totalProduccion += element));
              estandar.forEach((element) => (totalEstandar += element));

              var dataLabels = [matriz];
              var dataSets = [piezas, estandar];
              $("#producciontotal").text(totalProduccion);
              $("#produccionesperada").text(totalEstandar);

              var diferenciaProduccion = totalProduccion - totalEstandar;

              $("#producciondiferencia").text(diferenciaProduccion);
              var colorDonut = [];
              if (diferenciaProduccion < 0) {
                $("#producciondiferencia").css("color", "#ff2a2a");
                colorDonut.push("lightblue","#ff2a2a")
              } else {
                $("#producciondiferencia").css("color", "#24d000");
                colorDonut.push("lightblue","#24d000")
              }
              var porcentajeEfectividad =
                (totalProduccion * 100) / totalEstandar;
                
              $("#produccionEfectividad").text(
                Math.round(porcentajeEfectividad) + "%"
              );
              if (porcentajeEfectividad > 0 && porcentajeEfectividad < 90) {
                $("#produccionEfectividad").css("color", "#ff2a2a");
            
              } else if (
                porcentajeEfectividad >= 90 &&
                porcentajeEfectividad < 100
              ) {
          
                $("#produccionEfectividad").css("color", "#fcfc1c");
              } else if (porcentajeEfectividad >= 100) {
                $("#produccionEfectividad").css("color", "#24d000");
              }
            } else {
              
              var colores = [];
                var borderColor = [];
                var efectividad = 0;
              datos.forEach((element) => {
                
                equipos.push(element.equipo);
                piezas.push(element.produccion);
                estandar.push(element.estandar);
                efectividad = (element.produccion * 100) / element.estandar;
                if (efectividad <= 90) {
                  borderColor.push("red");
                  colores.push("#ff2a2a");
                } else if(efectividad >= 90 && efectividad < 100){
                  borderColor.push("#F5F10D");
                  colores.push("#fcfc1c");
                }else if(efectividad >= 100){
                  borderColor.push("green");
                  colores.push("#24d000");
                }
              });
              
              piezas.forEach((element) => (totalProduccion += element));
              estandar.forEach((element) => (totalEstandar += element));

              var dataLabels = [equipos];
              var dataSets = [piezas, estandar];
              $("#producciontotal").text(totalProduccion);
              $("#produccionesperada").text(totalEstandar);

              var diferenciaProduccion = totalProduccion - totalEstandar;

              $("#producciondiferencia").text(diferenciaProduccion);
              var colorDonut = []
;              if (diferenciaProduccion < 0) {
                $("#producciondiferencia").css("color", "#ff2a2a");
                colorDonut.push("lightblue","#ff2a2a")
              } else {
                $("#producciondiferencia").css("color", "#24d000");
                colorDonut.push("lightblue","#24d000")
              }

              var porcentajeEfectividad =
                (totalProduccion * 100) / totalEstandar;

              $("#produccionEfectividad").text(
                Math.round(porcentajeEfectividad) + "%"
              );
              if (porcentajeEfectividad > 0 && porcentajeEfectividad < 90) {
                $("#produccionEfectividad").css("color", "#ff2a2a");
              } else if (
                porcentajeEfectividad >= 90 &&
                porcentajeEfectividad < 100
              ) {
                $("#produccionEfectividad").css("color", "#fcfc1c");
              } else if (porcentajeEfectividad >= 100) {
                $("#produccionEfectividad").css("color", "#24d000");
              }
            }
          }
        } else if (reporte === "tiempos_corte") {
          alert("tiempo muerto");
        } else {
          alert("scrap");
        }

        $("#chartResumen").remove(); // this is my <canvas> element
        $(".content-canvas-donut").append('<canvas id="chartResumen"><canvas>');

        var ctx1 = document.getElementById("chartResumen").getContext("2d");
        myPieChart = new Chart(ctx1, {
          type: "doughnut",
          data: {
            datasets: [
              {
                label: ['Objetivo', 'Proucción en el objetivo', 'Producción casi en el objetivo', 'Producción bajo el objetivo'],
                data: [totalProduccion, diferenciaProduccion],
                backgroundColor: colorDonut,
                borderColor: ["white"],
              },
            ],
            labels: ["Total", "Diferencia"],
          },
          options: {},
        });

        var ctx = document.getElementById("myChart").getContext("2d");
        myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: dataLabels[0],
            datasets: [
              {
                label: "Estandar",
                data: dataSets[1],
                lineTension: 0,
                type: "line",
                borderColor: "#000",
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: "#000",
                fill: false,
              },
              {
                label: "Produccion",
                data: dataSets[0],
                borderColor: colores,
                backgroundColor: colores,
                borderWidth: 1,
              },
            ],
          },
          options: {
            
onClick: function(e, i) {

  $("#myChart2").remove(); // this is my <canvas> element
    $(".middleDetails").append('<canvas id="myChart2"><canvas>');
   

  e = i[0];

  var x_value = this.data.labels[e._index];
  var y_value = this.data.datasets[0].data[e._index];
  let equipoDetail = x_value;

  let dataDetails = {
    reporte,
    equipo: equipoDetail,
    turno,
    tipo,
    opcion,
    fechaInicio,
    fechaFin
  }


  if(tipo === "equipo" && opcion === "Todo" || tipo == "tipoequipo"){
    $(".bodyDetails2").show();
    $("#details2").animate({
      opacity: 1
    }, 500);

    $("#opcionDetail").text(equipoDetail);
    $("#reporteDetail").text(reporte);
    $("#turnoDetail").text(turno);
    $("#fechaInicioDetalle").text(fechaInicio);
    $("#fechaFinDetalle").text(fechaFin);

    query("query/dateproduccion", dataDetails, "POST");

    


  }else{


    $(".bodyDetails").show();
    $("#details").animate({
      opacity: 1
    }, 500);



    
  }
  


  function query(url, data, method){
    $.ajax({
      url: url,
      method: method,
      data: data,
      success: function(datos){
        var result = datos.result;
        let dias = [];
        let produccion = [];
        let estandares = [];
        let colores = [];

        result.forEach(element => {
          dias.push(element.fecha.substring(10, 0));
          produccion.push(element.produccion);
          estandares.push(element.estandar);
          let efectividad = (element.produccion * 100) / element.estandar;
          if(efectividad < 90){
            colores.push("#ff2a2a");
          }else if(efectividad >= 90 && efectividad < 100){
            colores.push("#fcfc1c");
          }else{
            colores.push("#24d000");
          }
        });
        
        let dataLabels = [dias];
        let dataSets = [estandares, produccion];

        

var ctx = document.getElementById("myChart2").getContext("2d");
myChart2 = new Chart(ctx, {
  type: "bar",
  data: {
    labels: dataLabels[0],
    datasets: [
      {
        label: "Estandar",
        data: dataSets[0],
        lineTension: 0,
        type: "line",
        borderColor: "#000",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#000",
        fill: false,
      },
      {
        label: "Produccion",
        data: dataSets[1],
        borderColor: colores,
        backgroundColor: colores,
        borderWidth: 1,
      },
    ],
  },
  options: {
    onClick: function(e,i) {
 
      let equipoDetail = $("#opcionDetail").text()
      $("#containerDetails").show();
      $("#myChartTime").remove(); // this is my <canvas> element
      $(".col4-2-1").append('<canvas id="myChartTime"><canvas>');
  
      $("#mychartProductionDetails").remove();
      $(".chartProductionContainer").append('<canvas id="mychartProductionDetails"></canvas>');
      
      $("#myChartScrapDetail").remove();
      $(".mychartscrapcontainerdetail").append('<canvas id="myChartScrapDetail"></canvas>');
      



      e = i[0];

        var x_value = this.data.labels[e._index];
        var y_value = this.data.datasets[0].data[e._index];
        let fecha = x_value;
        

        let equipo = $("#opcionDetail").text();
        let turno = $("#turnoDetail").text();
        let fechaInicioDetalle = $("#fechaInicioDetalle").text();
        let fechaFinDetalle = $("#fechaFinDetalle").text();

        $("#equipodetail").text(equipo);
      $("#turnodetail").text(turno);
      $("#fechaIniciodetails").text(fecha);
      $("#fechaFindetails").text(fecha);

      let dataDetails = {
        reporte,
        equipo,
        turno,
        tipo,
        opcion,
        fecha
      }

      var id_produccion;
       
      //Producción
      $.ajax({
        url: "query/production",
        method: "POST",
        data: dataDetails
      }).done(function(resultados){

        

        var produccion = 0;
        let estandar = 0;
        
        
        produccion = resultados[0].produccion;
        estandar = resultados[0].estandar;
        id_produccion = resultados[0].id;
        
        produccion = Number(produccion);
        estandar = Number(estandar);
        let diferencia = (-estandar) + produccion;
        $("#resultPzsDif").text(diferencia);
       

        var efectividadProduccion = (produccion * 100) / estandar;

        efectividadProduccion = Math.round(efectividadProduccion);
      $("#resultProductionDetail").text(produccion);
      $("#porcentProduction").text(efectividadProduccion + "%");

      var pzshora = 0;
      let produccionColors = ["#000"];
      if(efectividadProduccion < 90){
        produccionColors.push("red")
        $(".circle-production").css("background", "red");
      }else if(efectividadProduccion >= 90 && efectividadProduccion < 100){
        produccionColors.push("yellow");
        $(".circle-production").css("background", "yellow");
      }else{
        produccionColors.push("green");
        $(".circle-production").css("background", "lightgreen");
      }
      let ds = resultados[0];
      let ctx = document.getElementById("mychartProductionDetails").getContext("2d");
      var mixedChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: ["Estandar", "Producción"],
            datasets: [{
                label: 'Resultado',
                data: [estandar, produccion],
                backgroundColor: produccionColors,
            }, /*{
                label: 'Line Dataset',
                data: [produccion],
    
                // Changes this dataset to become a line
                type: 'horizontalBar'
            }*/],
            
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: true,
                },
              },  
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  display: true,
                },
              },
            ],
          },
        }
    });

      dataDetails = {
        id_produccion,
        reporte,
        equipo,
        turno,
        tipo,
        opcion,
        fecha
      }
//////////////////////
      $.ajax({
        url: "query/comentarios",
        method: "POST",
        data: {
          id_produccion
        }
      }).done(function(result){
       
        result.forEach(item => {
          $(".col6").append(`
          <div class="boxComment">${item.comentario}</div>
          `);
        })
      })
///////////////////////////
      $.ajax({
        url: "query/calidad",
        method: "POST",
        data: {
          id_produccion
        }
      }).done(function(result){
        let errores = 0;
        let defectos = 0;
        result.forEach(item => {
         errores = Number(item.errores);
         defectos = Number(item.defectos);
        })

        $("#resultErrorsDetail").text(errores);
        $("#resultDefectsDetail").text(defectos);
        if(errores == 0){
          $("#porcentErrors").text("100%");
          $(".circle-errors").css("background", "lightgreen");
         
        }else {
          $("#porcentErrors").text("0%");
          $(".circle-errors").css("background", "red");
        }
        if(defectos == 0){
          $("#porcentDefects").text("100%");
          $(".circle-defects").css("background", "lightgreen")
         
        }else {
          $("#porcentDefects").text("0%");
          $(".circle-defects").css("background", "red")
        }
      })
////////////////////////////
      $.ajax({
        url: "query/tiempomuerto",
        method: "POST",
        data: dataDetails
      }).done(function(result){
       
        let totalTime = 0;
        let tiempocorrido = 0;
        let tiempoDisponible = 0;
        
        var efecttiempomuerto = 0;

        let setupa = 0;
        let setupb = 0;
        let setupc = 0;
        let setupe = 0;
        let procesos = 0;
        let otros = 0;
        let materiales = 0;
        let mantto = 0;
        let cdd = 0;
        let calidad = 0; 
        let enrredos = 0;
        let atorones = 0;
        let ajuste = 0;
        let numerosua = 0;
        let numerosub = 0;
        let numerosuc = 0;
        let numerosue = 0;
  
        let dataLabels = [];
        let dataTime = [];

        result.forEach(item => {
           setupa = Number(item.setupa);
           setupb = Number(item.setupb);
           setupc = Number(item.setupc);
           setupe = Number(item.setupe);
          tiempocorrido = Number(item.tiempocorrido);
           procesos = Number(item.procesos);
           otros = Number(item.otros);
           materiales = Number(item.materiales);
           mantto = Number(item.mantto);
           cdd = Number(item.cdd);
          calidad = Number(item.calidad);
           enrredos = Number(item.enrredos);
           atorones = Number(item.atorones);
           ajuste = Number(item.ajuste);
           numerosua = Number(item.numerosetupa);
           numerosub = Number(item.numerosetupb);
           numerosuc = Number(item.numerosetupc);
           numerosue = Number(item.numerosetupe);
          totalTime = setupa+setupb+setupc+setupe+procesos+otros+materiales+mantto+cdd+calidad+enrredos+atorones+ajuste;
          

          
        })

        pzshora = (produccion / tiempocorrido) * 60;

        $("#pzshora").text(Math.round(pzshora));

        dataLabels = ['setupa', 'setupb', 'setupc', 'setupe', 'procesos', 'materiales', 'mantto', 'cdd', 'calidad', 'enrredos', 'atorones', 'ajuste', 'otros' ];

        dataTime = [setupa, setupb, setupc, setupe, procesos, materiales, mantto, cdd, calidad, enrredos, atorones, ajuste, otros];

        $("#resulttotaltimesu").text(Math.round(setupa+setupb+setupc+setupe));
        $("#resulttotalsu").text(Math.round(numerosua+numerosub+numerosuc+numerosue));
        $("#resultprosu").text(Math.round((setupa+setupb+setupc+setupe)/(numerosua+numerosub+numerosuc+numerosue)));
        let ctx3 = document.getElementById("myChartTime").getContext("2d");
        var myDoughnutChart = new Chart(ctx3, {
          type: 'line',
          data: {
            labels: dataLabels,
            datasets: [{
              
              data: dataTime,
              pointBorderColor: ['green', 'blue', 'lightblue', 'orange', 'violet', 'pink', '#00D3FF', 'grey', 'brown', 'purple', 'red', 'black', 'darkred'],
              steppedLine: true,
              backgroundColor: "transparent",
              pointBorderWidth: 4,
              pointBackgroundColor: ['green', 'blue', 'lightblue', 'orange', 'violet', 'pink', '#00D3FF', 'grey', 'brown', 'purple', 'red', 'black', 'darkred']
            }]
          },
          options: {
           
            /*rotation: -Math.PI,
            cutoutPercentage: 30,
            circumference: Math.PI,
            legend: {
              position: 'left'
            },
            animation: {
              animateRotate: false,
              animateScale: true
            },*/
            //scales: { xAxes: [{ ticks: { fontSize: 10 } }] },
            legend: { 
              display: false,
              position: 'bottom',
              labels: {
                  fontSize: 26,
              }
            }
          }
      });


        $("#numerosua").text(numerosua);
        $("#tsua").text(setupa);
        if(numerosua == 0){
          $("#tpsua").text("0");
        }else{
          $("#tpsua").text((setupa / numerosua));
        }
        $("#numerosub").text(numerosub);
        $("#tsub").text(setupb);
        if(numerosub == 0){
          $("#tpsub").text("0");
        }else{
          $("#tpsub").text((setupb / numerosub));
        }
        $("#numerosuc").text(numerosuc);
        $("#tsuc").text(setupc);
        if(numerosuc == 0){
          $("#tpsuc").text("0");
        }else{
          $("#tpsuc").text((setupc / numerosuc));
        }
        $("#numerosue").text(numerosue);
        $("#tsue").text(setupe);
        if(numerosue == 0){
          $("#tpsue").text("0");
        }else{
          $("#tpsue").text((setupe / numerosue));
        }

        $("#tmantto").text(mantto);
        $("#tcdd").text(cdd);
        $("#tcalidad").text(calidad);
        $("#tmateriales").text(materiales);
        $("#tenredos").text(enrredos);
        $("#tatorones").text(atorones);
        $("#tprocesos").text(procesos);
        $("#tajuste").text(ajuste);
        $("#totros").text(otros);
        $("#textTotalt").text(totalTime.toFixed(2));

        ////////////////////////////////////////

        $.ajax({
          url: "query/scrap",
          method: "POST",
          data: {
            id_produccion
          }
        }).done(function(result){
          let cct = 0;
          let cst = 0;
          let terminal = 0;
          let terminalanillo = 0;
          let sello = 0;
          let cobre = 0;
          let costocst = 0;
          let costocct = 0;
          let costoterminal = 0;
          let costoterminalanillo = 0; 
          let costosello = 0;
          let costocobre = 0; 

        
          result.forEach(item => {
              cst = Number(item.cst);
              cct = Number(item.cct);
              terminal = Number(item.terminal);
              terminalanillo = Number(item.terminal_anillo);
              sello = Number(item.sello);
              cobre = Number(item.cobre);

              costocst = Number(item.costocst);
              costocct = Number(item.costocct);
              costoterminal = Number(item.costoterminal);
              costoterminalanillo = Number(item.costoterminalconanillo);
              costosello = Number(item.costosello);
              costocobre = Number(item.costocobre);
          })

          let datasetScrap = [];
          let dataScrap = [];
          let dataCosts = [];
          let dataEstandarscrap = [];

          let totalcst = cst * costocst;
          let totalcct = cct * costocct;
          let totalterminal = terminal * costoterminal;
          let totalterminalanillo = terminalanillo * costoterminalanillo;
          let totalsello = sello * costosello;
          let totalcobre = cobre * costocobre;
          
          dataScrap = ['cst', 'cct', 'Terminal', 'Terminal con anillo', 'Sello', 'Cobre'];
          dataCosts = [totalcst, totalcct, totalterminal, totalterminalanillo, totalsello, totalcobre];
          dataEstandarscrap = [costocst, costocct, costoterminal, costoterminalanillo, costosello, costocobre];

          

          let ctx4 = document.getElementById("myChartScrapDetail").getContext("2d");
          var myChartScrap = new Chart(ctx4, {
            type: 'bar',
            data: {
                datasets: [{
                    data: dataCosts,
                    backgroundColor: ['#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF']
                },/* {
                    data: dataEstandarscrap,

                    // Changes this dataset to become a line
                    type: 'line'
                }*/],
                labels: dataScrap
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
            }
          })

          let totalscrap = totalcst+totalcct+totalterminal+totalterminalanillo+totalsello+totalcobre;
          let standarscrap = 0;
          var efectScrap = 0;

///////////////////////////////////////

          $.ajax({
            url: "query/estandarscrap",
            method: "POST",
            data: {
              equipo,
              turno
            }
          }).done(function(result){

            
            result.forEach(item =>{
              standarscrap = Number(item.estandar_scrap);
            })
            let scrapdif = standarscrap - totalscrap;
            $("#scrapdif").text(scrapdif.toFixed(2));
            $("#targetScrap").text(standarscrap.toFixed(2));
            efectScrap = (100 - ((totalscrap * 100) / standarscrap));
            $("#porcentScrap").text(Math.round(efectScrap) + "%");
            if(efectScrap < 90){
              $(".circle-scrap").css("background", "red");
            }else if(efectScrap >= 90 && efectScrap < 100){
              $(".circle-scrap").css("background", "yellow");
            }else{
              $(".circle-scrap").css("background", "lightgreen")
            }




              $("#totalScrap").text(totalscrap.toFixed(2));
              $("#resultScrapDetail").text(totalscrap.toFixed(2));
              $("#tcst").text(cst);
              $("#ccst").text(costocst);
              $("#pcst").text(cst*costocst);
    
              $("#tcct").text(cct);
              $("#ccct").text(costocct);
              $("#pcct").text(cct*costocct);
    
              $("#tterminal").text(terminal);
              $("#cterminal").text(costoterminal);
              $("#pterminal").text(terminal*costoterminal);
    
              $("#tterminalanillo").text(terminalanillo);
              $("#cterminalanillo").text(costoterminalanillo);
              $("#pterminalanillo").text(terminalanillo*costoterminalanillo);
    
              $("#tsello").text(sello);
              $("#csello").text(costosello);
              $("#psello").text(sello*costosello);
    
              $("#tcobre").text(cobre);
              $("#ccobre").text(costocobre);
              $("#pcobre").text(cobre*costocobre);
    
              
            if(turno == 'A'){
              tiempoDisponible = 570;
            }else if(turno == 'B'){
              tiempoDisponible = 504
            }
            efecttiempomuerto = 100 - ((totalTime * 100) / tiempoDisponible);
            efecttiempomuerto = Math.round(efecttiempomuerto);
            if(efecttiempomuerto < 90){
              $(".circle-time").css("background", "red");
              $(".circle-hour").css("background", "red");
            }else if(efecttiempomuerto >= 90 && efecttiempomuerto < 100){
              $(".circle-time").css("background", "yellow");
              $(".circle-hour").css("background", "yellow");
            }else{
              $(".circle-time").css("background", "lightgreen");
              $(".circle-hour").css("background", "lightgreen");
            }
          
            $("#resultTotalTime").text(tiempocorrido);
            $("#resultTimeDetail").text(totalTime);
            $("#porcentTime").text(efecttiempomuerto + "%");
            $("#porcentTotalTime").text(efecttiempomuerto + "%");
            $("#resultPorcentTime").text((100 - efecttiempomuerto) + "%");
            $("#disponibleTime").text(tiempoDisponible);  
    
            
            let eficient = 0;
            eficient = (efectividadProduccion + efectScrap + efecttiempomuerto) / 3;
            $("#eficienciaGeneral").text(Math.round(eficient) + "%");
            if(eficient <  90){
              $("#eficienciaGeneral").css("color", "red");
            }else if(eficient >= 90 && eficient < 100){
              $("#eficienciaGeneral").css("color", "yellow");
            }else{
              $("#eficienciaGeneral").css("color", "lightgreen");
            }

          })  

          
          

        })

       
      })
      })
     
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
          },
        },
      ],
    },
  },
});

      }
    })
  }   
},
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: true,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: true,
                  },
                },
              ],
            },
          },
        });
      },
    }).done(function (result) {
      $("#btnTodoslosDetalles").click(function(){
        var equipo = $("#opcionDetail").text();
        var turno = $("#turnoDetail").text();
        let dataDetails = {
          equipo,
          turno,
          fechaInicio,
          fechaFin
        }

        $("#containerDetails").show();
          $("#myChartTime").remove(); // this is my <canvas> element
          $(".col4-2-1").append('<canvas id="myChartTime"><canvas>');
      
          $("#mychartProductionDetails").remove();
          $(".chartProductionContainer").append('<canvas id="mychartProductionDetails"></canvas>');
          
          $("#myChartScrapDetail").remove();
          $(".mychartscrapcontainerdetail").append('<canvas id="myChartScrapDetail"></canvas>');
      

          $("#equipodetail").text(equipo);
          $("#turnodetail").text(turno);
          $("#fechaIniciodetails").text(fechaInicio);
          $("#fechaFindetails").text(fechaFin);
    
        $.ajax({
          url: "query/detallesproduccion",
          method: "POST",
          data: dataDetails,
          success: function(result){
            
            var produccion = 0;
            let estandar = 0;
            
            
            produccion = result[0].produccion;
            estandar = result[0].estandar;
            
            produccion = Number(produccion);
            estandar = Number(estandar);
            let diferencia = (-estandar) + produccion;
            $("#resultPzsDif").text(diferencia);
           
    
            var efectividadProduccion = (produccion * 100) / estandar;
    
            efectividadProduccion = Math.round(efectividadProduccion);
          $("#resultProductionDetail").text(produccion);
          $("#porcentProduction").text(efectividadProduccion + "%");
    
          var pzshora = 0;
          let produccionColors = ["#000"];
          if(efectividadProduccion < 90){
            produccionColors.push("red")
            $(".circle-production").css("background", "red");
          }else if(efectividadProduccion >= 90 && efectividadProduccion < 100){
            produccionColors.push("yellow");
            $(".circle-production").css("background", "yellow");
          }else{
            produccionColors.push("green");
            $(".circle-production").css("background", "lightgreen");
          }
          let ds = result[0];
          let ctx = document.getElementById("mychartProductionDetails").getContext("2d");
          var mixedChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
              labels: ["Estandar", "Producción"],
                datasets: [{
                    label: 'Resultado',
                    data: [estandar, produccion],
                    backgroundColor: produccionColors,
                }, /*{
                    label: 'Line Dataset',
                    data: [produccion],
        
                    // Changes this dataset to become a line
                    type: 'horizontalBar'
                }*/],
                
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                yAxes: [
                  {
                    gridLines: {
                      display: true,
                    },
                  },  
                ],
                xAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: true,
                    },
                  },
                ],
              },
            }
        })    

        let errores = 0;
        let defectos = 0;
        result.forEach(item => {
         errores = Number(item.errores);
         defectos = Number(item.defectos);
        })

        $("#resultErrorsDetail").text(errores);
        $("#resultDefectsDetail").text(defectos);
        if(errores == 0){
          $("#porcentErrors").text("100%");
          $(".circle-errors").css("background", "lightgreen");
         
        }else {
          $("#porcentErrors").text("0%");
          $(".circle-errors").css("background", "red");
        }
        if(defectos == 0){
          $("#porcentDefects").text("100%");
          $(".circle-defects").css("background", "lightgreen")
         
        }else {
          $("#porcentDefects").text("0%");
          $(".circle-defects").css("background", "red")
        }




        let totalTime = 0;
        let tiempocorrido = 0;
        let tiempoDisponible = 0;
        
        var efecttiempomuerto = 0;

        let setupa = 0;
        let setupb = 0;
        let setupc = 0;
        let setupe = 0;
        let procesos = 0;
        let otros = 0;
        let materiales = 0;
        let mantto = 0;
        let cdd = 0;
        let calidad = 0; 
        let enrredos = 0;
        let atorones = 0;
        let ajuste = 0;
        let numerosua = 0;
        let numerosub = 0;
        let numerosuc = 0;
        let numerosue = 0;
        let num = 0;
  
        let dataLabels = [];
        let dataTime = [];

        result.forEach(item => {
           setupa = Number(item.setupa);
           setupb = Number(item.setupb);
           setupc = Number(item.setupc);
           setupe = Number(item.setupe);
          tiempocorrido = Number(item.tiempocorrido);
           procesos = Number(item.procesos);
           otros = Number(item.otros);
           materiales = Number(item.materiales);
           mantto = Number(item.mantto);
           cdd = Number(item.cdd);
          calidad = Number(item.calidad);
           enrredos = Number(item.enrredos);
           atorones = Number(item.atorones);
           ajuste = Number(item.ajuste);
           numerosua = Number(item.numerosetupa);
           numerosub = Number(item.numerosetupb);
           numerosuc = Number(item.numerosetupc);
           numerosue = Number(item.numerosetupe);
           num = Number(item.num);
          totalTime = setupa+setupb+setupc+setupe+procesos+otros+materiales+mantto+cdd+calidad+enrredos+atorones+ajuste;
          

          
        })

        pzshora = (produccion / tiempocorrido) * 60;

        $("#pzshora").text(Math.round(pzshora));

        dataLabels = ['setupa', 'setupb', 'setupc', 'setupe', 'procesos', 'materiales', 'mantto', 'cdd', 'calidad', 'enrredos', 'atorones', 'ajuste', 'otros' ];

        dataTime = [setupa, setupb, setupc, setupe, procesos, materiales, mantto, cdd, calidad, enrredos, atorones, ajuste, otros];

        $("#resulttotaltimesu").text(Math.round(setupa+setupb+setupc+setupe));
        $("#resulttotalsu").text(Math.round(numerosua+numerosub+numerosuc+numerosue));
        $("#resultprosu").text(Math.round((setupa+setupb+setupc+setupe)/(numerosua+numerosub+numerosuc+numerosue)));
        let ctx3 = document.getElementById("myChartTime").getContext("2d");
        var myDoughnutChart = new Chart(ctx3, {
          type: 'line',
          data: {
            labels: dataLabels,
            datasets: [{
              
              data: dataTime,
              pointBorderColor: ['green', 'blue', 'lightblue', 'orange', 'violet', 'pink', '#00D3FF', 'grey', 'brown', 'purple', 'red', 'black', 'darkred'],
              steppedLine: false,
              backgroundColor: "transparent",
              pointBorderWidth: 4,
              pointBackgroundColor: ['green', 'blue', 'lightblue', 'orange', 'violet', 'pink', '#00D3FF', 'grey', 'brown', 'purple', 'red', 'black', 'darkred']
            }]
          },
          options: {
           
            /*rotation: -Math.PI,
            cutoutPercentage: 30,
            circumference: Math.PI,
            legend: {
              position: 'left'
            },
            animation: {
              animateRotate: false,
              animateScale: true
            },*/
            //scales: { xAxes: [{ ticks: { fontSize: 10 } }] },
            legend: { 
              display: false,
              position: 'bottom',
              labels: {
                  fontSize: 26,
              }
            }
          }
      });


        $("#numerosua").text(numerosua);
        $("#tsua").text(setupa);
        if(numerosua == 0){
          $("#tpsua").text("0");
        }else{
          $("#tpsua").text((setupa / numerosua).toFixed(0));
        }
        $("#numerosub").text(numerosub);
        $("#tsub").text(setupb);
        if(numerosub == 0){
          $("#tpsub").text("0");
        }else{
          $("#tpsub").text((setupb / numerosub).toFixed(0));
        }
        $("#numerosuc").text(numerosuc);
        $("#tsuc").text(setupc);
        if(numerosuc == 0){
          $("#tpsuc").text("0");
        }else{
          $("#tpsuc").text((setupc / numerosuc).toFixed(0));
        }
        $("#numerosue").text(numerosue);
        $("#tsue").text(setupe);
        if(numerosue == 0){
          $("#tpsue").text("0");
        }else{
          $("#tpsue").text((setupe / numerosue).toFixed(0));
        }

        $("#tmantto").text(mantto.toFixed(0));
        $("#tcdd").text(cdd.toFixed(0));
        $("#tcalidad").text(calidad.toFixed(0));
        $("#tmateriales").text(materiales.toFixed(0));
        $("#tenredos").text(enrredos.toFixed(0));
        $("#tatorones").text(atorones.toFixed(0));
        $("#tprocesos").text(procesos.toFixed(0));
        $("#tajuste").text(ajuste.toFixed(0));
        $("#totros").text(otros.toFixed(0));
        $("#textTotalt").text(totalTime.toFixed(0));

        let cct = 0;
        let cst = 0;
        let terminal = 0;
        let terminalanillo = 0;
        let sello = 0;
        let cobre = 0;
        let costocst = 0;
        let costocct = 0;
        let costoterminal = 0;
        let costoterminalanillo = 0; 
        let costosello = 0;
        let costocobre = 0; 

      
        result.forEach(item => {
            cst = Number(item.cst);
            cct = Number(item.cct);
            terminal = Number(item.terminal);
            terminalanillo = Number(item.terminalanillo);
            sello = Number(item.sello);
            cobre = Number(item.cobre);

            costocst = Number(item.costocst);
            costocct = Number(item.costocct);
            costoterminal = Number(item.costoterminal);
            costoterminalanillo = Number(item.costoterminalconanillo);
            costosello = Number(item.costosello);
            costocobre = Number(item.costocobre);
        })

        let datasetScrap = [];
        let dataScrap = [];
        let dataCosts = [];
        let dataEstandarscrap = [];

        let totalcst = cst * costocst;
        let totalcct = cct * costocct;
        let totalterminal = terminal * costoterminal;
        let totalterminalanillo = terminalanillo * costoterminalanillo;
        let totalsello = sello * costosello;
        let totalcobre = cobre * costocobre;
        
        dataScrap = ['cst', 'cct', 'Terminal', 'Terminal con anillo', 'Sello', 'Cobre'];
        dataCosts = [totalcst, totalcct, totalterminal, totalterminalanillo, totalsello, totalcobre];
        dataEstandarscrap = [costocst, costocct, costoterminal, costoterminalanillo, costosello, costocobre];

        

        let ctx4 = document.getElementById("myChartScrapDetail").getContext("2d");
        var myChartScrap = new Chart(ctx4, {
          type: 'bar',
          data: {
              datasets: [{
                  data: dataCosts,
                  backgroundColor: ['#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF','#00D3FF']
              },/* {
                  data: dataEstandarscrap,

                  // Changes this dataset to become a line
                  type: 'line'
              }*/],
              labels: dataScrap
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
          }
        })

        let totalscrap = totalcst+totalcct+totalterminal+totalterminalanillo+totalsello+totalcobre;
        let standarscrap = 0;
        var efectScrap = 0;


        result.forEach(item =>{
          standarscrap = Number(item.estandarscrap);
        })
        let scrapdif = standarscrap - totalscrap;
        $("#scrapdif").text(scrapdif.toFixed(2));
        $("#targetScrap").text(standarscrap.toFixed(2));
        efectScrap = (100 - ((totalscrap * 100) / standarscrap));
        $("#porcentScrap").text(Math.round(efectScrap) + "%");
        if(efectScrap < 90){
          $(".circle-scrap").css("background", "red");
        }else if(efectScrap >= 90 && efectScrap < 100){
          $(".circle-scrap").css("background", "yellow");
        }else{
          $(".circle-scrap").css("background", "lightgreen")
        }




          $("#totalScrap").text(totalscrap.toFixed(2));
          $("#resultScrapDetail").text(totalscrap.toFixed(2));
          $("#tcst").text(cst);
          $("#ccst").text(costocst);
          $("#pcst").text(cst*costocst);

          $("#tcct").text(cct);
          $("#ccct").text(costocct);
          $("#pcct").text(cct*costocct);

          $("#tterminal").text(terminal);
          $("#cterminal").text(costoterminal);
          $("#pterminal").text(terminal*costoterminal);

          $("#tterminalanillo").text(terminalanillo);
          $("#cterminalanillo").text(costoterminalanillo);
          $("#pterminalanillo").text(terminalanillo*costoterminalanillo);

          $("#tsello").text(sello);
          $("#csello").text(costosello);
          $("#psello").text(sello*costosello);

          $("#tcobre").text(cobre);
          $("#ccobre").text(costocobre);
          $("#pcobre").text(cobre*costocobre);

          
        if(turno == 'A'){
          tiempoDisponible = 570 * num;
        }else if(turno == 'B'){
          tiempoDisponible = 504 * num
        }else{
          tiempoDisponible = (570+504) * num;
        }
        efecttiempomuerto = 100 - ((totalTime * 100) / tiempoDisponible);
        efecttiempomuerto = Math.round(efecttiempomuerto);
        if(efecttiempomuerto < 90){
          $(".circle-time").css("background", "red");
          $(".circle-hour").css("background", "red");
        }else if(efecttiempomuerto >= 90 && efecttiempomuerto < 100){
          $(".circle-time").css("background", "yellow");
          $(".circle-hour").css("background", "yellow");
        }else{
          $(".circle-time").css("background", "lightgreen");
          $(".circle-hour").css("background", "lightgreen");
        }
      
        $("#resultTotalTime").text(tiempocorrido);
        $("#resultTimeDetail").text(totalTime);
        $("#porcentTime").text(efecttiempomuerto + "%");
        $("#porcentTotalTime").text(efecttiempomuerto + "%");
        $("#resultPorcentTime").text((100 - efecttiempomuerto) + "%");
        $("#disponibleTime").text(tiempoDisponible);  

        
        let eficient = 0;
        eficient = (efectividadProduccion + efectScrap + efecttiempomuerto) / 3;
        $("#eficienciaGeneral").text(Math.round(eficient) + "%");
        if(eficient <  90){
          $("#eficienciaGeneral").css("color", "red");
        }else if(eficient >= 90 && eficient < 100){
          $("#eficienciaGeneral").css("color", "yellow");
        }else{
          $("#eficienciaGeneral").css("color", "lightgreen");
        }



        $.ajax({
          url: "query/todosloscomentarios",
          method: "POST",
          data: {
            fechaInicio,
            fechaFin,
            turno
          }
        }).done(function(result){
         
          result.forEach(item => {
            $(".col6").append(`
           
            <div class="boxComment">
            <span class='fechaComment'>${item.fecha.substring(10,0)}</span>
              ${item.comentario}
            </div>
            `);
          })
        })

/////////////////




          
    
    
          }
        })
      })
      

    });
  });

  
  

});

/*var datos = data.produccion;
			var equipos = [];
			var piezas = [];
			var estandar = [];

			datos.forEach(element => {
				equipos.push(element.EQUIPO);
				piezas.push(element.PRODUCCION);
				estandar.push(element.ESTANDAR);
			})

			console.log(datos);

			var ctx = document.getElementById('myChart').getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: equipos,
					datasets: [{
						label: 'Produccion',
						data: piezas,
						borderColor: [
							'red'
						],
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
      });*/
 

      

$("#btnMostrarTabla").click(function () {
  $("#tableResults").remove(); // this is my <canvas> element
  $(".contentTableResults").append(`
  <table id="tableResults" class="table-bordered table-striped">
    <thead>
      <th class="tdEquipo">Equipo</th>
      <th class="tdEquipo">Número</th>
      <th>Turno</th>
      <th>Fecha</th>
      <th>Estandar</th>
      <th>Producción</th>
    </thead>
    <tbody id="tbodyResults">

    </tbody>
  <table>`);

  var reporte = $("#reporte").val();
  var turno = $("#turno").val();
  var tipo = $("#tipo").val();
  var opcion = $("#opcion").val();
  var fechaInicio = $("#fechaInicio").val();
  var fechaFin = $("#fechaFin").val();

  let formData = {
    reporte,
    turno,
    tipo,
    opcion,
    fechaInicio,
    fechaFin,
  };

  $.ajax({
    url: "/query/queryproduccion",
    method: "POST",
    data: formData,
  }).done(function (data) {
    $(".contentTableResults").css("display", "flex");
    let resultados = data.result;
    resultados.forEach((element) => {
      var fecha = element.fecha.substring(10, 0);

      $("#tbodyResults").append(`
      <tr>
        <td class="tdEquipo">${element.equipo}</td>
        <td class="tdNumero">${element.numero}</td>
        <td>${element.turno}</td>
        <td>${fecha}</td>
        <td>${element.estandar}</td>
        <td>${element.produccion}</td>
      </tr>
      `);
    });
  });

  if (reporte === "produccion") {
    reporte = "producción";
  }
  if (tipo == "equipo") {
    tipo = "Equipo";
  }
  $("#reportName").text(reporte);
  $("#reportFechaInicio").text(fechaInicio);
  $("#reportFechaFin").text(fechaFin);
  $("#turnoReport").text(turno);
  $("#opcionReport").text(tipo);
  $("#opcionElegida").text(opcion);

  


});




