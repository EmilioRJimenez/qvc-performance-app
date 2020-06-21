$(document).ready(function() {    
    $('#example').DataTable({        
        language: {
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sSearch": "Buscar:",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast":"Último",
                    "sNext":"Siguiente",
                    "sPrevious": "Anterior"
			     },
			     "sProcessing":"Procesando...",
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

   
$('#example2').DataTable({        
        language: {
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sSearch": "Buscar:",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast":"Último",
                    "sNext":"Siguiente",
                    "sPrevious": "Anterior"
			     },
			     "sProcessing":"Procesando...",
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

	
	$('#pzs').focusout(function(){
		
		var pzs = $('#pzs').val(); pzs = Number(pzs);
		var equipo = $('#equipo').val();
		equipo = Number(equipo);
		$.ajax({
			method: "GET",
			url: "/equipos/estandar",
			dataType: "json"
		  }).done(function(data){
			  var equipos = data.equipos;
			  var eq = equipos.find(function(res){
				  return res.id === equipo
			  });
			  
			  var estandar = eq.estandar;
			  var porcent = (pzs * 100) / estandar;
			  $('#porcentaje').text(Math.round(porcent) + '%');
			  if(porcent < 70){
				  $('#porcentaje').css('color', 'red');
			  }else if(porcent >= 70 && porcent < 100){
				$('#porcentaje').css('color', '#FBCD00');
			  }else if(porcent >= 100){
				$('#porcentaje').text('100%');
				$('#porcentaje').css('color', 'green');
			  }
		  });
	});


	$('#cst').focusout(function(){
		calidadIntercation();
	});
	$('#cct').focusout(function(){
	calidadIntercation();	
	});
	$('#terminal').focusout(function(){
		calidadIntercation();
	});
	$('#otros').focusout(function(){
		calidadIntercation();
	});
	function calidadIntercation(){
		var equipo = $('#equipo').val();
		var cst = $('#cst').val(); cst = Number(cst);
		var cct = $('#cct').val(); cct = Number(cct);
		var terminal = $('#terminal').val(); terminal = Number(terminal);
		var otros = $('#otros').val(); otros = Number(otros);
		equipo = Number(equipo);
		$.ajax({
			method: 'GET',
			url: '/equipos/scrap',
			dataType: 'json'
		}).done(function(data){
			var equipos = data.equipos;
			var result = equipos.find(function(res){
				return res.id === equipo;
			});
			var scrap = result.estandar_scrap;
			var total = cst + cct + terminal + otros;
			var porcentaje = (total * 100) / scrap;
			$('#porcentajecalidad').text(Math.round(porcentaje) + '%');
			if(porcentaje < 70){
				$('#porcentajecalidad').css('color', 'green');
				$('.icon-sad').addClass('icon-smile');
				  $('.icon-smile').css('color', 'green');
				  $('.icon-smile').removeClass('icon-sad');
				  $('.icon-neutral').addClass('icon-smile');
				  $('.icon-smile').css('color', 'green');
				  $('.icon-smile').removeClass('icon-neutral');
			}else if(porcentaje >= 70 && porcentaje < 100){
				  $('#porcentajecalidad').css('color', '#FBCD00');
				  $('.icon-smile').addClass('icon-neutral');
				  $('.icon-neutral').css('color', '#FBCD00');
				  $('.icon-neutral').removeClass('icon-smile');
				  $('.icon-sad').addClass('icon-neutral');
				  $('.icon-neutral').css('color', '#FBCD00');
				  $('.icon-neutral').removeClass('icon-smile');

			}else if(porcentaje >= 100){
				$('#porcentajecalidad').text('100%');
				  $('#porcentajecalidad').css('color', 'red');
				  $('.icon-smile').addClass('icon-sad');
				  $('.icon-neutral').addClass('icon-sad');
				  $('.icon-sad').css('color', 'red');
				  $('.icon-sad').removeClass('icon-smile');
				  $('.icon-sad').removeClass('icon-neutral');
			}
		})
	}

});