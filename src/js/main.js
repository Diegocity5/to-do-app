const openTaskFormBtn = document.getElementById('open-task-form-btn');
const closeTaskFormBtn = document.getElementById('close-task-form-btn');
const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');
const addOrUpdateTaskBtn = document.getElementById('add-or-update-task-btn');
const confirmCloseDialog = document.getElementById('confirm-close-dialog');
const cancelBtn = document.getElementById('cancel-btn');
const discardBtn = document.getElementById('discard-btn');
const tasksContainer = document.getElementById('task-container');
const taskData = [];
let currentTask = {};


//Manejando eventos
//Mostrando el formulario de agregar tarea cuando se le da click al boton openTaskFormBtn
openTaskFormBtn.addEventListener('click', function(){
    taskForm.classList.toggle('hidden');//suicheo de la clase hidden.
});

//Mostrando el modal al dar click en el boton de cerrar formulario de tarea.
closeTaskFormBtn.addEventListener('click', ()=>{
    //Si hay almenos un campo de entrada con texto guarda true si no false.
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    //validando la variable para tomar una decision
    if(formInputsContainValues){
        confirmCloseDialog.showModal();//metodo para mostrar modal
    }else {
        reset();//Limpia los campos y cierra el formulario.
    }
})

//Cerrando el modal al dar click en el boton cancel me permitira seguir editando la tarea en el fomulario.
cancelBtn.addEventListener('click', ()=>{
    confirmCloseDialog.close();
    console.log('Se cerro el modal');
});

//Cerrando tanto el modal como el formulario de tarea si dan click en Discard boton.
discardBtn.addEventListener('click', ()=>{
    confirmCloseDialog.close();
    //Usando reset para limpiar y ocultar el formulario de tarea
    reset();
});

//Previniendo que por defecto se refresque la pagina despues de enviar la información pues el evento submit hace eso.
taskForm.addEventListener('submit', (e)=>{
    e.preventDefault();//Entonces uso  preventDefault() para que me mantenga el formulario.
    addOrUpdateTask();//Agregar Tarea o actualizarla si ya existe
});

//Funcion para agregar tareas o actualizarlas
const addOrUpdateTask = ()=>{
     /*Encontrando si la tarea objeto existe o no existe con la validación de su propiedd id usando el metodo findIndex*/
     const dataArrIndex = taskData.findIndex((item)=> item.id === currentTask.id);
    //creando el objeto tarea
    const taskObj = {
        //Una cadena de guiones y milisegundos trascurridos para un id unico en cada objeto tarea
        id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    };
    //Si no existe en el array el indice osea es una nueva tarea
    if(dataArrIndex === -1){
        taskData.unshift(taskObj);//se agrega al inicio del array.
    }else {
        //Actualizando el objeto existente en el array por la nueva tarea.
        taskData[dataArrIndex] = taskObj;
    }
    //Incovando la funcion insertar o actualizar
    updateTaskContainer();
    //Invocando la funcion reset.
    reset();
}

//Funcion para renderizar las tareas en el DOM.
const updateTaskContainer = ()=>{
    //Antes de agregar una tarea primero limpia la renderización anterior para prevenir la duplicación de tareas renderizadas en el taskContainer.
    tasksContainer.innerHTML = '';
    //Iterando el array y desestructurando las propiedades de cada objeto como argumento para poder usar las keys directamente.
    taskData.forEach(({id, title, date, description})=>{
        tasksContainer.innerHTML += `
            <div class="task" id="${id}">
                <p><strong>Title: </strong>${title}</p>
                <p><strong>Date: </strong>${date}</p>
                <p><strong>Description: </strong>${description}</p>
                <button onclick="editTask(this)" type="button" class="btn">Edit</button>
                <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
            </div>
        `;
    });
}

//Funcion para limpiar los campos de entrada
const reset = ()=>{
    titleInput.value = '';
    dateInput.value = '';
    descriptionInput.value = '';

    //Ocultar la capa formulario para ver la tarea renderizada.
    taskForm.classList.toggle('hidden');
    currentTask = {};
}

//Funcion para eliminar la tarea
const deleteTask = (buttonEl)=>{
    //Obtener el indice de la tarea que quiero eliminar en la estructura de datos (array).
    const dataArrIndex = taskData.findIndex((item)=>item.id === buttonEl.parentElement.id);
    //Eliminando la tarea del DOM
    buttonEl.parentElement.remove();
    //Eliminando el elemento teniendo en cuenta su indice del array.
    //splice es muy flexible no solo permite eliminar si no tambien agregar o reemplazar en cualquier posicion deseada tener en cuenta que es metodo es mutable.
    taskData.splice(dataArrIndex,1);
}

//Funcion para editar la tarea
const editTask = (buttonEl)=>{
    //Encontrar el indice de la tarea que quiero editar
    const dataArrIndex = taskData.findIndex((item)=> item.id === buttonEl.parentElement.id);
    //Objeto currentTask se muta igual al objeto tarea recuperado
    currentTask = taskData[dataArrIndex];

    //Los campos del formulario recuperan los valores del objeto currentTask para una previsualización de la información que se habia registrado anteriormente en dicha tarea.
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;

    //Cambiando el texto del boton a actualizar tarea.
    addOrUpdateTaskBtn.innerText = "Update Task";
    //Mostrando el formulario editar tarea.
    taskForm.classList.toggle('hidden');
}