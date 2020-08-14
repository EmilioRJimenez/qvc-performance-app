$(document).ready(function () {


$("#password2").focusout(function(){
  let pass1 = $("#password").val();
  let pass2 = $("#password2").val();
  if(pass1 === pass2){
    $("#password").css("border", "solid lightgreen");
    $("#password2").css("border", "solid lightgreen");
  }else{
    $("#password").css("border", "solid red");
    $("#password2").css("border", "solid red");
  }
})

$("input").keypress(function(evt){
  
  var keycode = (evt.keyCode ? evt.keyCode : evt.which);
  if(keycode == "13"){
    evt.preventDefault();
  }

  
})

$("#fecha").datepicker({
  constrainInput: false,
  currentText: "Now",
  dateFormat: "yy-mm-dd"  
}).datepicker('setDate', '0');




$(".formProduccion").on('submit', function(evt){
  if(total !== tiempoDisponible){
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

  

  $("#pzs").focusout(function () {
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

 
  $("#errores").focusout(function () {
    otrosInteraction();
    let errores = $("#errores").val();
    if(errores == ""){
      $("#errores").val("0");
    }
  });

  $("#defectos").focusout(function () {
    otrosInteraction();
    let defectos = $("#defectos").val();
    if(defectos == ""){
      $("#defectos").val("0");
    }
  });

  $("#calidad").focusout(function () {
    sacarTiempo();
    let calidad = $("#calidad").val();
    if(calidad == ""){
      $("#calidad").val("0");
    }
  });
  $("#mantto").focusout(function () {
    sacarTiempo();
    let mantto = $("#mantto").val();
    if(mantto == ""){
      $("#mantto").val("0");
    }
  });
  $("#materiales").focusout(function () {
    sacarTiempo();
    let materiales = $("#materiales").val();
    if(materiales == ""){
      $("#materiales").val("0");
    }
  });
  $("#cdd").focusout(function () {
    sacarTiempo();
    let cdd = $("#cdd").val();
    if(cdd == ""){
      $("#cdd").val("0");
    }
  });
  $("#procesos").focusout(function () {
    sacarTiempo();
    let procesos = $("#procesos").val();
    if(procesos == ""){
      $("#procesos").val("0");
    }
  });
  $("#enrredos").focusout(function () {
    sacarTiempo();
    let enrredos = $("#enrredos").val();
    if(enrredos == ""){
      $("#enrredos").val("0");
    }
  });
  $("#atorones").focusout(function () {
    sacarTiempo();
    let atorones = $("#atorones").val();
    if(atorones == ""){
      $("#atorones").val("0");
    }
  });

  $("#setupa").focusout(function (e) {
    sacarTiempo();
    let setupa = $("#setupa").val();
    if(setupa == ""){
      $("#setupa").val("0");
    }
  });
  $("#setupb").focusout(function () {
    sacarTiempo();
    let setupb = $("#setupb").val();
    if(setupb == ""){
      $("#setupb").val("0");
    }
  });
  $("#setupc").focusout(function () {
    sacarTiempo();
    let setupc = $("#setupc").val();
    if(setupc == ""){
      $("#setupc").val("0");
    }
  });
  $("#setupd").focusout(function () {
    sacarTiempo();
    let setupd = $("#setupd").val();
    if(setupd == ""){
      $("#setupd").val("0");
    }
  });
  $("#ajuste").focusout(function () {
    sacarTiempo();
    let ajuste = $("#ajuste").val();
    if(ajuste == ""){
      $("#ajuste").val("0");
    }
  });
  $("#otrosTiempos").focusout(function () {
    sacarTiempo();
    let otrostiempos = $("#otrostiempos").val();
    if(otrostiempos == ""){
      $("#otrostiempos").val("0");
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
    var setupd = $("#setupd").val();
    setupd = Number(setupd);
    var ajuste = $("#ajuste").val();
    ajuste = Number(ajuste);
    var otrostiempos = $("#otrosTiempos").val();
    otrostiempos = Number(otrostiempos);

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
      setupd +
      ajuste +
      otrostiempos;

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
      $("#porcentajeOtros").css("color", "green");
    } else if (totalOtros < 6) {
      $("#porcentajeOtros").text(Math.round(porcentajeOtros) + "%");

      $("#porcentajeOtros").css("color", "#FBCD00");
    } else {
      $("#porcentajeOtros").text("100%");
      $("#porcentajeOtros").css("color", "red");
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

 

  $("#btnGenerarGrafica").click(function (e) {
    e.preventDefault();
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
        var datos = data.produccion;
        var equipos = [];
        var piezas = [];
        var estandar = [];

        var totalProduccion = 0;
        var totalEstandar = 0;

        datos.forEach((element) => {
          equipos.push(element.EQUIPO);
          piezas.push(element.PRODUCCION);
          estandar.push(element.ESTANDAR);
        });

        piezas.forEach((element) => (totalProduccion += element));
        estandar.forEach((element) => (totalEstandar += element));

        $("#producciontotal").text(totalProduccion);
        $("#produccionesperada").text(totalEstandar);

        var diferenciaProduccion = totalEstandar - totalProduccion;
        if(totalProduccion > totalEstandar){
          diferenciaProduccion = 0;
        }
        $("#producciondiferencia").text(totalProduccion - totalEstandar);

        var porcentajeEfectividad = (totalProduccion * 100) / totalEstandar;

        $("#produccionEfectividad").text(
          Math.round(porcentajeEfectividad) + "%"
        );

        var ctx1 = document.getElementById("chartResumen").getContext("2d");
        var myPieChart = new Chart(ctx1, {
          type: "doughnut",
          data: {
            datasets: [
              {
                data: [totalProduccion, diferenciaProduccion],
                backgroundColor: ["blue", "red"],
                borderColor: ["white"],
              },
            ],
            labels: ["Total", "Diferencia"],
          },
          options: {},
        });

        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: equipos,
            datasets: [
              {
                label: "Produccion",
                data: piezas,
                borderColor: "red",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 1,
              },
              {
                label: "Estandar",
                data: estandar,
                lineTension: 0,
                type: "line",
                borderColor: "blue",
                borderWidth: 1,
                pointRadius: 3,
                pointBackgroundColor: "white",
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
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
