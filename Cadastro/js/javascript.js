$('#telefone').mask('(00) 00000-00000');
$("#cep").mask("00.000-000");
$('#cpf').mask('000.000.000-00');
$('#salario').mask('00.000,00');


$('#hora_inicio').blur(function(){

    console.log($('#hora_fim').val());
    console.log($('#hora_inicio').val());
})

$('#hora_fim').blur(function(){
    console.log($('#hora_fim').val());
    console.log($('#hora_inicio').val());
})

$('#carga_horaria_semanal').val()
$('#carga_horaria').val()

$( "#categoria" ).prop( "disabled", true );

$('#habilitacao').change(function(){
    console.log(this.value);
    if (this.value == 'nao'){
        $( "#categoria" ).prop( "disabled", true );
    }else{
        $( "#categoria" ).prop( "disabled", false );
    }
});



//Estados e Cidades
$.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/', function (json) {
        var options;
 
        for (var i = 0; i < json.length; i++) {
 
            options += '<option data-id="' + json[i].id + '" value="' + json[i].nome + '" >' + json[i].nome + '</option>';
        }
        $('#estado').append(`${options}`)
 
    });
 
 
    $('#estado').change(function () {
        if ($(this).val()) {
            $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+$(this).find("option:selected").attr('data-id')+'/municipios', {id: $(this).find("option:selected").attr('data-id')}, function (json) {
 
                var options;
 
                for (var i = 0; i < json.length; i++) {
 
                    options += '<option value="' + json[i].nome + '" >' + json[i].nome + '</option>';
 
                }
                $('#cidade').append(`${options}`)
 
            });
 
        } else {
            $("#cidade").empty();
            $('#cidade').append('<option value="">Selecione...</option>');
 
        }
 
    });


 function limpa_formulário_cep() {
                // Limpa valores do formulário de cep.
                $("#cidade").val("");
                $("#rua").val("");
                $("#bairro").val("");
                $("#complemento").val("");
            }
            
            //Quando o campo cep perde o foco.
            $("#cep").blur(function() {

                //Nova variável "cep" somente com dígitos.
                var cep = $(this).val().replace(/\D/g, '');

                //Verifica se campo cep possui valor informado.
                if (cep != "") {

                    //Expressão regular para validar o CEP.
                    var validacep = /^[0-9]{8}$/;

                    //Valida o formato do CEP.
                    if(validacep.test(cep)) {

                        //Preenche os campos com "..." enquanto consulta webservice.
                        $("#cidade").val("...");
                        $("#rua").val("...");
                        $("#bairro").val("...");
                        $("#complemento").val("...");
                        //Consulta o webservice viacep.com.br/
                        $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                            if (!("erro" in dados)) {
                                console.log(dados)
                                        //Atualiza os campos com os valores da consulta.
                                        $("#cidade").val(dados.localidade);
                                        $("#logradouro").val(dados.logradouro);
                                        $("#bairro").val(dados.bairro);
                                        $("#numero").val(dados.numero);
                                        $("#complemento").val(dados.complemento);
                             }
                            else {
                                //CEP pesquisado não foi encontrado.
                                limpa_formulário_cep();
                                alert("CEP não encontrado.");
                            }
                        });
                    } //end if.
                    else {
                        //cep é inválido.
                        limpa_formulário_cep();
                        $('#cep').val('');
                        alert("Formato de CEP inválido.");
                    }
                } //end if.
                else {
                    //cep sem valor, limpa formulário.
                    limpa_formulário_cep();
                }
            });



function checarEmail(){

    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if( !regex.test($('#email').val()))
    {
      alert( "Por favor, informe um E-MAIL válido!" );
      return false;
    }
}

    //Executa a requisição quando o campo username perder o foco
    $('#cpf').blur(function()
    {
        var cpf = $('#cpf').val().replace(/[^0-9]/g, '').toString();

        if( cpf.length == 11 )
        {
            var v = [];

            //Calcula o primeiro dígito de verificação.
            v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
            v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
            v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
            v[0] = v[0] % 11;
            v[0] = v[0] % 10;

            //Calcula o segundo dígito de verificação.
            v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
            v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
            v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
            v[1] = v[1] % 11;
            v[1] = v[1] % 10;

            //Retorna Verdadeiro se os dígitos de verificação são os esperados.
            if ( (v[0] != cpf[9]) || (v[1] != cpf[10]) )
            {
                alert('CPF inválido: ' + cpf);

                $('#cpf').val('');
                $('#cpf').focus();
            }
        }
        else
        {
            alert('CPF inválido:' + cpf);

            $('#cpf').val('');
            $('#cpf').focus();
        }
    });