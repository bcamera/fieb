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