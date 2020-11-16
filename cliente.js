class Cliente {
    constructor(){
        this.clientes = localStorage.getItem('tbClientes') === null
        ? []
        : JSON.parse(localStorage.getItem('tbClientes'))
    }

    salva(cliente){
        if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
            this.apaga(cliente.codigo)
        }
        this.clientes.push(cliente) //adicionar um novo registro no fim do array
        localStorage.setItem('tbClientes',JSON.stringify(this.clientes))
        alert('Cliente salvo com sucesso!')
    }
    apaga(codigo){
        let index = this.clientes.findIndex(cliente => cliente.codigo == codigo)
        //primeiro parametro é o indice do array e o segundo é o número de itens removidos
        this.clientes.splice(index, 1)
        localStorage.setItem('tbClientes',JSON.stringify(this.clientes))
        cliente.atualiza()
    }
    edita(cliente){
        document.getElementById('codigo').value = cliente.codigo
        document.getElementById('codigo').setAttribute('disabled','disabled')
        document.getElementById('nome').value = cliente.nome
        document.getElementById('cep').value = cliente.cep
        document.getElementById('endereco').value = cliente.endereco
        document.getElementById('bairro').value = cliente.bairro
        document.getElementById('cidade').value = cliente.cidade
        document.getElementById('observacoes').value = cliente.observacoes
    }
    lista(){
        const listagem = this.clientes.map((cliente) => (`
        <tr>
            <td>${cliente.codigo}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cep}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.bairro}</td>
            <td>${cliente.cidade}</td>
            <td>${cliente.observacoes}</td>
            <td>
                <button id="apagar" onClick='cliente.apaga(${cliente.codigo})'>🗑️ Apagar</button>
                <button id="editar" onClick='cliente.edita(${JSON.stringify(cliente)})'>🗒️ Editar</button>
            </td>
        </tr>
        `)).join("")
        return (`
        <table border='1' class='paleBlueRows'>
            <caption>Relação dos Clientes</caption>
            <thead>
                <th>Código</th>
                <th>Nome</th> 
                <th>CEP</th>
                <th>Endereço</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>Observações</th>
                <th>Opções</th>
            </thead>
            <tbody>${listagem}</tbody>
        </table>
        `)
    }
    atualiza(){
        document.getElementById('listagem').innerHTML = cliente.lista()
    }
}

//instanciamos um novo objeto
const cliente = new Cliente()

//Tratando o btnSalvar
document.getElementById('salvar').onclick = function(){
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        observacoes: document.getElementById('observacoes').value
    }
    if(registro.codigo === ''){
        alert('O código do cliente é obrigatório!')
        return false;
    }
    if(registro.cep === '' || registro.endereco === '' || registro.cidade === ''){
        alert('Preencha os campos CEP, Endereço e Cidade!')
        return false;
    }
    if(registro.codigo === ''){
        alert('O código do cliente é obrigatório!')
        return false;
    }
    cliente.salva(registro)
}

//Tratando a listagem
window.onload = function(){
    cliente.atualiza()
}