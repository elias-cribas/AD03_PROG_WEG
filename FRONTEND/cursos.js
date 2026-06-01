document.addEventListener('DOMContentLoaded', function() {
function renderCursos() {
    const tbody = document.querySelector('#cursosTable tbody');
    tbody.innerHTML = '';

    fetch('http://localhost:3000/cursos')
    .then(response => response.json())
    .then(cursos => {
    console.log(cursos);
    cursos.forEach((curso, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${curso.nomeCurso}</td>
        <td>${curso.sigla}</td>
        <td>${curso.descricao}</td>
        <td>${curso.coordenador}</td>
        <td>
          <button onclick="editCurso(${index})">Editar</button>
          <button onclick="deleteCurso(${index})">Excluir</button>
        </td>
        ` ;
      tbody.appendChild(row);
    });
    })
  }

function editCurso(index) {
    const curso = cursos[index]
    document.getElementById('codigo').value = curso.codigo
    document.getElementById('nomeCurso').value = curso.nomeCurso
    document.getElementById('sigla').value = curso.sigla
    document.getElementById('descricao').value = curso.descricao
    document.getElementById('coordenador').value = curso.coordenador
    currentCursoId = index 
    openModal('cursoModal')
}

function addCurso(codigo, nomeCurso, sigla, descricao, coordenador) {
    //cursos.push({codigo, nomeCurso, semestres, coordenador})

    let curso = {codigo, nomeCurso, sigla, descricao, coordenador}
    console.log(curso)

    fetch('http://localhost:3000/cursos', 
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(curso)
        })
        .then(response => response.json())
        .then(dados => {
            console.log(dados)
        })
}

function deleteCurso(index) {
    if (confirm('Tem certeza que deseja excluir esse curso?')){
        cursos.splice(index, 1)
        renderCursos()
    }
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';    
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

const btAddCurso = document.getElementById("addCurso")
btAddCurso.addEventListener('click',function(){
    currentCursoId = null;
    document.getElementById('cursoForm').reset();
    openModal('cursoModal');
})

document.querySelectorAll('.close').forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
        closeModal(this.closest('.modal').id)
    })
})

const form = document.getElementById('cursoForm')
cursoForm.addEventListener('submit',function (e) {
    e.preventDefault()
    const codigo = document.getElementById('codigo').value
    const nomeCurso = document.getElementById('nomeCurso').value
    const sigla = document.getElementById('sigla').value
    const descricao = document.getElementById('descricao').value
    const coordenador = document.getElementById('coordenador').value

    if (currentCursoId !== null) {
        cursos[currentCursoId] = {codigo, nomeCurso, sigla, descricao, coordenador}
    }else{
        addCurso(codigo, nomeCurso, sigla, descricao, coordenador)
    }
    closeModal('cursoModal')
    renderCursos()
})

renderCursos()
})
