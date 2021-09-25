$(document).ready(function () {
    $('#busca').keypress(function (e) {
        if (e.which === 13) {
            load();
        }
    });
    load();
});

function load() {
    let nome = $('[name="nome"]').val();
    let pesoMaiorQue = ($('[name="pesoMaiorQue"]').val() || 0);
    let pesoMenorQue = ($('[name="pesoMenorQue"]').val() || 0);

    PessoaListaPessoas(nome, pesoMaiorQue, pesoMenorQue).then(function (data) {
        $('#table tbody').html('');
        data.forEach(obj => {
            let id = "'" + obj.id + "'";
            $('#table tbody').append('' +
                '<tr id="obj-' + obj.id + '">' +
                '<td>' + (obj.nome || '--') + '</td>' +
                '<td>' + (obj.peso || '--') + '</td>' +
                '<td>' + (obj.altura || '--') + '</td>' +
                //'<td>' + ((obj.peso / (obj.altura ^ 2)) || '--') + '</td>' +
                '<td>' + (moment(obj.dataNascimento).format('DD/MM/YYYY') || '--') + '</td>' +
                '<td>' + (obj.cidade.nome || '--') + '</td>' +
                '<td>' + (obj.ativo === true ? 'Ativo' : 'Inativo') + '</td>' +
                '<td>' + (obj.telefone || '--') + '</td>' +
                '<td>' + (obj.cpf || '--') + '</td>' +
                '<td>' + '<button class="btn btn-info" style="margin-right: 5px;" onclick="window.location.href = \'/pessoa/formulario/' + obj.id + '\'"><i class="fas fa-pencil-alt"></i></button>' + '<button class="btn btn-info" onclick="remover(' + id + ')"> <i class="fas fa-trash"></i></button>' + '</td>' +
                '</tr>');
        });
    });
}


function remover(id) {
    PessoaRemover(id).then(function () {
        alert('Pessoa removida com sucesso');
        load();
    });
}



