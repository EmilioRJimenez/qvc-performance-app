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
    /*
      let equipoDetail = $("#opcionDetail").text()
      $("#resultdetails").show();*/
      let dataDetails = {
        reporte,
        equipo: equipoDetail,
        turno,
        tipo,
        opcion,
        fechaInicio,
        fechaFin
      }

      $.ajax({
        url: "query/detailsproduction",
        method: "POST",
        data: dataDetails
      });


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
    }).done(function (data) {});
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




